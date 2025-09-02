import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';

// Mock do hook useCart para isolar o teste
// Usamos vi.mock para garantir que o mock seja criado antes dos testes
vi.mock('../context/CartContext', () => ({
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

describe('ProductCard', () => {
  const mockAddToCart = vi.fn();

  beforeEach(() => {
    // Configura o mock do useCart para retornar a nossa função mockada
    (useCart as unknown as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  afterEach(() => {
    // Limpa os mocks após cada teste
    vi.clearAllMocks();
  });

  it('should render product information correctly', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    // Verifica se o título e o preço estão na tela
    expect(screen.getByText(/Mock Product/i)).toBeInTheDocument();
    // A regex corrigida para buscar o texto do preço
    expect(screen.getByText(/10\.50/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Mock Product' })).toBeInTheDocument();
  });

  it('should call addToCart when the button is clicked', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    // Encontra o botão "Adicionar ao Carrinho" pelo texto
    const addButton = screen.getByRole('button', { name: /Adicionar ao Carrinho/i });
    
    // Simula um clique no botão
    fireEvent.click(addButton);

    // Verifica se a função mockada foi chamada com o produto correto
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
