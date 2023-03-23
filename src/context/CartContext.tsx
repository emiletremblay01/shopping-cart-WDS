import { ReactNode, createContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
type CartProviderProps = {
  children: ReactNode;
};
type CartItem = {
  id: number;
  quantity: number;
};
type CartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  incrementItemQuantity: (id: number) => void;
  decrementItemQuantity: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  getTotalItemsInCart: number;
  cartItems: CartItem[];
};
export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const getTotalItemsInCart = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function openCart(): void {
    setIsOpen((currentState) => {
      return (currentState = true);
    });
  }
  function closeCart(): void {
    setIsOpen((currentState) => {
      return (currentState = false);
    });
  }
  function getItemQuantity(id: number): number {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function incrementItemQuantity(id: number): void {
    setCartItems((currentCart) => {
      if (currentCart.find((item) => item.id === id) == undefined)
        return [...currentCart, { id, quantity: 1 }];
      else
        return currentCart.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + 1 };
          else return item;
        });
    });
  }

  function decrementItemQuantity(id: number): void {
    setCartItems((currentCart) => {
      if (currentCart.find((item) => item.id === id)?.quantity === 1)
        return currentCart.filter((item) => item.id !== id);
      else
        return currentCart.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          else return item;
        });
    });
  }

  function removeItemFromCart(id: number): void {
    setCartItems((currentCart) => {
      return currentCart.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        incrementItemQuantity,
        decrementItemQuantity,
        removeItemFromCart,
        getTotalItemsInCart,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      <ShoppingCart isOpen={isOpen} />
      {children}
    </CartContext.Provider>
  );
}
