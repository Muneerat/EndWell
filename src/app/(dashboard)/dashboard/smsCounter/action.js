import axios from "axios";

export const fetchSMSCount = async ({year,month,id }) => {
  try {
    const response = await axios.get("/sms/request/counter", {
      headers: { Role: "admin" },
      params: {year,month, member_id: id || undefined },
    });
console.log(response);

    return response.data.records;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
