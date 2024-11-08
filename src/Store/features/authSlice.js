import { signIn } from "@/Services/authService";
import { getToken, setToken } from "@/utils/authToken";
import { createSlice } from "@reduxjs/toolkit"

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
        builder.addCase(signIn.pending, (state) => {
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
            window.location.href = '/'
        });
    }
})

export default authSlice.reducer;