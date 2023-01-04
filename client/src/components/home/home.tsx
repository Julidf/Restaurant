import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";

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
      {!state
        ? "loading..."
        : state.map((product) => <Card key={product.id} {...product} />)}
    </div>
  );
}



