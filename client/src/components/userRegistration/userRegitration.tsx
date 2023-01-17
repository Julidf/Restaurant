import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import User from "./IUserReg";
import userFormValidation from "./userFormValidation";

export default function UserRegistration() {
  const createUser = async (user: User) => {
    await axios.post(`/api/register`, user);
  };

  async function submitButtonHandler(values: User) {
    try {
      await createUser(values);
      Swal.fire({
        icon: "success",
        title: "User registered! ",
        text: values.firstname + "added succefully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops! ",
        text: "Something went wrong, please try again",
      });
    }
  }

  const initialValues: User = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitButtonHandler(values)}
      validationSchema={userFormValidation}
    >
      {({ handleSubmit, values, handleChange, validateOnChange }) => (
        <Form className="form" onSubmit={handleSubmit}>
          <label htmlFor="firstname" className="form__label">
            Name:
            <Field
              type="text"
              name="firstname"
              placeholder="Insert name"
              className="form__input"
              value={values.firstname}
              onChange={handleChange}
              validate={validateOnChange}
            />
            <ErrorMessage
              name="firstname"
              component="span"
              className="form__error"
            />
          </label>

          <label htmlFor="lastname" className="form__label">
            Lastname:
            <Field
              type="text"
              name="lastname"
              placeholder="Insert lastname"
              className="form__input"
              value={values.lastname}
              onChange={handleChange}
            />
            <ErrorMessage
              name="lastname"
              component="span"
              className="form__error"
            />
          </label>

          <label htmlFor="email" className="form__label">
            Email:
            <Field
              type="email"
              name="email"
              placeholder="Insert email"
              className="form__input"
              value={values.email}
              onChange={handleChange}
            />
            <ErrorMessage
              name="email"
              component="span"
              className="form__error"
            />
          </label>

          <label htmlFor="password" className="form__label">
            Password:
            <Field
              type="password"
              name="password"
              placeholder="Insert password"
              className="form__input"
              value={values.password}
              onChange={handleChange}
            />
            <ErrorMessage
              name="password"
              component="span"
              className="form__error"
            />
          </label>

          <button type="submit" className="btn">
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
}
