import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../src/components/Card/Card';

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card title="Test Product" description="This is a test product." price={9.99} url="https://example.com/image.jpg" />);
  });

  it('displays the correct title, description, price, and image', () => {
    const testTitle = "Test Product";
    const testDescription = "This is a test product.";
    const testPrice = 9.99;
    const testUrl = "https://example.com/image.jpg";

    render(<Card title={testTitle} description={testDescription} price={testPrice} url={testUrl} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testDescription)).toBeInTheDocument();
    expect(screen.getByText(`$${testPrice}`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', testUrl);
    expect(screen.getByRole('img')).toHaveAttribute('alt', testTitle);
  });
  
  it('increments and decrements quantity correctly', async () => {
    render(<Card title="Test Product" description="This is a test product." price={9.99} url="https://example.com/image.jpg" />);
    
    const user = userEvent.setup();
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');
    const quantityInput = screen.getByRole('spinbutton');

    // Initial quantity should be 1
    expect(quantityInput.value).toBe('1');

    // Increment quantity
    await user.click(incrementButton);
    expect(quantityInput.value).toBe('2');
    // Increment does not exceed 10
    for (let i = 0; i < 10; i++) {
      await user.click(incrementButton);
    }
    expect(quantityInput.value).toBe('10');

    
    // Decrement quantity
    await user.click(decrementButton);
    expect(quantityInput.value).toBe('9');

    // Decrement below 1 should not change the value
      for (let i = 0; i < 10; i++) {
      await user.click(decrementButton);
    }
    expect(quantityInput.value).toBe('1');
  });
  it('handles manual input correctly', async () => {
    render(<Card title="Test Product" description="This is a test product." price={9.99} url="https://example.com/image.jpg" />);
    
    const user = userEvent.setup();
    const quantityInput = screen.getByRole('spinbutton');

    // Valid input
    await user.clear(quantityInput);
    await user.type(quantityInput, '5');
    expect(quantityInput.value).toBe('5');

    // Invalid input (greater than 10)
    await user.clear(quantityInput);
    await user.type(quantityInput, '15');
    expect(quantityInput.value).toBe('10'); // Should be 10 since it is the highest limit  

    // Invalid input (less than 1)
    await user.clear(quantityInput);
    await user.type(quantityInput, '0');
    expect(quantityInput.value).toBe('1'); // Should be 1 since the quantity cannot be less than 1

    // Empty input should reset to 1 on blur
    await user.clear(quantityInput);
    expect(quantityInput.value).toBe(''); // Should be empty
    await user.tab(); // Move focus away to trigger blur
    expect(quantityInput.value).toBe('1'); // Should reset to 1

    
  });
  it('handles manual and incremenent/decrement input correctly', async () => {
    render(<Card title="Test Product" description="This is a test product." price={9.99} url="https://example.com/image.jpg" />);
    
    const user = userEvent.setup();
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');
    const quantityInput = screen.getByRole('spinbutton');

    // Set quantity to 5 manually
    await user.clear(quantityInput);
    await user.type(quantityInput, '5');
    expect(quantityInput.value).toBe('5');

    // Increment should now set it to 6
    await user.click(incrementButton);
    expect(quantityInput.value).toBe('6');

    // Decrement should now set it to 5
    await user.click(decrementButton);
    expect(quantityInput.value).toBe('5');

    // Set quantity to 10 manually
    await user.clear(quantityInput);
    await user.type(quantityInput, '10');
    expect(quantityInput.value).toBe('10');

    // Increment should not change it since it's already at max
    await user.click(incrementButton);
    expect(quantityInput.value).toBe('10');

    // Decrement should now set it to 9
    await user.click(decrementButton);
    expect(quantityInput.value).toBe('9');
  });
  it('handles submit correctly', async ()=> {
    render(<Card title="Test Product" description="This is a test product." price={9.99} url="https://example.com/image.jpg" />);
    
    const user = userEvent.setup();
    const quantityInput = screen.getByRole('spinbutton');
    const addToCartButton = screen.getByText('Add to Cart');
 
    // Empty input should reset to 1 on submit
    await user.clear(quantityInput);
    expect(quantityInput.value).toBe(''); // Should be empty
    await user.click(addToCartButton);
    expect(quantityInput.value).toBe('1'); // Should reset to 1;

    // Input should reset to 1 after adding any number of item into cart
    await user.clear(quantityInput);
    await user.type(quantityInput, '5');
    await user.click(addToCartButton);
    expect(quantityInput.value).toBe('1');
  })
});