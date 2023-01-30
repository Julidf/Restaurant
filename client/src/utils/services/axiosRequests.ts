import axios from "axios";
const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getUserList = async () => {
  const response = await axios.get("/api/admin/users", config);
  return response.data;
};
