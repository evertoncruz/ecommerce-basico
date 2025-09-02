import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing/react';
import { gql } from '@apollo/client';
import ProductDetailPage from '../pages/ProductDetailPage';
import { CartProvider, useCart } from '../context/CartContext';
import { vi, type Mock } from 'vitest';
import type { Product } from '../data/products';

// Mock do useParams para simular a URL com um ID
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({
      id: '1',
    }),
  };
});

// Mock do useCart para simular a lógica do carrinho
vi.mock('../context/CartContext', async () => {
  const actual = await vi.importActual('../context/CartContext');
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

// Mock da query GraphQL
const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      id
      title
      price
      description
      image
      rating {
        rate
        count
      }
    }
  }
`;

const mockProduct: Omit<Product, 'category'> = {
  id: 1,
  title: 'Mock Product',
  price: 10.5,
  description: 'A mock product for testing.',
  image: 'mock-image.jpg',
  rating: { rate: 4.5, count: 100 },
};

describe('ProductDetailPage', () => {
  const mockAddToCart = vi.fn();

  beforeEach(() => {
    (useCart as Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    const mocks = [
      {
        request: {
          query: GET_PRODUCT_DETAILS,
          variables: { id: '1' },
        },
        result: {
          data: { product: null },
        },
        delay: 500,
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <ProductDetailPage />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(screen.getByText(/Carregando detalhes do produto.../i)).toBeInTheDocument();
  });

  it('should render product details when data is fetched', async () => {
    const mocks = [
      {
        request: {
          query: GET_PRODUCT_DETAILS,
          variables: { id: '1' },
        },
        result: {
          data: {
            product: mockProduct,
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <ProductDetailPage />
        </BrowserRouter>
      </MockedProvider>
    );

    // Espera até que o título do produto seja renderizado
    expect(await screen.findByText('Mock Product')).toBeInTheDocument();
    expect(screen.getByText(/A mock product for testing./i)).toBeInTheDocument();
    expect(screen.getByText(/10\.50/i)).toBeInTheDocument();
  });

  it('should render error message on network error', async () => {
    const mocks = [
      {
        request: {
          query: GET_PRODUCT_DETAILS,
          variables: { id: '1' },
        },
        error: new Error('Network error'),
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <ProductDetailPage />
        </BrowserRouter>
      </MockedProvider>
    );

    // Espera até que a mensagem de erro seja exibida
    expect(await screen.findByText(/Erro ao carregar o produto: Network error/i)).toBeInTheDocument();
  });

  it('should call addToCart when the button is clicked', async () => {
    const mocks = [
      {
        request: {
          query: GET_PRODUCT_DETAILS,
          variables: { id: '1' },
        },
        result: {
          data: {
            product: mockProduct,
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <ProductDetailPage />
        </BrowserRouter>
      </MockedProvider>
    );

    // Espera que o componente termine de carregar
    await screen.findByText('Mock Product');

    // Clica no botão "Adicionar ao Carrinho"
    const addButton = screen.getByRole('button', { name: /Adicionar ao Carrinho/i });
    fireEvent.click(addButton);

    // Verifica se a função addToCart foi chamada com o produto correto
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
