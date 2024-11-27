import axios from "axios"

export const fetchMessageParameters = async () => {
    try{
        const response = await axios.get("/admin/message/message-parameters",
            { headers: {Role: 'admin'}}
        )
        return response.data.message_parameters
    }catch{
        throw error.message 
    }
}