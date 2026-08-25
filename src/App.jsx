import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Outlet } from 'react-router';
import { useState, createContext } from 'react';

export const CartContext = createContext();
function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <NavBar />
      <Outlet />
    </CartContext.Provider>
  );
}

export default App;
