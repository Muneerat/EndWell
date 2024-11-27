import { staffProfile } from "@/Services/staffProfileService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processing: false,
  isSuccess: false,
  isError: false,
  errors: null,
  message: null,
  profile: {},
};

const staffProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(staffProfile.pending, (state) => {
      state.processing = true;
      state.isSuccess = false;
      state.isError = false;
      state.errors = null;
      state.message = null;
    });
    builder.addCase(staffProfile.fulfilled, (state, action) => {
      state.processing = false;
      state.isSuccess = true;
      state.isError = false;
      state.errors = null;
      state.message = "Profile fetched successfully.";
      state.profile = action.payload; // Update with profile data
      console.log(state.profile);
      
     
      
    });
    builder.addCase(staffProfile.rejected, (state, action) => {
      state.processing = false;
      state.isSuccess = false;
      state.isError = true;

      if (action.payload?.data) {
        state.message = action.payload.data.message; // Error message from server
      } else {
        state.message = "An unexpected error occurred.";
      }

      state.errors = action.payload?.data || action.payload; // Save detailed errors if available
    });
  },
});

export default staffProfileSlice.reducer;
