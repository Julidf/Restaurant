import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import validation from "../../utils/validations/productValidation";
import Product from "../../utils/interfaces/iProduct";
import { Link } from "react-router-dom";
import UserNavBar from "../navbar/userNavBar";

export default function CreateProduct() {
  const token = localStorage.getItem("token");
  const postProduct = async (product: Product) => {
    await axios.post(`/api/admin/create-product`, product, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  };

  async function submitButtonHandler(values: Product) {
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

  const initialValues: Product = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  };
  return (
    <>
    <UserNavBar />
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitButtonHandler(values)}
      validationSchema={validation}
    >
      {({ handleSubmit, values, handleChange, validateOnChange }) => (
        <div className="form__container">
          <h3>Add a new product</h3>
          <Form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form__label">
              Name:
              <Field
                type="text"
                name="name"
                placeholder="Insert name"
                autoComplete="off"
                className="form__input"
                value={values.name}
                onChange={handleChange}
                validate={validateOnChange} />
              <ErrorMessage
                name="name"
                component="span"
                className="form__error" />
            </label>

            <label htmlFor="description" className="form__label">
              Description:
              <Field
                type="text"
                name="description"
                placeholder="Insert description"
                autoComplete="off"
                className="form__input"
                value={values.description}
                onChange={handleChange} />
              <ErrorMessage
                name="description"
                component="span"
                className="form__error" />
            </label>

            <label htmlFor="price" className="form__label">
              Price:
              <Field
                type="number"
                step="0.01"
                name="price"
                placeholder="Insert price"
                autoComplete="off"
                className="form__input"
                value={values.price === 0 ? "" : values.price}
                onChange={handleChange}
                validate={validateOnChange} />
              <ErrorMessage
                name="price"
                component="span"
                className="form__error" />
            </label>

            <label htmlFor="stock" className="form__label">
              Stock:
              <Field
                type="number"
                name="stock"
                placeholder="Insert stock"
                autoComplete="off"
                className="form__input"
                value={values.stock === 0 ? "" : values.stock}
                onChange={handleChange} />
              <ErrorMessage
                name="stock"
                component="span"
                className="form__error" />
            </label>

            <label htmlFor="image" className="form__label">
              Image:
              <Field
                type="text"
                name="image"
                placeholder="Insert image"
                autoComplete="off"
                className="form__input"
                value={values.image}
                onChange={handleChange} />
              <ErrorMessage
                name="image"
                component="span"
                className="form__error" />
            </label>

            <button type="submit" className="btn">
              Create
            </button>
            <Link to={"/"} className="btn">
              Cancel
            </Link>
          </Form>
        </div>
      )}
    </Formik>
    </>
  );
}
