import React, {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
} from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; index: number };

type CartState = CartItem[];

type CartContextType = {
  cart: CartState;
  dispatch: Dispatch<CartAction>;
};

const CartContextMin = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      return [...state, action.item];
    case "REMOVE":
      return state.filter((_, i) => i !== action.index);
    default:
      return state;
  }
}

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContextMin.Provider value={{ cart, dispatch }}>
      {children}
    </CartContextMin.Provider>
  );
}

export function useCartMin(): CartContextType {
  const context = useContext(CartContextMin);
  if (!context) {
    throw new Error("usecart must be within cartprovider context");
  }
  return context;
}
