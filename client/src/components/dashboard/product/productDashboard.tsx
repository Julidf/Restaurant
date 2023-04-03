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
        const response = await getProducts().then((response) => setProductList(response.data) );
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
            <div className="head_dashboard">
                <div className="button_container_dashboard">
                    <button type="button" onClick={() => handleCreateClick()} className="button_create_dashboard">Create</button>
                </div>
                <div className="filter_container_dashboard">
                    <input value={search} type="text" placeholder="Search by name" onChange={searcher} className="input_filter_dashboard"/>
                </div>
            </div>
            <table className="table_admin">
                <thead className="thead_admin">
                    <tr>
                        <th className="th_admin"><button onClick={() => orderBy("id")} type="button" className="button_orderBy_dashboard">ID</button></th>
                        <th className="th_admin"><button onClick={() => orderBy("name")} type="button" className="button_orderBy_dashboard">NAME</button></th>
                        <th className="th_admin">DESCRIPTION</th>
                        <th className="th_admin"><button onClick={() => orderBy("price")} type="button" className="button_orderBy_dashboard">PRICE</button></th>
                        <th className="th_admin"><button onClick={() => orderBy("stock")} type="button" className="button_orderBy_dashboard">STOCK</button></th>
                        <th className="th_admin"><button onClick={() => orderBy("isAvailable")} type="button" className="button_orderBy_dashboard">AVAILABLE</button></th>
                    </tr>
                </thead>
                <tbody className="tbody_admin">
                    {results.map((product: DBProduct) => (
                        <tr className="tr_admin" key={product.id}>
                            <td className="td_admin_id">{product.id}</td>
                            <td className="td_admin">{product.name}</td>
                            <td className="td_admin">{product.description}</td>
                            <td className="td_admin">{`$${product.price}`}</td>
                            <td className="td_admin">{`${product.stock} u.`}</td>
                            <td className="td_admin">{`${product.isAvailable}`}</td>
                            <td className="td_admin_button"><button type="button" onClick={() => handleEditClick(product)} className="button_edit_dashboard">EDIT</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ProductDashboard;