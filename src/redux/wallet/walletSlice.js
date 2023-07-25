import { createSlice } from "@reduxjs/toolkit";
import {
  connectToMetaMask,
  getBalance,
  transferToken,
} from "./walletOperations";

const walletInitialState = {
  isConnected: false,
  isLoading: false,
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
    builder.addCase(getBalance.pending, () => {});
    builder.addCase(getBalance.rejected, () => {});
    builder.addCase(getBalance.fulfilled, (state, { payload }) => {
      state.balance = payload;
    });
    builder.addCase(transferToken.fulfilled, () => {});
  },
});

export const walletReducer = walletSlice.reducer;
