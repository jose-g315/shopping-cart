import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Outlet } from 'react-router';
import { CartProvider } from './CartProvider';

function App() {
  return (
    <div className='app'>
      <CartProvider>
        <NavBar />
        <Outlet />
      </CartProvider>
    </div>
  );
}

export default App;
