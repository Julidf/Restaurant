import React from "react";
import "./App.css";
import Menu from "./components/menu/menu";
import { Route, Routes } from "react-router-dom";
import CreateProduct from "./components/createProduct/createProduct";
import UserRegistration from "./components/userRegistration/userRegistration";
import LoginForm from "./components/signIn/loginForm";
import Landing from "./components/landing/landing";
import Wrapper from "./components/wrapper/wrapper";
import PrivateRoute from "./components/middleware/privateRoute";

function App() {
  return (
      <Wrapper>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<UserRegistration />} />
          
          <Route element={<PrivateRoute requiredRole='ADMIN'/>}>
            <Route path="/admin/create-product" element={<CreateProduct/>}/>
            <Route path="/admin/users" element={<CreateProduct /> } />
            <Route path="/admin/orders" element={<CreateProduct />} />
            <Route path="/admin/product" element={<CreateProduct />} />
          </Route>

        </Routes>
      </Wrapper>
  );
}

export default App;
