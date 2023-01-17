import React from "react";
import "./App.css";
import Home from "./components/home/home";
import { Route, Routes } from "react-router-dom";
import CreateProduct from "./components/createProduct/createProduct";
import Landing from "./components/landing/landing";
import UserRegistration from "./components/userRegistration/userRegitration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/register" element={<UserRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
