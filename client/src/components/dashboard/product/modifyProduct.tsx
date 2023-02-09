import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../menu/card";
import Product from "../../../utils/interfaces/iCreateProduct";
import { ProductsProps } from "../../../utils/interfaces/iProductProps";
import { ProductModifyButtonHandler, tryDeleteProduct } from "../../../utils/helpers";
import { Fragment, useState } from "react";
import NavbarHandler from "../../navbar/navbarHandler";
import './styles.css';

export default function ProductModify () {
    const location = useLocation();
    const navigate = useNavigate();
    let product: ProductsProps = location.state?.product;
    const [editableProduct, setEditableProduct] = useState<ProductsPropsIterable>(convertToIterable(product));
    const [editing, setEditing] = useState(false);

    function convertToIterable(product: ProductsProps): ProductsPropsIterable {
        const productIterable: ProductsPropsIterable = {
            id:product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image: product.image,
            isAvailable: product.isAvailable
        }
        return productIterable
    }

    /* A iterable interface has a property whose name is a string and its value can be a string, number, or boolean (in this case). */
    interface ProductsPropsIterable {
        [key: string]: string | number| boolean;
        id: number
        name: string
        description: string
        price: number
        stock: number
        image: string
        isAvailable: boolean
    }
    
    function handleDeleteClick() {
        tryDeleteProduct(editableProduct.id, editableProduct.name)
    }

    /*Converts the object to a sendable one to the backend (I have to get rid of the "ID" and "IsAvailable" prop to not send it) */
    function convertToSendable (): Product {
        let productSendable: Product = {
            name: editableProduct.name,
            description: editableProduct.description,
            price: editableProduct.price,
            stock: editableProduct.stock,
            image: editableProduct.image
        }
        productSendable = parseInputs(productSendable)
        return productSendable;
    }

    function parseInputs (productSendable: Product): Product{
        if (typeof productSendable.price === "string") {
            productSendable.price = parseInt(productSendable.price);
        }
        if (typeof productSendable.stock === "string") {
            productSendable.stock = parseInt(productSendable.stock);
        }
        return productSendable;
    }

    function handleSaveClick() {
        console.log(typeof editableProduct.price)
        const sendableProduct: Product = convertToSendable();
        ProductModifyButtonHandler(sendableProduct, editableProduct.id)
        setEditing(false)
    }
    
    const editer = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        if (typeof fieldName === 'string') {
            const fieldValue = event.target.value;
            const newFormData = { ...editableProduct };
            newFormData[fieldName] = fieldValue;
            setEditableProduct(newFormData);
        }
        setEditing(true)
    }
    
    return (
        <div>
            <NavbarHandler/>
            <div className="card_modify_container">
                <button onClick={handleDeleteClick} className="delete_product_button"> DELETE </button>
                {product 
                ? 
                <Card 
                id={editableProduct.id} 
                name={editableProduct.name} 
                description={editableProduct.description} 
                price={editableProduct.price} 
                stock={editableProduct.stock} 
                image={editableProduct.image} 
                isAvailable={editableProduct.isAvailable} />
                : 
                <p>The product couldn't be found</p>}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th>IMAGE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td><input value={editableProduct.name} name="name" onChange={editer} className="input_modify_product" type="text" placeholder={product.name}></input></td>
                        <td><input value={editableProduct.description} name="description" onChange={editer} className="input_modify_product" type="text" placeholder={product.description}></input></td>
                        <td><input value={editableProduct.price} name="price" onChange={editer} className="input_modify_product" type="number" placeholder={`${product.price} $`}></input></td>
                        <td><input value={editableProduct.stock} name="stock" onChange={editer} className="input_modify_product" type="number" placeholder={`${product.stock} u.`}></input></td>
                        <td><input value={editableProduct.image} name="image" onChange={editer} className="input_modify_product" type="text" placeholder={product.image}></input></td>
                        <td>
                            {editing 
                            ? <button type="button" onClick={() => handleSaveClick()} className="save_product_button">SAVE</button> : <></>}
                            <button type="button" onClick={() => navigate(-1)} className="cancel_product_button">CANCEL</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}