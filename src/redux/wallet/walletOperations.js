import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import MetaMaskSDK from "@metamask/sdk";
import { isMobile } from "react-device-detect";

export const connectToMetaMask = createAsyncThunk(
  "ethereum/connect",
  async () => {
    if (isMobile) {
      try {
        const MMSDK = new MetaMaskSDK();
        toast.info("Works");
        const provider = MMSDK.getProvider();
        const account = await provider.request({
          method: "eth_requestAccounts",
        });
        return account;
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      if (window.ethereum.isMetaMask) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const account = await signer.getAddress();
          return account;
        } catch (error) {
          if (error.info.error.code === 4001) {
            throw new Error(toast.error("User reject connection"));
          } else {
            toast.error(error.info.error.message);
          }
        }
      } else {
        throw new Error(toast.error("Please install MetaMask"));
      }
    }
  }
);

export const getBalance = createAsyncThunk("ethereum/balance", async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const accounts = await signer.getAddress();
    const balance = await provider.getBalance(accounts);
    return parseFloat(ethers.formatEther(balance)).toFixed(3);
  } catch (error) {
    toast.error(error.info.error.message);
  }
});

export const transferToken = createAsyncThunk(
  "ethereum/tranfer",
  async ({ adrress, value }) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const transaction = {
          to: adrress,
          value: ethers.parseEther(value),
        };
        await signer.sendTransaction(transaction);
        return toast.success("Transaction success");
      } catch (error) {
        if (error.info.error.code === 4001) {
          toast.error("You denied transaction signature.");
        } else if (error.info.error.code === -32000) {
          toast.error("Not enough tokens on your account");
        }

        toast.error(error);
      }
    } else {
      throw new Error(toast.error("Please install MetaMask"));
    }
  }
);

// (navigator.userAgent.toLowerCase().includes("mobile") &&
//         navigator.userAgent.toLowerCase().includes("metamask")
