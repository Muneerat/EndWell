import { getAllMembers } from "@/Services/membersServie";
import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: [],
    totalMembers: 0,
    loading: false, // Added loading property
    error: null,    // Added error property
  },
  reducers: {
    setMember: (state, action) => {
      state.members = action.payload;
      state.totalMembers = action.payload.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
        state.totalMembers = action.payload.length;
      })
      .addCase(getAllMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch members.";
      });
  },
});

export default memberSlice.reducer;
export const { setMember } = memberSlice.actions;
