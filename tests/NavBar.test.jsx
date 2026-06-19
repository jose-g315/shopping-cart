import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NavBar from '../src/components/NavBar/NavBar';

// NavBar uses <Link>, which needs a router context to work.
// MemoryRouter provides that context in tests without needing a real browser URL.
const renderNavBar = () => render(<NavBar />, { wrapper: MemoryRouter });

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
    expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument();
  });

  it('links point to the correct paths', () => {
    renderNavBar();

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute('href', '/shop');
    expect(screen.getByRole('link', { name: 'Cart' })).toHaveAttribute('href', '/cart');
  });

  it('renders inside a nav element', () => {
    renderNavBar();

    // getByRole('navigation') matches the <nav> tag.
    // This confirms the NavBar uses semantic HTML.
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});