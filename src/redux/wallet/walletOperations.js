import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export const connectToMetaMask = createAsyncThunk(
  "ethereum/connect",
  async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const accounts = await signer.getAddress();
        return accounts;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Please install MetaMask on your browser");
    }
  }
);

export const getBalance = createAsyncThunk("ethereum/balance", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await signer.getAddress();
      const balance = await provider.getBalance(accounts);
      //   const balanceInEth = provider.utils.formatEther(balance);

      return parseFloat(ethers.utils.formatEther(balance)).toFixed(3);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Please install MetaMask on your browser");
  }
});
