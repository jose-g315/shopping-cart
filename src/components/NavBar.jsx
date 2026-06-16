import { Link } from 'react-router';
export default function NavBar() {
  return (
    <nav>
      <h1>NavBar</h1>
      Link to <Link to='/'>Home</Link>
      Link to <Link to='/shop'>Shop</Link>
      Link to <Link to='/cart'>Cart</Link>
    </nav>
  );
}
