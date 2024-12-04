import axios from "axios";

export const fetchEoyasset = async ({year,id = null}) => {
  try {
    const response = await axios.get("/admin/transaction/eoyasset", {
      headers: { Role: "admin" },
      params: {year, id },
    });
    console.log(response.data.data);

    return response.data.transactions;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
