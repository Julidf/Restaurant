import "../../../App.css";
import { useEffect, useState } from "react";
import NavbarHandler from "../../navbar/navbarHandler";
import {useNavigate } from "react-router-dom";
import { ProductsProps } from "../../../utils/interfaces/iProductProps";
import { getProducts } from "../../../utils/services/axiosRequests";

function ProductDashboard() {
    
    const [productList, setProductList] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const results = !search ? productList : productList.filter((product: ProductsProps)=> product.name.toLowerCase().includes(search.toLowerCase()))
    const [edit, setEdit] = useState(false); 
    
    useEffect ( () => {
        getProductos();
    }, [])
    
    const getProductos = async () => {
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
        <div>
            <NavbarHandler/>
            <div className="filter_container">
                <button type="button" onClick={() => handleCreateClick()} className="create_product_button">Create New Product</button>
                <input value={search} type="text" placeholder="Search by name" onChange={searcher} className="filter_input"/>
            </div>
            <table className="table">
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
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{`${product.price} $`}</td>
                            <td>{`${product.stock} u.`}</td>
                            <td>{`${product.isAvailable}`}</td>
                            <td><button type="button" onClick={() => handleEditClick(product)} className="modify_product_button">EDIT</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductDashboard;