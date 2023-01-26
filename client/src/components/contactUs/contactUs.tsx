import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Contact from "../../utils/interfaces/IContactForm";
import validation from "../../utils/validations/contactFormValidation";

export default function ContactUs() {
  const navigate = useNavigate();

  const initialValues: Contact = {
    name: "",
    message: "",
    email: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "We will send you an email with the data requested!",
        });
      }}
      validationSchema={validation}
    >
      {({ handleSubmit, values, handleChange, validateOnChange }) => (
        <div className="form__container">
          <h3>Contact Us</h3>
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
                validate={validateOnChange}
              />
              <ErrorMessage
                name="name"
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
                validate={validateOnChange}
              />
              <ErrorMessage
                name="email"
                component="span"
                className="form__error"
              />
            </label>

            <label htmlFor="message" className="form__label">
              Message:
              <textarea
                name="message"
                placeholder="Your message here..."
                className="form__input"
                id="textarea"
                value={values.message}
                onChange={handleChange}
              />
              <ErrorMessage
                name="password"
                component="span"
                className="form__error"
              />
            </label>

            <button type="submit" className="btn">
              Submit
            </button>
            <button type="button" onClick={() => navigate(-1)} className="btn">
              Cancel
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
