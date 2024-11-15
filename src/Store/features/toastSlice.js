import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toast: {
        type: null,
        message: ''
    }
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state, action) => {
            state.toast.type = action.payload.type;
            state.toast.message = action.payload.message;
        },
        removeToast: (state) => {
            state.toast.type = null;
            state.toast.message = '';
        }
    }
});

export default toastSlice.reducer;
export const { addToast, removeToast } = toastSlice.actions;