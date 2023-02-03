import { Link } from "react-router-dom";
import Menu from "../../utils/interfaces/IMenu";

export default function Card({
  id,
  name,
  description,
  price,
  stock,
  image,
}: Menu) {
  return (
    <div className="product__container">
      <Link className="img__container" to={`/products/${id}`}>
        <img className="img__props" src={image} alt={name} />
      </Link>
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
