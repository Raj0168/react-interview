import { CartProvider } from "../../../context/CartContext";
import { CartHeader } from "./CartHeader";
import { CartList } from "./CartList";

export default function CartMain() {
  return (
    <CartProvider>
      <CartHeader />
      <CartList />
    </CartProvider>
  );
}
