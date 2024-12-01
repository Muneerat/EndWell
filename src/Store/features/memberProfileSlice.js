
import { getMemberProfile } from "@/Services/memberProfileService";
import { createSlice } from "@reduxjs/toolkit";

const memberProfileSlice = createSlice({
  name: "ledger",
  initialState: {
    member: {}, 
    loading: false, 
    error: null,    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMemberProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMemberProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.member = action.payload;
       console.log( state.member, 'here');
       
        
      })
      .addCase(getMemberProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch members.";
      });
  },
});

export default memberProfileSlice.reducer;
