import { Link } from "react-router-dom";

interface Props {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export default function Card({ id, name, description, price, stock, image }:Props) {
  return (
    <div className="container">
      <div className="imgContainer">
        <Link to={`/products/${id}`}>
          <img className="imgContainer" src={image} alt={name} />
        </Link>
      </div>
      <div className="productInfo">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div>
        <p>{price}</p>
        <p>{stock}</p>
      </div>
    </div>
  );
}
