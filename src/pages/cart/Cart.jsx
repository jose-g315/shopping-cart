import { CartContext } from '../../App';
import CartCard from '../../components/CartCard/CartCard';
import { useContext } from 'react';

export default function Cart() {
  const cartState = useContext(CartContext);
  const cart = cartState.cart;

  return (
    <div>
      <h1>Your Cart</h1>
      <div className='cart'>
        {cart.length === 0 ? (
          <p>Cart Empty: Start Shopping!</p>
        ) : (
          cart?.map((item) => (
            <CartCard
              key={item.product.id}
              id={item.product.id}
              title={item.product.title}
              price={item.product.price}
              quantity={item.quantity}
            />
          ))
        )}
      </div>
    </div>
  );
}
