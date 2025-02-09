import { createContext, useContext, useState } from "react";

export const CartContext = createContext([]);
console.log(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (productsList, id) => {
    const product = productsList.find((item) => item.id === id);

    setCart((prevItems) => [...prevItems, product]);
  };
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const { cart, setCart, addToCart } = useContext(CartContext);
  return { cart, setCart, addToCart };
}
