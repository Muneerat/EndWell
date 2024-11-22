import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '@/libs/axios'

export const getAllLedger = createAsyncThunk(
    'member/getAll',
    async (_, { rejectWithValue }) => {
        try {
            // const response = await axios.get('/profile');
            const response = await axios.get("/admin/ledger/all");
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
                return rejectWithValue(error.response)
            }
            else {
                return rejectWithValue(error.request);
            }
        }
    }
)

