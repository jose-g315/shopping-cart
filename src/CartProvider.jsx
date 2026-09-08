import { createContext, useState } from 'react';
export const CartContext = createContext();

export function CartProvider({ children, initialCart = [] }) {
  const [cart, setCart] = useState(initialCart);

  function addToCart({ id, title, description, price, url }, finalQuantity) {
    setCart((prevCart) => {
      // if item exists then update its quantity
      const existingItem = prevCart.find((item) => item.product.id === id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + finalQuantity }
            : item
        );
      }
      // adding new entry if item doesnt exist
      return [
        ...prevCart,
        {
          product: { id, title, description, price, url },
          quantity: finalQuantity,
        },
      ];
    });
  }
  function modifyQuantity({ id }, newQuantity) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === id);
      if (!existingItem || existingItem.quantity === newQuantity) {
        return prevCart;
      }
      return prevCart.map((item) =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  }
  function removeFromCart(id) {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.product.id !== id);
    });
  }
  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, modifyQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
