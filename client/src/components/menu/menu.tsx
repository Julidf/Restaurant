import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import NavbarHandler from "../navbar/navbarHandler";

export default function Menu() {
  const [state, setState] = useState<any[]>([]);

  const getApi = async () => {
    await axios
      .get(`/api/products`)
      .then((response) => setState(response.data))
      .catch(error=>"No products found" + error.message)
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <NavbarHandler />
      <div className="all__products__container">
        {!state.length
          ? <h1>"There is no products to show..."</h1>
          : state.map((product) => <Card key={product.id} {...product} />)}
      </div>
    </div>
  );
}
