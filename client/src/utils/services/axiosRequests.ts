import axios from "axios";
import Product from "../interfaces/iCreateProduct";
import User from "../interfaces/IUserLogin";
import { productsProps } from "../interfaces/iProductProps";

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

export const patchProduct: Function = async (product: Product, id:number) => {
  await axios.patch(`/api/products/${id}`, product, config);
};

export const loginUser: Function = async (user: User) => {
  const { data } = await axios.post(`/api/login`, user);
  if (!data.token) throw new Error("Invalid email or password.");
  localStorage.setItem("token", data.token);
  return token;
};

export const getProducts = async () => {
  const response = await axios.get('/api/products')
  return response;
};
