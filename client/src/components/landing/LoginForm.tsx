import axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import User from "./IUser";
import validation from "./validation";

export default function LoginForm() {
  let navigate = useNavigate();

  const handleSubmit = async (values: User) => {
    try {
      const response = await axios.post(`/api/login`, values);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (e: any) {
      Swal.fire({
        icon: "error",
        title: "Oops! ",
        text: "Something went wrong, please try again",
      });
      console.log("ERROR ERROR ERROR !!!");
    }
  };

  const initialValues: User = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: User) => handleSubmit(values)}
      validationSchema={validation}
    >
      {({ handleSubmit, values, handleChange, validateOnChange }) => (
        <Form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="form__label">
            Email:
            <Field
              type="email"
              name="email"
              placeholder="Insert email"
              className="form__input"
              value={values.email}
              onChange={handleChange}
              validate={validateOnChange}
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
              validate={validateOnChange}
            />
            <ErrorMessage
              name="password"
              component="span"
              className="form__error"
            />
          </label>

          <button type="submit" className="btn">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}
