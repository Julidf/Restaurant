import axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import User from "../../utils/interfaces/IUserLogin";
import validation from "../../utils/validations/loginValidation";
import { useAuth } from "../navbar/useAuth";

export default function LoginForm() {

  let navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const goBack = () => navigate(-1);
  const {isLoggedIn} = useAuth();

  const handleSubmit = async (values: User) => {
    try {
      const response = await axios.post(`/api/login`, values);
      
      if (!response.data.token){
        throw new Error();
      }

      localStorage.setItem("token", response.data.token);
      navigate(from, { replace: true });
    } catch (e: any) {
      Swal.fire({
        icon: "error",
        title: "Oops! ",
        text: "Incorrect Email or Password",
      });
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
        <div className="form__container">
          <h3>Welcome back!</h3>
          <Form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="form__label">
              Email:
              <Field
                type="email"
                name="email"
                placeholder="Insert email"
                autoComplete="off"
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
            <Link to={"/register"} className="btn">
              Register
            </Link>
            <button type="button" onClick={goBack} className="btn">
              Cancel
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
