import { useState, useContext } from 'react';
import { CartContext } from '../../App';
import styles from './Card.module.css';

export default function Card({ id, title, description, price, url }) {
  const cartState = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  function addToCart({ id, title, description, price, url }, finalQuantity) {
    cartState.setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === id);
      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        return prevCart.map((item) =>
          item.product.id === id ? { ...item, quantity: item.quantity + finalQuantity } : item
        );
      }
      // If the item doesn't exist in the cart, add it as a new entry
      return [
        ...prevCart,
        { product: { id, title, description, price, url }, quantity: finalQuantity },
      ];
    });
  }

  function increment() {
    setQuantity((prev) => (prev < 10 ? prev + 1 : 10));
  }

  function decrement() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }
  function handleChange(e) {
    const value = parseInt(e.target.value, 10);
    if (!Number.isNaN(value) && value > 0 && value <= 10) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity('');
    } else if (value < 1) {
      setQuantity(1);
    } else if (value > 10) {
      setQuantity(10);
    }
  }
  function handleBlur() {
    if (quantity === '') {
      setQuantity(1);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const finalQuantity = quantity === '' ? 1 : quantity;
    addToCart({ id, title, description, price, url }, finalQuantity);
    console.log(`Added ${finalQuantity} of ${title} (${id}) to cart.`);
    setQuantity(1);
  }

  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${price}</p>
      <img src={url} alt={title} />
      <form action='' onSubmit={handleSubmit}>
        <button
          type='button'
          onClick={() => {
            decrement();
          }}
        >
          -
        </button>
        <input
          type='number'
          min='1'
          max='10'
          value={quantity}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <button
          type='button'
          onClick={() => {
            increment();
          }}
        >
          +
        </button>
        <br />
        <button type='submit'>Add to Cart</button>
      </form>
    </div>
  );
}
