
import axios from "axios";

/**
 * Fetches available years for selection.
 * @returns {Promise} Axios response with year data.
 */
export const fetchMessageTemplate = async () => {
  try {
    const response = await axios.get("/admin/message/settings", {headers: {Role: 'admin'},}); 
 
    
    return response.data;
  } catch (error) {
   
     throw error.response?.data || error.message;
  }
};