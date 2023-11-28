import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, CartContextProps } from '../context/CartContext';
import BaseRoute from '../routes';

const queryClient = new QueryClient();

function renderWithRouter(initialEntries: string[], initialState?: CartContextProps['cartList']) {
  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <CartProvider initialState={initialState ?? []}>
          <MemoryRouter initialEntries={['/', ...initialEntries]}>
            <BaseRoute />
          </MemoryRouter>
        </CartProvider>
      </QueryClientProvider>,
    ),
  };
}

function wrapper({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export { renderWithRouter, wrapper };
