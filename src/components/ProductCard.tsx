import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Impede que o clique no botão "suba" e ative o Link
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>R$ {product.price.toFixed(2)}</p>
      <button onClick={handleButtonClick}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCard;