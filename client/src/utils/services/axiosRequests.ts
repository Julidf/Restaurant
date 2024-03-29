import axios from "axios";
import { DBProduct } from "../interfaces/productInterfaces";
import { UserLogin, UserRegister } from "../interfaces/userInterfaces";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getProducts = async () => {
  const response = await axios.get('/api/products')
  return response;
};

export const getUsers = async () => {
  const response = await axios.get("/api/users", config);
  return response;
};

export const deleteUser: Function = async (id: number) => {
  await axios.delete(`/api/users/${id}`, config);
};

export const postProduct: Function = async (product: DBProduct) => {
  await axios.post(`/api/admin/create-product`, product, config);
};

export const patchProduct: Function = async (product: DBProduct, id:number) => {
  const response = await axios.patch(`/api/products/${id}`, product, config);
  return response;
};

export const deleteProduct: Function = async (id: number) => {
  const response = await axios.delete(`/api/products/${id}`, config);
  return response
}

export const loginUser: Function = async (user: UserLogin) => {
  const { data } = await axios.post(`/api/login`, user);
  if (!data.token) throw new Error("Invalid email or password.");
  localStorage.setItem("token", data.token);
  return token;
};

export const registerUser: Function = async (user: UserRegister)  => {
  const response = await axios.post(`/api/register`, user);
  if (response.data.token){
    return response.data.token;
  } else {
    throw new Error("Error in the registerUser method");
  }
};

