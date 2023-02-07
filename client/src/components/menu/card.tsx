import { Link } from "react-router-dom";
import { productsProps } from "../../utils/interfaces/iProductProps";

export default function Card( product: productsProps ) {
  return (
    <div className="product__container">      
        <Link className="img__container" to={`/products/${product.id}`}>
          <img className="img__props" src={product.image} alt={product.name} />
        </Link>
      <div className="product__info">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
      </div>
      <div>
        <p>{product.price}</p>
        <p>{product.stock}</p>
      </div>
    </div>
  );
}