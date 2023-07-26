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
  reducers: {
    disconnected: (state) => {
      state.isConnected = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectToMetaMask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(connectToMetaMask.rejected, (state) => {
      state.isLoading = false;
      state.isConnected = false;
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
    builder.addCase(transferToken.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(transferToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(transferToken.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const walletReducer = walletSlice.reducer;
export const { disconnected } = walletSlice.actions;
