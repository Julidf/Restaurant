import UserNavBar from "../navbar/userNavBar"
import "../../App.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductDashboard() {

    const [products, setProducts] = useState([]);

    useEffect ( () => {
        const getProducts = async () => {
            const response = await axios.get('/api/products')
            setProducts(response.data);
        };
        getProducts();
    }, [])

    interface productsProps {
        id: number
        name: string
        description: string
        price: number
        stock: number
        isAvailable: boolean
    }

    return (
        <div>
            <UserNavBar/>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th>IS AVAILABLE</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: productsProps) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{`${product.isAvailable}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}