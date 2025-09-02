import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import { CartProvider, useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { vi, type Mock } from 'vitest';

// Mock do hook useCart para simular os itens no carrinho
vi.mock('../context/CartContext', () => ({
  ...vi.importActual('../context/CartContext'),
  useCart: vi.fn(),
}));

const mockProduct: Product = {
  id: 1,
  title: 'Mock Product',
  price: 10.5,
  description: 'A mock product for testing.',
  category: 'electronics',
  image: 'mock-image.jpg',
  rating: { rate: 4.5, count: 100 },
};

describe('Header', () => {
  it('should render the store name and cart icon', () => {
    // Mock para retornar um carrinho vazio
    (useCart as Mock).mockReturnValue({
      cartItems: [],
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Verifica se o título da loja está na tela
    expect(screen.getByText(/E-commerce Portfólio/i)).toBeInTheDocument();
  });

  it('should display the correct number of items in the cart', () => {
    // Mock para simular 2 itens no carrinho
    (useCart as Mock).mockReturnValue({
      cartItems: [
        { ...mockProduct, quantity: 1 },
        { ...mockProduct, quantity: 1 }
      ],
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Verifica se o número de itens é exibido
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
