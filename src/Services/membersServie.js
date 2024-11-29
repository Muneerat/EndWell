 import { createAsyncThunk } from "@reduxjs/toolkit";
 import axios from '@/libs/axios'

// export const getAllMembers = createAsyncThunk(
//     'member/getAll',
//     async (_, { rejectWithValue }) => {
//         try {
//             // const response = await axios.get('/profile');
//             const response = await axios.get("/admin/member/all",{ headers: {Role: 'admin'}});
//             const data = response.data.users
//             const formattedData = data.map((member, index) => ({
//                 ID: index + 1,
//                 id: member.id,
//                first_name: member.first_name,
//                last_name: member.last_name,
//                phone: member.phone,
//              }));
//             return formattedData;  
//         } catch (error) {
//             if (error.response){
//                 return rejectWithValue(error.response)
//             }
//             else {
//                 return rejectWithValue(error.request);
//             }
//         }
//     }
// )

export const getAllMembers = createAsyncThunk(
    "member/getAll",
    async (fields = [], { rejectWithValue }) => {
      try {
        const response = await axios.get("/admin/member/all", {
          headers: { Role: "admin" },
        });
        const data = response.data.users;
  
        // Conditionally format data based on the fields provided
        const formattedData = data.map((member, index) => {
          const memberData = {
            ID: index + 1,
            id: member.id,
            first_name: member.first_name,
            last_name: member.last_name,
            phone: member.phone,
          };
  
          // Only keep fields specified in the `fields` array
          if (fields.length) {
            return fields.reduce((acc, field) => {
              if (memberData[field]) {
                acc[field] = memberData[field];
              }
              return acc;
            }, {});
          }
  
          return memberData; // Return full data if no fields are specified
        });
  
        return formattedData;
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
  );
  
