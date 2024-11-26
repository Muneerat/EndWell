
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice"
import toastSlice  from "./features/toastSlice";
import ledgerSlice from "./features/ledgerSlice";
import memberSlice from "./features/memberSlice";
import userAuthSlice from "./features/userAuthSlice";
import  staffProfileSlice  from "./features/staffProfileSlice";



const store = configureStore({
    reducer: {
        auth: authSlice,
        toast: toastSlice,
        ledger: ledgerSlice,
        member: memberSlice,
        userAuth: userAuthSlice,
        staffProfiles: staffProfileSlice,
    }
})

export default store;