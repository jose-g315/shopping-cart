import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../src/CartProvider.jsx';
import Cart from '../src/pages/cart/Cart';

function renderCart(initialCart = []) {
  return render(
    <CartProvider initialCart={initialCart}>
      <Cart />
    </CartProvider>
  );
}

const cartItems = [
  {
    product: { id: 1, title: 'Item 1', price: 10 },
    quantity: 2,
  },
  {
    product: { id: 2, title: 'Item 2', price: 20 },
    quantity: 1,
  },
  {
    product: { id: 3, title: 'Item 3', price: 30 },
    quantity: 3,
  },
];

function getCard(title) {
  return screen.getByText(title).closest('div');
}

describe('Cart', () => {
  it('renders the cart page', () => {
    renderCart();
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });
  it('renders that the cart is empty when there are no items', () => {
    renderCart();
    expect(
      screen.getByText('Cart Empty: Start Shopping!')
    ).toBeInTheDocument();
  });
  it('renders the cart items when there are items in the cart', () => {
    renderCart(cartItems);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });
  it('renders the total items and total amount correctly', () => {
    renderCart(cartItems);
    // totalItems: 2 + 1 + 3 = 6, totalAmount: 10*2 + 20*1 + 30*3 = 130
    expect(screen.getByText('Total Items:')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('$130.00')).toBeInTheDocument();
  });
  it('increments an item quantity and updates the total amount', async () => {
    renderCart(cartItems);
    const user = userEvent.setup();
    const item1 = getCard('Item 1');

    await user.click(within(item1).getByText('+'));

    expect(within(item1).getByTestId('quantity')).toHaveTextContent('3');
    // new total: 10*3 + 20*1 + 30*3 = 140
    expect(screen.getByText('$140.00')).toBeInTheDocument();
  });
  it('decrements an item quantity and updates the total amount', async () => {
    renderCart(cartItems);
    const user = userEvent.setup();
    const item1 = getCard('Item 1');

    await user.click(within(item1).getByText('-'));

    expect(within(item1).getByTestId('quantity')).toHaveTextContent('1');
    // new total: 10*1 + 20*1 + 30*3 = 120
    expect(screen.getByText('$120.00')).toBeInTheDocument();
  });
  it('removes an item from the cart and updates the totals', async () => {
    renderCart(cartItems);
    const user = userEvent.setup();
    const item2 = getCard('Item 2');

    await user.click(within(item2).getByText('Remove Item'));

    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    // remaining: Item 1 (10*2) + Item 3 (30*3) = 110
    expect(screen.getByText('$110.00')).toBeInTheDocument();
  });
  it('shows the empty cart message after removing the only item', async () => {
    renderCart([cartItems[0]]);
    const user = userEvent.setup();

    await user.click(screen.getByText('Remove Item'));

    expect(
      screen.getByText('Cart Empty: Start Shopping!')
    ).toBeInTheDocument();
  });
});
