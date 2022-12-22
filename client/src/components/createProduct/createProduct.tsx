import React, { useState } from "react";
import axios from "axios";

export default function createProduct() {
  const [state, setState] = useState({});

  const postProduct = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/products",
      state
    );
    setState(response.data);
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form>
        
      </form>
    </div>
  );
}
