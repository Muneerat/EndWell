import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/libs/axios";

// export const staffProfile = createAsyncThunk(
//   "staffProfile/fetch",
//   async ({ user_id }, { rejectWithValue }) => {
//     try {
//       // const response = await axios.get('/profile');
//       const response = await axios.get(`/admin/user/profile`, {
//         headers: { Role: "admin" },
//         params: { user_id },
//       });
//       const data = response.data.data
//     //   const formattedData = data.map((user, index) => ({
//     //     ID: index + 1,
//     //     id: user.id,
//     //    first_name: user.first_name,
//     //    last_name: user.last_name,
//     //    phone: user.phone,
//     //  }));
//     //  console.log(formattedData, "here");
//     return data;

//     //   return response.data.data;
//     } catch (error) {
//       if (error.response) {
//         return rejectWithValue(error.response);
//       } else {
//         return rejectWithValue(error.request);
//       }
//     }
//   }
// );

export const staffProfile = createAsyncThunk(
  "staffProfile/fetch",
  async ({}, { rejectWithValue }) => {
    try {
      // const response = await axios.get('/profile');
      const response = await axios.get(`/admin/profile`, {
        headers: { Role: "admin" },
      });
      const data = response.data.data;
      console.log(data);

      //   const formattedData = data.map((user, index) => ({
      //     ID: index + 1,
      //     id: user.id,
      //    first_name: user.first_name,
      //    last_name: user.last_name,
      //    phone: user.phone,
      //  }));
      //  console.log(formattedData, "here");
      return data;

      //   return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      } else {
        return rejectWithValue(error.request);
      }
    }
  }
);
