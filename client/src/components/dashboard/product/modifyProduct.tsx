import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../menu/card";
import {
  ProductsPropsIndexable,
  DBProduct,
  convertToSendable,
  convertToIndexable,
  SendableProduct,
} from "../../../utils/interfaces/productInterfaces";
import {
  ProductModifyButtonHandler,
  tryDeleteProduct,
  tryRestoreProduct,
} from "../../../utils/helpers";
import { Fragment, useState } from "react";
import NavbarHandler from "../../navbar/navbarHandler";
import "./styles.css";

export default function ProductModify() {
  const location = useLocation();
  const navigate = useNavigate();
  let product: DBProduct = location.state?.product;
  const [editableProduct, setEditableProduct] =
    useState<ProductsPropsIndexable>(convertToIndexable(product));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(product.isAvailable);

  async function handleDeleteClick() {
    await tryDeleteProduct(editableProduct.id, editableProduct.name);
    setIsAvailable(false);
  }

  async function handleRestoreClick() {
    const value = { isAvailable: true };
    await tryRestoreProduct(editableProduct.id, value, editableProduct.name);
    setIsAvailable(true);
  }

  function handleSaveClick() {
    let sendableProduct: SendableProduct = convertToSendable(editableProduct);
    sendableProduct = parseInputs(sendableProduct);
    ProductModifyButtonHandler(sendableProduct, editableProduct.id);
    setIsEditing(false);
  }

  function parseInputs(productSendable: SendableProduct): SendableProduct {
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
    if (typeof fieldName === "string") {
      const fieldValue = event.target.value;
      const newFormData = { ...editableProduct };
      newFormData[fieldName] = fieldValue;
      setEditableProduct(newFormData);
    }
    setIsEditing(true);
  };

  return (
    <Fragment>
      <NavbarHandler />
      <div className="top_modify_product">
        <div className="modify_button_container">
          {isAvailable ? (
            <button
              onClick={handleDeleteClick}
              className="delete_product_button"
            >
              {" "}
              DELETE{" "}
            </button>
          ) : (
            <button
              onClick={handleRestoreClick}
              className="delete_product_button"
            >
              {" "}
              RESTORE{" "}
            </button>
          )}
        </div>
        <div className="modify_card_container">
          {product ? (
            <Card
              id={editableProduct.id}
              name={editableProduct.name}
              description={editableProduct.description}
              price={editableProduct.price}
              stock={editableProduct.stock}
              image={editableProduct.image}
              isAvailable={editableProduct.isAvailable}
            />
          ) : (
            <p>The product couldn't be found</p>
          )}
        </div>
      </div>
      <table className="table_product">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th>IMAGE</th>
          </tr>
        </thead>
        <tbody>
          <tr key={product.id}>
            <td className="td_product">{product.id}</td>
            <td className="td_product">
              <input
                value={editableProduct.name}
                name="name"
                onChange={editer}
                className="input_modify_product"
                type="text"
                placeholder={product.name}
              ></input>
            </td>
            <td className="td_product">
              <input
                value={editableProduct.description}
                name="description"
                onChange={editer}
                className="input_modify_product"
                type="text"
                placeholder={product.description}
              ></input>
            </td>
            <td className="td_product">
              <input
                value={editableProduct.price}
                name="price"
                onChange={editer}
                className="input_modify_product"
                type="number"
                placeholder={`${product.price} $`}
              ></input>
            </td>
            <td className="td_product">
              <input
                value={editableProduct.stock}
                name="stock"
                onChange={editer}
                className="input_modify_product"
                type="number"
                placeholder={`${product.stock} u.`}
              ></input>
            </td>
            <td className="td_product">
              <input
                value={editableProduct.image}
                name="image"
                onChange={editer}
                className="input_modify_product"
                type="text"
                placeholder={product.image}
              ></input>
            </td>
            <td className="td_product_button">
              {isEditing ? (
                <button
                  type="button"
                  onClick={() => handleSaveClick()}
                  className="save_product_button"
                >
                  SAVE
                </button>
              ) : (
                <></>
              )}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="cancel_product_button"
              >
                CANCEL
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}
