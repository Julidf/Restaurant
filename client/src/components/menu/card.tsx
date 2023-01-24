import { Link } from "react-router-dom";

export interface Props {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export default function Card({
  id,
  name,
  description,
  price,
  stock,
  image,
}: Props) {
  return (
    <div className="product__container">
      <div className="img__container">
        <Link to={`/products/${id}`}>
          <img className="img__container" src={image} alt={name} />
        </Link>
      </div>
      <div className="product__info">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div>
        <p>{price}</p>
        <p>{stock}</p>
      </div>
    </div>
  );
}
