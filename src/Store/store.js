
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice"
import toastSlice  from "./features/toastSlice";
import ledgerSlice from "./features/ledgerSlice";
import memberSlice from "./features/memberSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        toast: toastSlice,
        ledger: ledgerSlice,
        member: memberSlice
    }
})

export default store;