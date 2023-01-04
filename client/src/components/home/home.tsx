import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  
  const [state, setState] = useState<any[]>([]);
  
  const getApi = async () => {
    const response = await axios.get("http://localhost:8080/api/products");
    setState(response.data);
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <ul>
        {!state ? "loading..." : state.map((product) => <li key={product.id}>{product.name}</li>)}
      </ul>
    </div>
  );
}


