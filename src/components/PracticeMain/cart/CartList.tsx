import { useEffect, useState } from "react";
import type { Product } from "../../../types/types";
import { useCart } from "../../../context/CartContext";

export const CartList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=8");
        if (!res.ok) {
          throw new Error("err" + res.status);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {products.map((product: Product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
          <p>$ {product.price}</p>
          <button onClick={() => dispatch({ type: "ADD", product: product })}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};
