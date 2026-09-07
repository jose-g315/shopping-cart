import { it, describe, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithCartContextProvider } from './test-utils';
import { screen } from '@testing-library/react';
import CartCard from '../src/components/CartCard/CartCard';

// Testing that the compnent renders correcctly and that
// the right functions are called when the buttons are clicked

const mockModifyQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();
function renderCartCard(props) {
  return renderWithCartContextProvider(<CartCard {...props} />, {
    modifyQuantity: mockModifyQuantity,
    removeFromCart: mockRemoveFromCart,
  });
}
describe('CartCard', () => {
  it('renders CartCard without crashing', () => {
    renderCartCard({
      id: 1,
      title: 'Test Product',
      url: 'https://example.com/image.jpg',
      price: 9.99,
      quantity: 2,
    });

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/image.jpg'
    );
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toHaveTextContent('2');
  });
  it('increments and decrements quantity correctly', async () => {
    const user = userEvent.setup();
    const baseProps = {
      id: 1,
      title: 'Test Product',
      url: 'https://example.com/image.jpg',
      price: 9.99,
    };

    // Increment calls modifyQuantity with quantity + 1
    let result = renderCartCard({ ...baseProps, quantity: 5 });
    await user.click(result.getByText('+'));
    expect(mockModifyQuantity).toHaveBeenLastCalledWith({ id: 1 }, 6);
    result.unmount();

    // Increment does not exceed 10
    mockModifyQuantity.mockClear();
    result = renderCartCard({ ...baseProps, quantity: 10 });
    await user.click(result.getByText('+'));
    expect(mockModifyQuantity).toHaveBeenCalledTimes(0);
    result.unmount();

    // Decrement calls modifyQuantity with quantity - 1
    mockModifyQuantity.mockClear();
    result = renderCartCard({ ...baseProps, quantity: 5 });
    await user.click(result.getByText('-'));
    expect(mockModifyQuantity).toHaveBeenLastCalledWith({ id: 1 }, 4);
    result.unmount();

    // Decrement does not go below 1
    mockModifyQuantity.mockClear();
    result = renderCartCard({ ...baseProps, quantity: 1 });
    await user.click(result.getByText('-'));
    expect(mockModifyQuantity).toHaveBeenCalledTimes(0);
  });
  it('calls removeFromCart when Remove Item button is clicked', async () => {
    const user = userEvent.setup();
    renderCartCard({
      id: 1,
      title: 'Test Product',
      url: 'https://example.com/image.jpg',
      price: 9.99,
      quantity: 2,
    });

    await user.click(screen.getByText('Remove Item'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });
});
