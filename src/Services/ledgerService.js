import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '@/libs/axios'

export const getAllLedger = createAsyncThunk(
    'ledger/getAll',
    async (_, { rejectWithValue }) => {
        try {
            // const response = await axios.get('/profile');
            const response = await axios.get("/admin/ledger/all",{ headers: {Role: 'admin'}});
            const data = response.data.ledgers
            
            const ledgers = data.map((ledger,index) => ({
                ID: index + 1,
                id: ledger.id,
                fileName: ledger.file_name,
                fileType: ledger.file_type,
                dateUploaded: ledger.date,
                status: ledger.status,
                uploaded_by: ledger.uploaded_by,
              }))
            return ledgers;  
        } catch (error) {
            if (error.response){
                //   console.log(error.response.data.message)
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

