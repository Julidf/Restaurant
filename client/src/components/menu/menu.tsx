import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import NavbarHandler from "../navbar/navbarHandler";
import './stylesMenu.css';
import { DBProduct } from "../../utils/interfaces/productInterfaces";
import { getProducts } from "../../utils/services/axiosRequests";

export default function Menu() {
  const [productList, setProductList] = useState<DBProduct[]>([]);

  useEffect(() => {
    getProductList();
  }, []);
  
  const getProductList = async () => {
    const response = await getProducts()
    setProductList(response.data)
  };

  return (
    <Fragment>
      <NavbarHandler />
      <div className="all_products_container">
        {!productList
          ? <h1>"There is no products to show..."</h1>
          : productList.map((product) => <Card key={product.id} {...product} />)}
      </div>
    </Fragment>
  );
}
