import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { CartContext } from '../src/App';

export function renderWithCart(
  ui,
  {
    cart = [],
    setCart = vi.fn(),
    addToCart = vi.fn(),
    removeFromCart = vi.fn(),
  } = {}
) {
  return render(
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {ui}
    </CartContext.Provider>
  );
}
