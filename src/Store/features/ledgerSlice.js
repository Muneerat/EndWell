// redux/slices/ledgerSlice.js
import { getAllLedger } from "@/Services/ledgerService";
import { createSlice } from "@reduxjs/toolkit";

const ledgerSlice = createSlice({
  name: "ledger",
  initialState: {
    ledgers: [],
    totalLedgers: 0, 
    loading: false, 
    error: null,    
  },
  reducers: {
    setLedgers: (state, action) => {
      state.ledgers = action.payload;
      state.totalLedgers = action.payload.length; // Update total count
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLedger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLedger.fulfilled, (state, action) => {
        state.loading = false;
        state.ledgers = action.payload;
        state.totalLedgers = action.payload.length;
      })
      .addCase(getAllLedger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch members.";
      });
  },
});

export default ledgerSlice.reducer;
export const { setLedgers } = ledgerSlice.actions;
