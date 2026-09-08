import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { CartContext } from '../src/CartProvider.jsx';

export function renderWithCartContextProvider(
  component,
  {
    cart = [],
    setCart = vi.fn(),
    addToCart = vi.fn(),
    modifyQuantity = vi.fn(),
    removeFromCart = vi.fn(),
  } = {}
) {
  return render(
    <CartContext.Provider
      value={{ cart, setCart, addToCart, modifyQuantity, removeFromCart }}
    >
      {component}
    </CartContext.Provider>
  );
}
