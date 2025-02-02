import axios from "axios";

export const fetchTransactionUser = async ({ month, year, member_id }) => {
  try {
    const response = await axios.get("/transaction/history", {
      params: { month, year, member_id },
    });

    return response.data.transactions;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const RequestWithdrawableDividend = async ({}) => {
  try {
    const response = await axios.post("/member/request/withdrawable/dividend", {
      params: {},
    });

    return response.data.message;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
