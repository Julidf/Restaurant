import "../../../App.css";
import { Fragment, useEffect, useState } from "react";
import NavbarHandler from "../../navbar/navbarHandler";
import {useNavigate } from "react-router-dom";
import { DBProduct, ProductsPropsIndexable } from "../../../utils/interfaces/productInterfaces";
import { getProducts } from "../../../utils/services/axiosRequests";

function ProductDashboard() {
    
    const navigate = useNavigate();
    const [productList, setProductList] = useState<ProductsPropsIndexable[]>([]);
    const [search, setSearch] = useState<string>("");
    const results = !search ? productList : productList.filter((product: DBProduct)=> product.name.toLowerCase().includes(search.toLowerCase()))
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    
    useEffect ( () => {
        getProductList();
    }, [])

    const getProductList = async () => {
        const response = await getProducts();
        setProductList(response.data)
    }

    const handleEditClick = (product: DBProduct) => {
        navigate(`/admin/products/${product.id}`, { state: { product } });
    };
    
    const handleCreateClick = () => {
        navigate("/admin/products/create-product");
    };

    const searcher = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearch(event.target.value)
    }

    const orderBy = (property: keyof ProductsPropsIndexable) => {
        setSortAscending(!sortAscending);
        productList.sort((a, b) => {
            if (sortAscending) {
                return a[property] > b[property] ? 1 : -1;
            } else {
                return b[property] > a[property] ? 1 : -1;
            }
        });
    };

    return (
        <Fragment>
            <NavbarHandler/>
            <div className="filter_container">
                <button type="button" onClick={() => handleCreateClick()} className="create_product_button">Create Product</button>
                <input value={search} type="text" placeholder="Search by name" onChange={searcher} className="filter_input"/>
            </div>
            <table className="table_product">
                <thead>
                    <tr>
                        <th><button onClick={() => orderBy("id")} type="button" className="order_modify_button">ID</button></th>
                        <th><button onClick={() => orderBy("name")} type="button" className="order_modify_button">NAME</button></th>
                        <th>DESCRIPTION</th>
                        <th><button onClick={() => orderBy("price")} type="button" className="order_modify_button">PRICE</button></th>
                        <th><button onClick={() => orderBy("stock")} type="button" className="order_modify_button">STOCK</button></th>
                        <th><button onClick={() => orderBy("isAvailable")} type="button" className="order_modify_button">AVAILABLE</button></th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((product: DBProduct) => (
                        <tr key={product.id}>
                            <td className="td_product">{product.id}</td>
                            <td className="td_product">{product.name}</td>
                            <td className="td_product">{product.description}</td>
                            <td className="td_product">{`$${product.price}`}</td>
                            <td className="td_product">{`${product.stock} u.`}</td>
                            <td className="td_product">{`${product.isAvailable}`}</td>
                            <td className="td_product_button"><button type="button" onClick={() => handleEditClick(product)} className="modify_product_button">EDIT</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ProductDashboard;