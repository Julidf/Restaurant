import axios from 'axios';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import React, { useState } from 'react';
import  './LoginForm.css';
import User from './IUser';
import validation from "./validation";
const miApi: string = (process.env.REACT_APP_miApi as string);

export default function LoginForm() {

  const handleSubmit = async (values: User) => {
    try {
      const response = await axios.post(`${miApi}/login`, values);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/home';
    } catch (e: any) {
      console.log("ERROR ERROR ERROR !!!")
    }
  };

  const initialValues: User = {
    username: "",
    password: "",

  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={validation}
    >
      {({ handleSubmit, values, handleChange, validateOnChange }) => (
        <Form className="form" onSubmit={handleSubmit}>

          <label htmlFor="username" className="form__label">
            Name:
            <Field
              type="text"
              name="username"
              placeholder="Insert username"
              className="form__input"
              value={values.username}
              onChange={handleChange}
              validate={validateOnChange}
            />
            <ErrorMessage
              name="name"
              component="span"
              className="form__error"
            />
          </label>

          <label htmlFor="password" className="form__label">
            Name:
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

