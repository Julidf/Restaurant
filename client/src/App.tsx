import React from "react";
import "./App.css";
import Menu from "./components/menu/menu";
import { Route, Routes } from "react-router-dom";
import CreateProduct from "./components/dashboard/product/createProduct";
import UserRegistration from "./components/userRegistration/userRegistration";
import LoginForm from "./components/signIn/loginForm";
import Landing from "./components/landing/landing";
import Wrapper from "./components/wrapper/wrapper";
import PrivateRoute from "./components/middleware/privateRoute";
import ContactUs from "./components/contactUs/contactUs";
import UserList from "./components/dashboard/user/userList";
import ProductDashboard from "./components/dashboard/product/productDashboard";
import ProductModify from "./components/dashboard/product/productModify";

function App() {
  return (
      <Wrapper>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/contact-us" element={<ContactUs />} />
          
          <Route element={<PrivateRoute requiredRole="ADMIN"/>}>
            <Route path="/admin/products" element={<ProductDashboard />} />
            <Route path={"/admin/products/:id"} element={<ProductModify/>}/>
            <Route path="/admin/products/create-product" element={<CreateProduct/>}/>
            <Route path="/admin/users" element={<UserList /> } />
            <Route path="/admin/orders" element={<CreateProduct />} />
          </Route>

        </Routes>
      </Wrapper>
  );
}

export default App;
