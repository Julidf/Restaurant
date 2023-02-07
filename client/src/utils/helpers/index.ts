import Swal from "sweetalert2";
import Product from "../interfaces/iProduct";
import User from "../interfaces/IUserLogin";
import UserReg from "../interfaces/IUserReg";
import {
  deleteUser,
  loginUser,
  modifyUser,
  postProduct,
} from "../services/axiosRequests";

export async function ProductsubmitButtonHandler(values: Product) {
  try {
    await postProduct(values);
    Swal.fire({
      icon: "success",
      title: "Product created! ",
      text: values.name + "added to the list.",
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops! ",
      text: "Something went wrong, please try again",
    });
  }
}

export const userDashboardHandleDelete = (id: number) => {
  try {
    deleteUser(id);
    Swal.fire({
      icon: "success",
      title: "Success! ",
      text: "User deleted successfully.",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Something went wrong.",
    });
  }
};

export const userLoginHandleSubmit = async (user: User) => {
  try {
    await loginUser(user);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops! ",
      text: "Incorrect Email or Password",
    });
  }
};

export const modifyUserBtnHandler = async (
  user: UserReg,
  id: string | undefined
) => {
  try {
    await modifyUser(user, id);
    Swal.fire({
      icon: "success",
      title: "Success! ",
      text: "User modified successfully." + user.email,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Something went wrong.",
    });
  }
};
