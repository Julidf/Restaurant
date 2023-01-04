import React from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import validation from "./validation";
const miApi: string = (process.env.REACT_APP_miApi as string);

interface Product {
  name: string,
  description: string,
  price: number,
  stock: number,
  image: string
}

export default function CreateProduct() {

  const postProduct = async (product: any) => {
    await axios.post(`${miApi}/products`, product);
  };

  function submitButtonHandler(values: any) {
    Swal.fire({icon: 'success',
            title: "Product created! "});
    postProduct(values);
  }
  
  const initialValues: Product ={
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitButtonHandler(values)}
      validationSchema={validation}
    >
      {({ handleSubmit, values, handleChange, validateOnChange }) => (
        <Form className="form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="form__label">
            Name:
            <Field
              type="text"
              name="name"
              placeholder="insert name"
              className="form__input"
              value={values.name}
              onChange={handleChange}
              validate={validateOnChange}
            />
            <ErrorMessage
              name="name"
              component="span"
              className="form__error"
            />
          </label>

          <label htmlFor="description" className="form__label">
            Description:
            <Field
              type="text"
              name="description"
              placeholder="insert description"
              className="form__input"
              value={values.description}
              onChange={handleChange}
            />
            <ErrorMessage
              name="description"
              component="span"
              className="form__error"
            />
          </label>

          <label htmlFor="price" className="form__label">
            Price:
            <Field
              type="number"
              step="0.01"
              name="price"
              placeholder="insert price"
              className="form__input"
              value={values.price}
              onChange={handleChange}
              validate={validateOnChange}
            />
            <ErrorMessage
              name="price"
              component="span"
              className="form__error"
            />
          </label>

          <label htmlFor="stock" className="form__label">
            Stock:
            <Field
              type="number"
              name="stock"
              placeholder="insert stock"
              className="form__input"
              value={values.stock}
              onChange={handleChange}
            />
            <ErrorMessage
              name="stock"
              component="span"
              className="form__error"
            />
          </label>

          <label htmlFor="image" className="form__label">
            Image:
            <Field
              type="text"
              name="image"
              placeholder="insert image"
              className="form__input"
              value={values.image}
              onChange={handleChange}
            />
            <ErrorMessage
              name="image"
              component="span"
              className="form__error"
            />
          </label>

          <button type="submit" className="btn">Create</button>
        </Form>
      )}
    </Formik>
  );
}
