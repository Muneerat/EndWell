import axios from "axios";

export const fetchPermissions = async () => {
  try {
    const response = await axios.get("/permissions", {
      headers: { Role: "admin" },
    });

    return response.data.transactions;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
