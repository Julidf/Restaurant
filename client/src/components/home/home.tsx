<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";

export default function Home() {
  const [state, setState] = useState<any[]>([]);

  const fetchApi = async () => {
    const response = await axios.get("http://localhost:8080/api/products");
    setState(response.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      {!state
        ? "loading..."
        : state.map((product) => <Card key={product.id} {...product} />)}
    </div>
  );
}
=======
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


>>>>>>> 69f5b54c2d95e94635409773f6610ff56d1182fe
