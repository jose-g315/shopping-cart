import App from './App';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Cart from './pages/Cart';
import ErrorPage from './pages/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
];

export default routes;
