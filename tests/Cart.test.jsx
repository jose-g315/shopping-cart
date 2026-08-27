import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithCart } from './test-utils';
import Cart from '../src/pages/cart/Cart';

const mockSetCart = vi.fn();

function renderCart(cart = []) {
  return renderWithCart(<Cart />, { cart, setCart: mockSetCart });
}

describe('Cart', () => {
  it('renders the cart page', () => {
    renderCart();
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });
  it('renders that the cart is empty when there are no items', () => {
    renderCart();
    expect(screen.getByText('Cart Empty: Start Shopping!')).toBeInTheDocument();
  });
  it('renders the cart items when there are items in the cart', () => {
    const cartItems = [
      {
        product: { id: 1, title: 'Item 1', price: 10 },
        quantity: 2,
      },
      {
        product: { id: 2, title: 'Item 2', price: 20 },
        quantity: 1,
      },
    ];
    renderCart(cartItems);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
