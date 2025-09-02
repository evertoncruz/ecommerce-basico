// src/components/ProductList.tsx
import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import ProductCard from './ProductCard';
import type { Product } from '../data/products'; // Ainda vamos usar esta interface

// 1. Definir a sua query GraphQL
// O `gql` parseia a string da query para um formato que o Apollo entende
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

interface GetProductsData {
  products: Product[];
}

const ProductList: React.FC = () => {
  // 2. Usar o hook `useQuery` para buscar os dados
  const { loading, error, data } = useQuery<GetProductsData>(GET_PRODUCTS);

  // 3. Gerenciar os estados de carregamento e erro
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Carregando produtos...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Erro ao carregar os produtos: {error.message}</div>;
  }

  // Se tudo estiver certo, renderizar a lista de produtos
  // O Apollo armazena os dados na propriedade `data`
  return (
    <div className="container">
      <div className="product-list">
        {data && data.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;