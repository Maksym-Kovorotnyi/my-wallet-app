import { createAsyncThunk } from "@reduxjs/toolkit";

export const connectToMetaMask = createAsyncThunk(
  "ethereum/connect",
  async () => {
    // if (typeof window.ethereum !== "undefined") {
    //   try {
    //     const web3 = new Web3(window.ethereum);
    //     await window.ethereum.enable();
    //     const accounts = web3.eth.getAccounts();
    //     return accounts;
    //   } catch (error) {
    //     return rejectWithValue(error.message);
    //   }
    // }
  }
);
