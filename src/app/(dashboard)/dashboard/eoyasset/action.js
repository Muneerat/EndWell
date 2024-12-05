import axios from "axios";

export const fetchEoyasset = async ({year,id }) => {
  try {
    const response = await axios.get("/admin/transaction/eoyasset", {
      headers: { Role: "admin" },
      params: {year, member_id: id || undefined },
    });

    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
