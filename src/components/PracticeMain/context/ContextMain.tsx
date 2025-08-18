import { AuthProvider } from "../../../context/AuthContext";
import { CartProvider } from "../../../context/CartContextMin";
import { ThemeProvider } from "../../../context/ThemeContext";
import Cart from "./Cart";
import LoginButton from "./LoginButton";
import ThemedButton from "./ThemedButton";

export default function ContextMain() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <LoginButton username="Hello" />
          <ThemedButton />
          <Cart />
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}
