import { useCart } from "../../../context/CartContext";

export const CartHeader: React.FC = () => {
  const { state } = useCart();
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header>
      <h3>My Store</h3>
      <div>
        <span>Cart</span>
        <span>{count}</span>
      </div>
    </header>
  );
};
