import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { CartContext, CartProvider } from '../context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import BaseRoute from '../route';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export const renderWithRouter = (initialEntries = ['/'], cartProvider?: CartContext) => {
  return {
    user: userEvent.setup(),
    ...render(
      <CartProvider initialState={cartProvider}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={initialEntries}>
            <BaseRoute />
          </MemoryRouter>
        </QueryClientProvider>
        ,
      </CartProvider>,
    ),
  };
};

export const noop = () => console.log('noop');

export const queryWrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
