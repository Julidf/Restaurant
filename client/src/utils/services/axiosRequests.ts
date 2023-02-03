import axios from "axios";
import Product from "../interfaces/iProduct";
import User from "../interfaces/IUserLogin";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getUserList: Function = async () => {
  const { data } = await axios.get("/api/users", config);
  return data;
};

export const deleteUser: Function = async (id: number) => {
  await axios.delete(`/api/users/${id}`, config);
};

export const postProduct: Function = async (product: Product) => {
  await axios.post(`/api/admin/create-product`, product, config);
};

export const loginUser: Function = async (user: User) => {
  const { data } = await axios.post(`/api/login`, user);
  if (!data.token) throw new Error("Invalid email or password.");
  localStorage.setItem("token", data.token);
  return token;
};
