import { Link } from "react-router-dom";
import { DBProduct } from "../../utils/interfaces/productInterfaces";
import './styles.css';

export default function Card(product: DBProduct) {

  return (
    <div className="card_container">
      <div className="img_container">
        <Link to={`/products/${product.id}`}>
            <img
              className="img_props"
              src={product.image}
              alt={product.name}
            />
        </Link>
      </div> 
      
      <div className="product_info_container">
        <div className="product_info_1">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <div className="product_info_2">
          <p>{`$${product.price}`}</p>
          {/* <p>{product.stock}</p> */}
        </div>

      </div>
    </div>
  );
}
