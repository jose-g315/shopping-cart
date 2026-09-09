import { useState, useContext } from 'react';
import { CartContext } from '../../CartProvider.jsx';
import styles from './Card.module.css';

export default function Card({ id, title, description, price, url }) {
  const cartState = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

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
  function showToast() {
    const toast = document.querySelector(`.${styles.toast}`);
    toast.classList.add(styles.show);
    setTimeout(() => {
      toast.classList.remove(styles.show);
    }, 2000);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const finalQuantity = quantity === '' ? 1 : quantity;
    cartState.addToCart({ id, title, description, price, url }, finalQuantity);
    console.log(`Added ${finalQuantity} of ${title} (${id}) to cart.`);
    setQuantity(1);
    showToast();
  }

  return (
    <div className={styles.card}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>
        <p className={styles.priceP}>${price}</p>
        <img src={url} alt={title} />
      </div>
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
      <div className={styles.toast}>Item added to cart!</div>
    </div>
  );
}
