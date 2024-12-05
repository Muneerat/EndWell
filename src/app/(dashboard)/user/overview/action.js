import axios from "axios";

export const fetchTransactionUser = async ({month,year,member_id }) => {
  try {
    const response = await axios.get("/admin/transaction/history", {
      params: { month, year, member_id },
    });
   

    return response.data.transactions;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
