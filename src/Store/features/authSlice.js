import { createSlice } from "@reduxjs/toolkit"
import { sign } from "crypto"

const initialState = {
    processing: false,
    isSuccess: false,
    isError: false,
    errors: {},
    message: null,
    userToken: getToken(),
    userInfo: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SignIn.pending, (state) => {
            state.processing = true;
            state.isSuccess = false;
            state.isError = false;
            state.errors = {};
            state.message = null;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.processing = false;
            state.isSuccess = true;
            state.isError = false;
            state.errors = {};
            state.message = action.payload.message;
            setToken(action.payload.token);
        });
    }
})