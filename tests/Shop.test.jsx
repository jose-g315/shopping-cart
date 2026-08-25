import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import Shop from '../src/pages/shop/Shop';

vi.mock('../src/util/useProductUrl');
import useProductUrl from '../src/util/useProductUrl';

const fakeProducts = [
  { id: 1, title: 'Test Shirt', description: 'A shirt', price: 9.99, image: 'shirt.jpg' },
  { id: 2, title: 'Test Pants', description: 'Some pants', price: 19.99, image: 'pants.jpg' },
];

describe('Shop', () => {
  it('shows a loading message while fetching', () => {
    useProductUrl.mockReturnValue({ products: null, error: null, loading: true });
    render(<Shop />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows an error message when the fetch fails', () => {
    useProductUrl.mockReturnValue({ products: null, error: new Error('server error'), loading: false });
    render(<Shop />);
    expect(screen.getByText('Error: server error')).toBeInTheDocument();
  });

  it('renders a card for each product', () => {
    useProductUrl.mockReturnValue({ products: fakeProducts, error: null, loading: false });
    render(<Shop />);
    expect(screen.getByText('Test Shirt')).toBeInTheDocument();
    expect(screen.getByText('Test Pants')).toBeInTheDocument();
  });
});