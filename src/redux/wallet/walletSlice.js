import { createSlice } from "@reduxjs/toolkit";
import { connectToMetaMask } from "./walletOperations";

const walletInitialState = {
  isConnected: false,
  isLoading: false,
  account: null,
  address: null,
  balance: null,
  accounts: [],
};

const walletSlice = createSlice({
  name: "wallet",
  initialState: walletInitialState,
  extraReducers: (builder) => {},
});

export const walletReducer = walletSlice.reducer;
