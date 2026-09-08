import { useContext } from 'react';
import { CartContext } from '../../CartProvider';

export default function CartCard({ id, title, price, url, quantity }) {
  const cartState = useContext(CartContext);

  function increment() {
    const modifiedQuantity = quantity < 10 ? quantity + 1 : 10;
    if (modifiedQuantity === 10 && quantity === 10) {
      console.log('increment called but quantity is already 10');
      return;
    }
    cartState.modifyQuantity({ id }, modifiedQuantity);
    console.log('increment called', modifiedQuantity);
  }

  function decrement() {
    const modifiedQuantity = quantity > 1 ? quantity - 1 : 1;
    if (modifiedQuantity === 1 && quantity === 1) {
      console.log('decrement called but quantity is already 1');
      return;
    }
    cartState.modifyQuantity({ id }, modifiedQuantity);
    console.log('decrement called', modifiedQuantity);
  }
  function remove() {
    cartState.removeFromCart(id);
  }
  return (
    <div>
      <p>{id}</p>
      <p>{title}</p>
      <img src={url} alt={title} />
      <p>${price.toFixed(2)}</p>
      <button type='button' onClick={decrement}>
        -
      </button>
      <p>
        Quantity: <span data-testid='quantity'>{quantity}</span>
      </p>
      <button type='button' onClick={increment}>
        +
      </button>
      <p>Total Price: ${(price * quantity).toFixed(2)}</p>
      <button type='button' onClick={remove}>
        Remove Item
      </button>
    </div>
  );
}
