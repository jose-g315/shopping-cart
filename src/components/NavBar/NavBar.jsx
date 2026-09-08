import { Link } from 'react-router';
import styles from './NavBar.module.css';
import logo from '../../assets/Original.png';
import { CartContext } from '../../CartProvider.jsx';
import { useContext } from 'react';

export default function NavBar() {
  const cartState = useContext(CartContext);
  const cart = cartState.cart;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className={styles.nav}>
      <img src={logo} alt='Logo' className={styles.logo} />
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/shop'>Shop</Link>
        </li>
        <li className={styles.cartLink}>
          <Link to='/cart'>
            Cart
            <span className={styles.cartCount} data-testid='cart-count'>
              {totalItems}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
