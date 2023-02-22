// Sendable product to the backend
export interface SendableProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

// DBProduct has the properties of the DB
export interface DBProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  isAvailable: boolean;
}

/* An indexable interface has a index property whose name is a string and its value can be a string, number, or boolean (in this case). */
export interface ProductsPropsIndexable {
  [key: string]: string | number | boolean;
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  isAvailable: boolean;
}

/*Converts the object type to a sendable one to the backend (I have to get rid of the "ID" and "IsAvailable" prop to not send it) */
export function convertToSendable(product: DBProduct): SendableProduct {
  let productSendable: SendableProduct = {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: product.image,
  };
  return productSendable;
}

export function convertToIndexable(product: DBProduct): ProductsPropsIndexable {
  const productIndexable: ProductsPropsIndexable = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: product.image,
    isAvailable: product.isAvailable,
  };
  return productIndexable;
}
