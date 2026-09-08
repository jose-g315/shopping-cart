import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import NavBar from '../src/components/NavBar/NavBar';
import Card from '../src/components/Card/Card';
import { CartProvider } from '../src/CartProvider';

// NavBar uses <Link>, which needs a router context to work, and now also
// reads from CartContext for the cart count badge, so it needs a CartProvider too.
function renderNavBar(initialCart = []) {
  return render(
    <MemoryRouter>
      <CartProvider initialCart={initialCart}>
        <NavBar />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('NavBar', () => {
  it('renders without crashing', () => {
    renderNavBar();
  });

  it('renders all three navigation links', () => {
    renderNavBar();

    // getByRole finds elements by their accessible role.
    // Links have the role "link", and "name" matches the visible text.
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop' })).toBeInTheDocument();
    // The Cart link's accessible name includes the item count (e.g. "Cart0"),
    // so match on a substring instead of the exact "Cart" text.
    expect(screen.getByRole('link', { name: /Cart/ })).toBeInTheDocument();
  });

  it('links point to the correct paths', () => {
    renderNavBar();

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute(
      'href',
      '/shop'
    );
    expect(screen.getByRole('link', { name: /Cart/ })).toHaveAttribute(
      'href',
      '/cart'
    );
  });

  it('renders inside a nav element', () => {
    renderNavBar();

    // getByRole('navigation') matches the <nav> tag.
    // This confirms the NavBar uses semantic HTML.
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows the total quantity of items in the cart badge', () => {
    renderNavBar([
      { product: { id: 1, title: 'Item 1', price: 10 }, quantity: 2 },
      { product: { id: 2, title: 'Item 2', price: 20 }, quantity: 3 },
    ]);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('5');
  });

  it('updates the cart badge when an item is added to the cart', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CartProvider>
          <NavBar />
          <Card
            id={1}
            title='Test Product'
            description='A product for testing.'
            price={9.99}
            url='https://example.com/image.jpg'
          />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');

    await user.click(screen.getByText('Add to Cart'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });
});
