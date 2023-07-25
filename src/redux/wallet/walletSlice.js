import { createSlice } from "@reduxjs/toolkit";
import { connectToMetaMask, getBalance } from "./walletOperations";

const walletInitialState = {
  isConnected: false,
  isLoading: false,
  account: null,
  address: null,
  balance: null,
  accounts: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState: walletInitialState,
  extraReducers: (builder) => {
    builder.addCase(connectToMetaMask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(connectToMetaMask.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(connectToMetaMask.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isConnected = true;
      state.accounts = payload;
    });
    builder.addCase(getBalance.fulfilled, (state, { payload }) => {
      state.balance = payload;
    });
  },
});

export const walletReducer = walletSlice.reducer;
getBalance;
