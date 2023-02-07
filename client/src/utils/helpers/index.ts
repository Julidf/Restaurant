import Swal from "sweetalert2";
import Product from "../interfaces/iCreateProduct";
import User from "../interfaces/IUserLogin";
import { deleteUser, loginUser, patchProduct, postProduct } from "../services/axiosRequests";

export async function ProductsubmitButtonHandler(values: Product) {
  try {
    await postProduct(values);
    Swal.fire({
      icon: "success",
      title: "Product created! ",
      text: values.name + " added to the list.",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops! ",
      text: "Something went wrong, please try again",
    });
  }
}

export async function ProductModifyButtonHandler (values: Product, id:number) {
  try {
    await patchProduct(values, id);
    Swal.fire({
      icon: "success",
      title: "Product modify! ",
      text: values.name + " has been modify.",
    });
  } catch (error) {
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
      await loginUser(user)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops! ",
        text: "Incorrect Email or Password",
      });
    }
  };