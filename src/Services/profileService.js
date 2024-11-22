
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '@/libs/axios'

export const getProfile = createAsyncThunk(
    'auth/profile',
    async ({ }, { rejectWithValue }) => {
        try {
            // const response = await axios.get('/profile');
            const response = await axios.get(`/admin/member/profile`, {
                params: { member_id },
              });
            
            return response.data.data;  
        } catch (error) {
            if (error.response){
                return rejectWithValue(error.response)
            }
            else {
                return rejectWithValue(error.request);
            }
        }
    }
)

// const fetchMember = async () => {
//     try {
//       const response = await axios.get(`/admin/member/profile`, {
//         params: { member_id },
//       });
//       setFormData({
//         first_name: response.data.data.first_name || "",
//         last_name: response.data.data.last_name || "",
//         email: response.data.data.email || "",
//         phone: response.data.data.phone || "",
//         role: response.data.data.role || "",
//       });
//     } catch (error) {
//       console.error("Failed to fetch member:", error);
//     } finally {
//       setLoading(false);
//     }
//   };