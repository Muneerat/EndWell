// import axios from '../libs/axios';
import axios from '@/libs/axios'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        
        try {
            const response = await axios.post('/sign-in', {email, password});
            
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
);





