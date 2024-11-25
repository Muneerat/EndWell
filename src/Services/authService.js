// import axios from '../libs/axios';
import axios from '@/libs/axios'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        
        
        try {
            const response = await axios.post('/admin/login', {email, password},{ headers: {Role: 'admin'}},);
            
            return response.data.data;
        } catch (error) {
            if (error.response){
                //  console.log(error.response.data.message)
                // return rejectWithValue(error.response.data)
                return rejectWithValue({status: error.response.status, message: error.response.data.message})

            }
            else {
                console.log(error.request)
                return rejectWithValue({status: 500, message:'Network error: Unable to reach the server.'});
            }
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async({}, {rejectWithValue}) => {
        try{
       
            const response = await axios.delete('/admin/logout',{ headers: {Role: 'admin'}});
            return response.data;
        } catch (error){
            if (error.response){
                return rejectWithValue({status: error.response.status, message: error.response.data.message})
            }
            else{
                console.log(error.request)
                return rejectWithValue({status: 500, message:'Network error: Unable to reach the server.'});
            }
        }
    }
)

export const userSignIn = createAsyncThunk(
    'auth/userSignIn',
    async ({ phone, password }, { rejectWithValue }) => {
  
        try {
            const response = await axios.post('/member/login', {phone, password});
            
            return response.data.data;
        } catch (error) {
            if (error.response){
                  console.log(error.response.data.message)
                // return rejectWithValue(error.response.data)
                return rejectWithValue({status: error.response.status, message: error.response.data.message})

            }
            else {
                console.log(error.request)
                return rejectWithValue({status: 500, message:'Network error: Unable to reach the server.'});
            }
        }
    }
)

export const userLogout = createAsyncThunk(
    'auth/userLogout',
    async({}, {rejectWithValue}) => {
        try{
       
            const response = await axios.delete('/member/logout');
            return response.data;
        } catch (error){
            if (error.response){
                return rejectWithValue({status: error.response.status, message: error.response.data.message})
            }
            else{
                console.log(error.request)
                return rejectWithValue({status: 500, message:'Network error: Unable to reach the server.'});
            }
        }
    }
)





