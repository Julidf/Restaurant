import "../../../App.css";
import { Fragment, useEffect, useState } from "react";
import NavbarHandler from "../../navbar/navbarHandler";
import {useNavigate } from "react-router-dom";
import { ProductsProps } from "../../../utils/interfaces/productInterfaces";
import { getProducts } from "../../../utils/services/axiosRequests";

function ProductDashboard() {
    
    const [productList, setProductList] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const results = !search ? productList : productList.filter((product: ProductsProps)=> product.name.toLowerCase().includes(search.toLowerCase()))

    useEffect ( () => {
        getProductList();
    }, [])
    
    const getProductList = async () => {
        const response = await getProducts();
        setProductList(response.data)
    }

    const handleEditClick = (product: ProductsProps) => {
        navigate(`/admin/products/${product.id}`, { state: { product } });
    };
    
    const handleCreateClick = () => {
        navigate("/admin/products/create-product");
    };

    const searcher = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearch(event.target.value)
    }

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
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th>AVAILABLE</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((product: ProductsProps) => (
                        <tr key={product.id}>
                            <td className="td_product">{product.id}</td>
                            <td className="td_product">{product.name}</td>
                            <td className="td_product">{product.description}</td>
                            <td className="td_product">{`${product.price} $`}</td>
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