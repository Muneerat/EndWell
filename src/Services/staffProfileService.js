import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const staffProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/profile",  {headers: { Role: "admin" }},); // Replace with your API URL
    
      return response.data.data; 
    } catch (error) {
        if (error.response){
            return rejectWithValue({status: error.response.status, message: error.response.data.message})

        }
        else {
            console.log(error.request)
            return rejectWithValue({status: 500, message:'Network error: Unable to reach the server.'});
        }
    }
  }
);

