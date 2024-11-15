
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice"
import toastSlice  from "./features/toastSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        toast: toastSlice
    }
})

export default store;