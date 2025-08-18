import { useCartMin } from "../../../context/CartContextMin";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const items: CartItem[] = [
  {
    id: 1,
    name: "Apple",
    price: 200,
    quantity: 3,
  },
  {
    id: 2,
    name: "Banana",
    price: 50,
    quantity: 6,
  },
  { id: 3, name: "Pear", price: 140, quantity: 8 },
];

export default function Cart() {
  const { cart, dispatch } = useCartMin();

  return (
    <div>
      <h3>Cart</h3>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => dispatch({ type: "ADD", item: item })}
        >
          Add {item.name}
        </button>
      ))}

      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name}&nbsp;
            <button
              onClick={() => dispatch({ type: "REMOVE", index: item.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
