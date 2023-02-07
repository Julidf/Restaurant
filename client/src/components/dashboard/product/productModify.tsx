import { Link, useLocation } from "react-router-dom";
import Card from "../../menu/card";
import { productsProps } from "../../../utils/interfaces/iProductProps";
import Product from "../../../utils/interfaces/iCreateProduct";
import { ErrorMessage, Field, Form, Formik } from "formik";
import validation from "../../../utils/validations/productValidation";
import { ProductModifyButtonHandler } from "../../../utils/helpers";
import { useState } from "react";


export default function ProductModify () {
    const location = useLocation();
    const product: productsProps = location.state?.product;
    //const [state, setState] = useState(product); 


    const initalValues: Product = {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
    };

    return (
        <div>
            <div>
                {product 
                ? 
                <Card 
                id={product.id} 
                name={product.name} 
                description={product.description} 
                price={product.price} 
                stock={product.stock} 
                image={product.image} 
                isAvailable={product.isAvailable} />
                : 
                <p>The product couldn't be found</p>}
            </div> 
            <div>
                <Formik
                    initialValues={initalValues}
                    onSubmit={(values) => ProductModifyButtonHandler(values, product.id)}
                    validationSchema={validation}
                >
                {({ handleSubmit, values, handleChange, validateOnChange }) => (
                <div className="form__container">
                    <h3>Modify the product</h3>
                    <Form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="name" className="form__label">
                            Name:
                            <Field
                                type="text"
                                name="name"
                                placeholder="Insert name"
                                autoComplete="off"
                                className="form__input"
                                value={values.name}
                                onChange={handleChange}
                                validate={validateOnChange} 
                            />
                            <ErrorMessage
                                name="name"
                                component="span"
                                className="form__error"
                            />
                        </label>
                        
                        <label htmlFor="price" className="form__label">
                            Price:
                            <Field
                                type="number"
                                name="price"
                                step="0.10"
                                placeholder="Insert price"
                                autoComplete="off"
                                className="form__input"
                                value={values.price}
                                onChange={handleChange}
                                validate={validateOnChange} 
                            />
                            <ErrorMessage
                                name="price"
                                component="span"
                                className="form__error"
                            />
                        </label>

                        <button type="submit" className="btn">
                            Modify
                        </button>

                        <Link to={"/admin/products"} className="btn">
                            Cancel
                        </Link>
                    </Form>
                </div>)}
                </Formik>
            </div>
        </div>
        
    );

}
