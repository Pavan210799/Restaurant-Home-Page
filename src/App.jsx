import HomePage from './pages/HomePage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
}

export default App;
