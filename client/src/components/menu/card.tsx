import { Link } from "react-router-dom";
import { ProductsProps } from "../../utils/interfaces/productInterfaces";
import './styles.css';

export default function Card(product: ProductsProps) {
  return (
    <div className="product__container">

      <div className="img__container">
        <Link to={`/products/${product.id}`}>
          <img className="img__props" src={product.image} alt={product.name} />
        </Link>
      </div> 
      
      <div className="product__info__container">
        <div className="product__info__1">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <div className="product__info__2">
          <p>{`${product.price} $`}</p>
          {/* <p>{product.stock}</p> */}
        </div>

      </div>
      
    </div>
  );
}
