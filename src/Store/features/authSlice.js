
import { logout, signIn } from "@/Services/authService";
import { getToken, removeToken, setToken } from "@/utils/authToken";
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
            state.message = action.payload?.message;
            setToken(action.payload?.token);
            
        });
        builder.addCase(signIn.rejected, (state,action) => {
            console.log(action.payload.message);
            
            state.processing = false;
            state.isSuccess = false;
            state.isError = true;
            
            if (action.payload?.status === 400) {
                let errors = action.payload.message;
                let formatted = {};
            
                // Check if errors is an object
                if (errors && typeof errors === 'string') {
                    state.message = action.payload.message
                }
                else{
                    for (let error of Object.keys(errors)) {
                        formatted[error] = errors[error][0];
                    }
                    state.errors = formatted;
                    console.log(formatted);
                }
            
            } else {
                state.message = action.payload?.message ?? 'Your account could not found.';
            }
            
        })
        //logout
        builder.addCase(logout.fulfilled, (state,action) => {
            state.processing = false;
            state.isSuccess = true;
            state.isError = false;
            state.errors = {};
            state.message = action.payload?.message;
            removeToken();
        })
        builder.addCase(logout.rejected, (state,action) => {
            state.processing = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload?.message ?? 'Logout Failed';
        });
        

    }
})

export default authSlice.reducer;

// import { signIn } from "@/Services/authService";
// import { getToken, setToken } from "@/utils/authToken";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     processing: false,
//     isSuccess: false,
//     isError: false,
//     errors: {},
//     message: null,
//     userToken: getToken(),
//     userInfo: {}
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(signIn.pending, (state) => {
//             state.processing = true;
//             state.isSuccess = false;
//             state.isError = false;
//             state.errors = {};
//             state.message = null;
//         });
//         builder.addCase(signIn.fulfilled, (state, action) => {
//             state.processing = false;
//             state.isSuccess = true;
//             state.isError = false;
//             state.errors = {};
//             state.message = action.payload?.message;
//             setToken(action.payload?.token);
//         });
//         builder.addCase(signIn.rejected, (state, action) => {
//             state.processing = false;
//             state.isSuccess = false;
//             state.isError = true;
            
//             // Here we assume `action.payload` contains `error.response.data` from the `signIn` action
//             if (action.payload?.status === 400) {
//                 // Extract `data.message` for a more user-friendly error display
//                 const errors = action.payload.data.message;
//                 let formatted = {};
                
//                 // Loop through the errors and format them for display
//                 for (let error of Object.keys(errors)) {
//                     formatted[error] = errors[error][0]; // Assuming the error format is an array with messages
//                 }

//                 state.errors = formatted;
//             } else {
//                 // Set a default error message if none was provided by the server
//                 state.message = action.payload?.message || 'Your account could not be created. Please try again.';
//             }
//         });
//     }
// });

// export default authSlice.reducer;
