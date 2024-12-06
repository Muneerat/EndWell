import axios from "axios";

export const fetchTransaction = async ({month,year,id = null}) => {
  try {
    const response = await axios.get("/transaction/history", {
      headers: { Role: "admin" },
      params: { month, year, member_id: id || undefined  },
    });
    console.log(response.data.transactions);

    return response.data.transactions;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
