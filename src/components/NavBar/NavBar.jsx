import { Link } from 'react-router';
import styles from './NavBar.module.css';
import logo from '../../assets/Original.png';
export default function NavBar() {
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
        <li>
          <Link to='/cart'>Cart</Link>
        </li>
      </ul>
    </nav>
  );
}
