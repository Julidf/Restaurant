import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Product from "../interfaces/iProduct";
import User from "../interfaces/IUserLogin";

let navigate = useNavigate();
const location = useLocation();
const from = location.state?.from?.pathname || "/";
const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getUserList: Function = async () => {
  const { data } = await axios.get("/api/admin/users", config);
  return data;
};

export const deleteUser: Function = async (id: number) => {
  await axios.patch(`/users/${id}`, config);
};

export const postProduct: Function = async (product: Product) => {
  await axios.post(`/api/admin/create-product`, product, config);
};

export const loginUser: Function = async (user: User) => {
  try {
    const { data } = await axios.post(`/api/login`, user);

    if (!data.token) {
      throw new Error();
    }

    localStorage.setItem("token", data.token);
    navigate(from, { replace: true });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops! ",
      text: "Incorrect Email or Password",
    });
  }
};
