import { CartContext } from '../../CartProvider.jsx';
import CartCard from '../../components/CartCard/CartCard';
import { useContext } from 'react';
import styles from './Cart.module.css';

export default function Cart() {
  const cartState = useContext(CartContext);
  const cart = cartState.cart;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className={styles.cart}>
      <h1>Your Cart</h1>
      <div className={styles.cartCardContainer}>
        {cart.length === 0 ? (
          <p>Cart Empty: Start Shopping!</p>
        ) : (
          cart?.map((item) => {
            return (
              <CartCard
                key={item.product.id}
                id={item.product.id}
                title={item.product.title}
                url={item.product.url}
                price={item.product.price}
                quantity={item.quantity}
              />
            );
          })
        )}
      </div>
      <div>
        {cart.length !== 0 ? (
          <div class={styles.orderDetails}>
            <hr />
            <h2>Order Details</h2>
            <p>
              Total Items:<span>{totalItems}</span>
            </p>
            <p>
              Total Amount:<span>${totalAmount.toFixed(2)}</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
