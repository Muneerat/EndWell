import axios from "axios"

export const dashboardData = async () => {
    try{
        const response = await axios.get("/admin/dashboard-data",
            { headers: {Role: 'admin'}}
        )
        return response.data
    }catch(error){
        throw error.response?.data || error.message 
    }
}
