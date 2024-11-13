// import axios from '../libs/axios';
import axios from '@/libs/axios'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        
        
        try {
            const response = await axios.post('/api/v1/admin/login', {email, password});
            
            console.log(response.data)
            return response.data.data;
        } catch (error) {
            if (error.response){
                console.log(error.response.data.message)
                return rejectWithValue(error.response)

            }
            else {
                console.log(error.request)
                return rejectWithValue(error.request);
            }
        }
    }
);





