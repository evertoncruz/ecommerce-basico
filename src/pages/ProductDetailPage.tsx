// src/components/ProductDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

// 1. Defina a sua query GraphQL com um argumento
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

const ProductDetailPage: React.FC = () => {
  // 2. Extraia o ID da URL usando `useParams` do React Router
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  // 3. Use o hook `useQuery`, passando o ID como uma variável
  interface GetProductDetailsData {
    product: Product;
  }
  
  const { loading, error, data } = useQuery<GetProductDetailsData>(GET_PRODUCT_DETAILS, {
    variables: { id },
    fetchPolicy: 'cache-first', 
  });

  // 4. Gerenciar os estados de carregamento, erro e dados
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Carregando detalhes do produto...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Erro ao carregar o produto: {error.message}</div>;
  }

  if (!data || !data.product) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Produto não encontrado.</div>;
  }

  const product: Product = data.product;

  return (
    <div className="container-centered product-detail">
      <img src={product.image} alt={product.title} />
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Preço: R$ {product.price.toFixed(2)}</p>
        <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;