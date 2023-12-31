import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export const connectToMetaMask = createAsyncThunk(
  "ethereum/connect",
  async () => {
    if (typeof window.ethereum !== "undefined") {
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
  }
);
