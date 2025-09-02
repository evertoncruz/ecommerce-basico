import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="main-header"> {/* Esta div agora tem o background de ponta a ponta */}
      <nav className="header-nav container"> {/* E o conteúdo do nav está centralizado */}
        <div className="logo">
          <Link to="/">
            <h1>E-commerce Portfólio</h1>
          </Link>
        </div>
        <div className="cart-icon">
          <Link to="/carrinho">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;