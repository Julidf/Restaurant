import { DBProduct } from "../../utils/interfaces/productInterfaces";
import './stylesMenu.css';

export default function Card(product: DBProduct) {

  const cards: NodeListOf<Element>  = document.querySelectorAll('.card_container');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(card => card.classList.remove('expanded'));
      card.classList.add('expanded');
    });
  });

  return (
    <div className="card_container">
      <div className="img_container">
          <img
            className="img_props"
            src={product.image}
            alt={product.name}
          />
      </div> 

      <div className="product_info_container">
        <div className="product_info_1">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <div className="product_info_2">
          <p>{`$ ${product.price}`}</p>
          {/* <p>{product.stock}</p> */}
        </div>


      </div>
    </div>
  );
}
