import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/libs/axios";

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

// export const getAllMembers = createAsyncThunk(
//     "member/getAll",
//     async (fields = [], { rejectWithValue }) => {
//       try {
//         const response = await axios.get("/admin/member/all", {
//           headers: { Role: "admin" },
//         });
//         const data = response.data.users;

//         if (!data || data.length === 0) {
//           // Return a formatted error for "No records found"
//           return rejectWithValue({
//             status: 404,
//             message: "No members found. Please try again later.",
//           });
//         }
//         console.log(response)

//         // Conditionally format data based on the fields provided
//         const formattedData = data.map((member, index) => {
//           const memberData = {
//             ID: index + 1,
//             id: member.id,
//             first_name: member.first_name,
//             last_name: member.last_name,
//             phone: member.phone,
//           };

//           // Only keep fields specified in the `fields` array
//           if (fields.length) {
//             return fields.reduce((acc, field) => {
//               if (memberData[field]) {
//                 acc[field] = memberData[field];
//               }
//               return acc;
//             }, {});
//           }

//           return memberData; // Return full data if no fields are specified
//         });

//         return formattedData;
//       } catch (error) {
//         if (error.response){
//               console.log(error.response.data)
//             // return rejectWithValue(error.response.data)
//             return rejectWithValue({status: error.response.status || 400, message:  "No record found"});

//         }
//         else {
//             console.log(error.request)
//             return rejectWithValue({status: 500, message:'Network error: Unable to reach the server.'});
//         }
//     }
//     }
//   );

// export const getAllMembers = createAsyncThunk(
//   "member/getAll",
//   async (fields = [], { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/admin/member/all", {
//         headers: { Role: "admin" },
//       });

//       const { status, message, users } = response.data;

//       // Check if the API status is false or if users array is missing/empty
//       if (!status || !Array.isArray(users) || users.length === 0) {
//         return rejectWithValue({
//           status: 404,
//           message: message || "No members found",
//         });
//       }

//       const formattedData = users.map((member, index) => {
//         const memberData = {
//           ID: index + 1,
//           id: member.id,
//           first_name: member.first_name,
//           last_name: member.last_name,
//           phone: member.phone,
//         };

//         // Filter by specified fields if provided
//         if (fields.length) {
//           return fields.reduce((acc, field) => {
//             if (memberData[field]) {
//               acc[field] = memberData[field];
//             }
//             return acc;
//           }, {});
//         }

//         return memberData; // Return full data if no fields specified
//       });

//       return formattedData;
//     } catch (error) {
//       if (error.response) {
//         console.log("Error Response:", error.response.data);
//         return rejectWithValue({
//           status: error.response.status,
//           message: error.response.data.message || "An error occurred",
//         });
//       } else {
//         console.log("Error Request:", error.request);
//         return rejectWithValue({
//           status: 500,
//           message: "Network error: Unable to reach the server.",
//         });
//       }
//     }
//   }
// );

export const getAllMembers = createAsyncThunk(
  "member/getAll",
  async (fields = [], { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/member/all", {
        headers: { Role: "admin" },
      });

      const { status, message, users: data } = response.data;

      // Check for API-specific error response
      if (status === false) {
        // Return the API error message
        return rejectWithValue({
          status: 404, // Set a more meaningful status for the frontend
          message: message || "No record found.",
        });
      }

      if (!data || data.length === 0) {
        // Handle empty data gracefully
        return rejectWithValue({
          status: 404,
          message: "No members found. Please try again later.",
        });
      }


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
      if (error.response) {
       
        const { message, status } = error.response.data;

        return rejectWithValue({
          status: error.response.status || status || 400,
          message: message || "An error occurred while fetching members.",
        });
      } else {
        return rejectWithValue({
          status: 500,
          message: "Network error: Unable to reach the server.",
        });
      }
    }
  }
);

