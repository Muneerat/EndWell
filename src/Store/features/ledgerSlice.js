// redux/slices/ledgerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const ledgerSlice = createSlice({
  name: "ledger",
  initialState: {
    ledgers: [],
    totalLedgers: 0, // Total number of ledgers
  },
  reducers: {
    setLedgers: (state, action) => {
      state.ledgers = action.payload;
      state.totalLedgers = action.payload.length; // Update total count
    },
  },
});

export default ledgerSlice.reducer;
export const { setLedgers } = ledgerSlice.actions;
