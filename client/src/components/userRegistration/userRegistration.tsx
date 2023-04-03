import { ErrorMessage, Field, Form, Formik } from "formik";
import { UserRegister } from "../../utils/interfaces/userInterfaces";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import userRegisterValidation from "../../utils/validations/userRegisterValidation";
import { registerUser } from "../../utils/services/axiosRequests";
import './registerStyle.css';

export default function UserRegistration() {
  const navigate = useNavigate();

  async function submitButtonHandler(values: UserRegister) {
    try {
      await registerUser(values);
      Swal.fire({
        icon: "success",
        title: "User registered! ",
        text: values.firstname + " added succefully.",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops! ",
        text: "Email already registered",
      });
    }
  }

  const initialValues: UserRegister = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: UserRegister) => submitButtonHandler(values)}
      validationSchema={userRegisterValidation}
    >
      {({ handleSubmit, values, handleChange, validateOnChange }) => (
        <div className="box_container_register">
          <header>
            <h3>Register a new user:</h3>
          </header>
          <div className="body_container_register">
            <Form className="form" onSubmit={handleSubmit}>
              <label htmlFor="firstname" className="form__label">
                Name:
                <Field
                  type="text"
                  name="firstname"
                  placeholder="Insert name"
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
            <div className="extras_container">
              <button type="button" onClick={() => navigate(-1)} className="cancel_button_register">
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
