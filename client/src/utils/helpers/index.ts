import Swal from "sweetalert2";
import { SendableProduct } from "../interfaces/productInterfaces";
import { UserLogin } from "../interfaces/userInterfaces";
import { deleteUser, loginUser, patchProduct, postProduct, deleteProduct } from "../services/axiosRequests";

export async function ProductsubmitButtonHandler(values: SendableProduct) {
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

export async function ProductModifyButtonHandler (values: SendableProduct, id:number) {
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

function confirmAlert(){
  const value = Swal.fire({
    icon: "question",
    title: "Are you sure you to continue?",
    showConfirmButton: true,
    showDenyButton: true,
  })
  return value
}

export async function tryDeleteProduct(id: number, productName: string){
  if ((await confirmAlert()).value === true) {
      try {
      const response = await deleteProduct(id);
      Swal.fire({
        icon: "success",
        title: "Product DELETED! ",
        text: productName.toUpperCase() + " has been deleted.",
      });
      return response;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops! ",
          text: "Something went wrong, please try again",
        });
      }
    }
}

export async function tryRestoreProduct(id: number, value: {}, productName: string){
  if ((await confirmAlert()).value === true) {
      try {
      const response = await patchProduct(value, id);
      Swal.fire({
        icon: "success",
        title: "Product RESTORED! ",
        text: productName.toUpperCase() + " has been restored.",
      });
      return response;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops! ",
          text: "Something went wrong, please try again",
        });
      }
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

  export const userLoginHandleSubmit = async (user: UserLogin) => {
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