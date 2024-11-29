import axios from "axios"

export const allMessage = async () => {
    try{
        const response = await axios.get("/admin/message/all",
            { headers: {Role: 'admin'}}
        )
        
        return response.data
    }catch(error){
        throw error.response?.data || error.message 
    }
}