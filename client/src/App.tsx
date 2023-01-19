import React from "react";
import "./App.css";
import Menu from "./components/menu/menu";
import { Route, Routes } from "react-router-dom";
import CreateProduct from "./components/createProduct/createProduct";
import UserRegistration from "./components/userRegistration/userRegistration";
import LoginForm from "./components/signIn/loginForm";
import Landing from "./components/landing/landing";
import Wrapper from "./components/wrapper/wrapper";

function App() {
  return (
      <Wrapper>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<UserRegistration />} />
        </Routes>
      </Wrapper>
  );
}

export default App;
