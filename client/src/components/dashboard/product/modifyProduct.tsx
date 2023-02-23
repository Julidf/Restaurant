import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../menu/card";
import { ProductsPropsIndexable, DBProduct, convertToSendable, convertToIndexable, SendableProduct} from "../../../utils/interfaces/productInterfaces";
import { ProductModifyButtonHandler, tryDeleteProduct, tryRestoreProduct } from "../../../utils/helpers";
import { Fragment, useState } from "react";
import NavbarHandler from "../../navbar/navbarHandler";
import '../stylesAdmin.css';

export default function ProductModify () {
    const location = useLocation();
    const navigate = useNavigate();
    let product: DBProduct = location.state?.product;
    const [editableProduct, setEditableProduct] = useState<ProductsPropsIndexable>(convertToIndexable(product));
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isAvailable, setIsAvailable] = useState<boolean>(product.isAvailable);

    async function handleDeleteClick() {
        const response = await tryDeleteProduct(editableProduct.id, editableProduct.name)
        if (response) {
            setIsAvailable(false)
        }
    }

    async function handleRestoreClick() {
        const value = {isAvailable: true}
        const response = await tryRestoreProduct(editableProduct.id, value, editableProduct.name)
        if (response) {
            setIsAvailable(true)
        }
    }
    
    function handleSaveClick () {
        let sendableProduct: SendableProduct = convertToSendable(editableProduct);
        sendableProduct = parseInputs(sendableProduct)
        ProductModifyButtonHandler(sendableProduct, editableProduct.id)
        setIsEditing(false)
    }
    
    function parseInputs (productSendable: SendableProduct): SendableProduct{
        if (typeof productSendable.price === "string") {
            productSendable.price = parseInt(productSendable.price);
        }
        if (typeof productSendable.stock === "string") {
            productSendable.stock = parseInt(productSendable.stock);
        }
        return productSendable;
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
        setIsEditing(true)
    }
    
    return (
        <Fragment>
            <NavbarHandler/>
            <div className="head_modifying">
                <div className="button_container_modifying">
                    {isAvailable
                     ? <button onClick={handleDeleteClick} className="button_delete_modifying"> DELETE </button>
                     : <button onClick={handleRestoreClick} className="button_delete_modifying"> RESTORE </button>}
                </div>
                <div className="modify_card_container">
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
                
            </div>
            <table className="table_admin">
                <thead>
                    <tr>
                        <th className="th_admin" data-content="ID">ID</th>
                        <th className="th_admin" data-content="ID">NAME</th>
                        <th className="th_admin" data-content="ID">DESCRIPTION</th>
                        <th className="th_admin" data-content="ID">PRICE</th>
                        <th className="th_admin" data-content="ID">STOCK</th>
                        <th className="th_admin" data-content="ID">IMAGE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={product.id}>
                        <td className="td_admin">{product.id}</td>
                        <td className="td_admin"><input value={editableProduct.name} name="name" onChange={editer} className="input_modifying" type="text" placeholder={product.name}></input></td>
                        <td className="td_admin"><input value={editableProduct.description} name="description" onChange={editer} className="input_modifying" type="text" placeholder={product.description}></input></td>
                        <td className="td_admin"><input value={editableProduct.price} name="price" onChange={editer} className="input_modifying" type="number" placeholder={`${product.price} $`}></input></td>
                        <td className="td_admin"><input value={editableProduct.stock} name="stock" onChange={editer} className="input_modifying" type="number" placeholder={`${product.stock} u.`}></input></td>
                        <td className="td_admin"><input value={editableProduct.image} name="image" onChange={editer} className="input_modifying" type="text" placeholder={product.image}></input></td>
                        <td className="td_admin_button">
                            {isEditing 
                            ? <button type="button" onClick={() => handleSaveClick()} className="button_save_modifying">SAVE</button> : <></>}
                            <button type="button" onClick={() => navigate(-1)} className="button_cancel_modifying">CANCEL</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )
}