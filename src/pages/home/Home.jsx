import { Link } from 'react-router';
import logo from '../../assets/Original.png';
import styles from './Home.module.css';
export default function Home() {
  return (
    <div className={styles.home}>
      <img src={logo} alt='Home' className={styles.logo} />
      <h1>
        Welcome to <span className={styles.headerSpan}>OAK</span>
      </h1>
      <p>Discover our exclusive collection of products. Shop now and enjoy great deals!</p>
      <Link className={styles.shopButton} to='/shop'>
        Shop Now
      </Link>
    </div>
  );
}
