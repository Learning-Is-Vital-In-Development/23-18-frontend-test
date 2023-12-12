import { CartProvider } from './context/CartContext';
import BaseRoute from './route';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <BaseRoute />
          </QueryClientProvider>
        </CartProvider>
      </Router>
    </div>
  );
}
