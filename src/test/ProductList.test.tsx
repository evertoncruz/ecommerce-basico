import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing/react';
import { gql } from '@apollo/client';
import ProductList from '../components/ProductList';
import { CartProvider } from '../context/CartContext';
import type { Product } from '../data/products';

// Defina a query que o componente ProductList usa
const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      image
    }
  }
`;

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 10.5,
    description: 'Description 1',
    category: 'electronics',
    image: 'image1.jpg',
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20.0,
    description: 'Description 2',
    category: 'clothing',
    image: 'image2.jpg',
    rating: { rate: 3.8, count: 5 },
  },
];

describe('ProductList', () => {
  it('should render loading state initially', () => {
    // Mock do provedor com um estado de carregamento
    const mocks = [
      {
        request: {
          query: GET_PRODUCTS,
        },
        result: {
          data: {
            products: [],
          },
        },
        delay: 500, // Simula um delay de carregamento
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <CartProvider>
            <ProductList />
          </CartProvider>
        </BrowserRouter>
      </MockedProvider>
    );

    expect(screen.getByText(/Carregando produtos.../i)).toBeInTheDocument();
  });

  it('should render product list when data is fetched', async () => {
    const mocks = [
      {
        request: {
          query: GET_PRODUCTS,
        },
        result: {
          data: {
            products: mockProducts,
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <CartProvider>
            <ProductList />
          </CartProvider>
        </BrowserRouter>
      </MockedProvider>
    );

    // Espera até que o texto do primeiro produto esteja na tela
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should render error message on network error', async () => {
    // Mock do provedor para retornar um erro
    const mocks = [
      {
        request: {
          query: GET_PRODUCTS,
        },
        error: new Error('Network error'),
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <CartProvider>
            <ProductList />
          </CartProvider>
        </BrowserRouter>
      </MockedProvider>
    );

    // Espera até que a mensagem de erro seja visível
    expect(await screen.findByText(/Erro ao carregar os produtos: Network error/i)).toBeInTheDocument();
  });
});
