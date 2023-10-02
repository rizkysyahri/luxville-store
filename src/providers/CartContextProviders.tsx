import useLocalStorage from "@/hooks/useLocalStorage";
import { CartItem } from "@/types/types";
import { cartSchema } from "@/validation/cartItemSchema";
import * as React from "react";

interface CartContextValue {
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
}

export const CartContext = React.createContext<CartContextValue>({
  cartItems: [],
  setCartItems: () => {},
});

export const useCartContext = () => React.useContext(CartContext);

const CartContextProviders = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("carts", []);

  const parsedCartItems = (cartItems: CartItem[]) => {
    try {
      return cartSchema.parse(cartItems);
    } catch (_) {
      setCartItems([]);
      return [];
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems: parsedCartItems(cartItems), setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
