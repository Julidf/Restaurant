import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { userLoginHandleSubmit } from "../../utils/helpers";
import { UserLogin } from "../../utils/interfaces/userInterfaces";
import validation from "../../utils/validations/loginValidation";
import { useAuth } from "../navbar/useAuth";
import './loginStyle.css';

export default function LoginForm() {
  
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (user: UserLogin) => {
    await userLoginHandleSubmit(user);
    navigate(from, { replace: true });
  };

  const initialValues: UserLogin = {
    email: "",
    password: "",
  };

  return !isLoggedIn ? (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: UserLogin) => handleSubmit(values)}
      validationSchema={validation}
    >
      {({ handleSubmit, values, handleChange, validateOnChange }) => (
        <div className="box_container_login">
          <header>
            <h1>Welcome back!</h1>
          </header>
          <div className="body_container_login">
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
            </Form>
            <div className="extras_container">
              <p> Don't have an account?  
                <Link to={"/register"} className="register_button">
                  Register
                </Link>
              </p>
            </div>
              <button type="button" onClick={() => navigate(-1)} className="cancel_button_login">
                X
              </button>
          </div>  
        </div>
      )}
    </Formik>
  ) : (
    <Navigate to={"/"} />
  );
}
