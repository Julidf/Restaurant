import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import NavbarHandler from "../../navbar/navbarHandler";
import validation from "../../../utils/validations/modifyUserValidation";
import { modifyUserBtnHandler } from "../../../utils/helpers";
import UserReg from "../../../utils/interfaces/IUserReg";
import { getUserById } from "../../../utils/services/axiosRequests";

export default function ModifyUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userProps = getUserById(id)

  const initialValues: UserReg = {
    firstname: userProps.firstname,
    lastname: userProps.lastname,
    email: userProps.email,
    password: userProps.password,
  };
  return (
    <>
      <NavbarHandler />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => modifyUserBtnHandler(values, id)}
        validationSchema={validation}
      >
        {({ handleSubmit, values, handleChange, validateOnChange }) => (
          <div className="form__container">
            <h3>Add a new product</h3>
            <Form className="form" onSubmit={handleSubmit}>
              <label htmlFor="firsname" className="form__label">
                Name:
                <Field
                  type="text"
                  name="firsname"
                  placeholder="Insert name"
                  autoComplete="off"
                  className="form__input"
                  value={values.firstname}
                  onChange={handleChange}
                  validate={validateOnChange}
                />
                <ErrorMessage
                  name="name"
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

              <label htmlFor="price" className="form__label">
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

              <button type="submit" className="btn">
                Modify
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn"
              >
                Cancel
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
