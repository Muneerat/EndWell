import axios from "axios";

export const fetchTransaction = async ({month,year,id = null}) => {
  try {
    const response = await axios.get("/admin/transaction/history", {
      params: { month, year, id },
    });
    console.log(response.data.transactions);

    return response.data.transactions;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
