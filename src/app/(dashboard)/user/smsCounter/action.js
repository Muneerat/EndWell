import axios from "axios";

export const fetchSMSCount = async ({year,month,member_id }) => {
  try {
    const response = await axios.get("/sms/request/counter", {
      params: {year,month, member_id},
    });
console.log(response);

    return response.data.records;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
