import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '@/libs/axios'

export const getAllMembers = createAsyncThunk(
    'member/getAll',
    async (_, { rejectWithValue }) => {
        try {
            // const response = await axios.get('/profile');
            const response = await axios.get("/admin/member/all",{ headers: {Role: 'admin'}});
            const data = response.data.users
            const formattedData = data.map((member, index) => ({
                ID: index + 1,
                id: member.id,
               first_name: member.first_name,
               last_name: member.last_name,
               phone: member.phone,
             }));
            return formattedData;  
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

