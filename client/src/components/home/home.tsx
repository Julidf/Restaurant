import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import UserNavBar from "../navbar/userNavBar";
const miApi: string = (process.env.REACT_APP_miApi as string);

export default function Home() {
  
  const [state, setState] = useState<any[]>([]);
  
  const getApi = async () => {
    const response = await axios.get(`${miApi}/products`);
    setState(response.data);
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <UserNavBar/>
      {!state
        ? "loading..."
        : state.map((product) => <Card key={product.id} {...product} />)}
    </div>
  );
}



