import axios from "axios"

// export const fetchMessageParameters = async () => {
//     try{
//         const response = await axios.get("/admin/message/message-parameters",
//             { headers: {Role: 'admin'}}
//         )
//         return response.data.message_parameters
//     }catch(error){
//         throw error.response?.data || error.message 
//     }
// }

export const sendTransactionSms = async (formData) => {
    try{
        const response = await axios.post("/admin/message/transaction-sms",formData,
            { headers: {Role: 'admin'}}
        )
        return response.data.message
    }catch(error){
        throw error.response?.data || error.message 
    }
}