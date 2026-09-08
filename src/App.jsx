import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Outlet } from 'react-router';
import { CartProvider } from './CartProvider';

function App() {
  return (
    <CartProvider>
      <NavBar />
      <Outlet />
    </CartProvider>
  );
}

export default App;
