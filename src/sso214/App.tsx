import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import BaseRoute from './routes';
import { CartProvider } from './context/CartContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <BaseRoute />
          </CartProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
