import handleErrors from "@/app/data/handleErrors";
import axios from "axios";

/**
 * Fetches available years for selection.
 * @returns {Promise} Axios response with year data.
 */
export const fetchYears = async () => {
  try {
    const response = await axios.get("/fetch-years",); 
    return response.data;
  } catch (error) {
   
     throw error.response?.data || error.message;
  }
};

/**
 * Fetches available months for a selected year.
 * @param {string} year The selected year.
 * @returns {Promise} Axios response with month data.
 */
export const fetchMonths = async () => {
  try {
    const response = await axios.get(`/fetch-months`); 
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchRequestTypes = async () => {
    try {
      const response = await axios.get(`/request-types`); 
      console.log(response);
      
      return response.data.months;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

/**
 * Uploads the ledger file.
 * @param {FormData} formData FormData containing the file and other data.
 * @returns {Promise} Axios response for the upload.
 */
export const uploadLedger = async (formData) => {
  try {
    const response = await axios.post("/member/request/sms", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
