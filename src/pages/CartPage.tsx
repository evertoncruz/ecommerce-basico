// src/components/CartPage.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="full-width-section" style={{ backgroundColor: 'var(--card-bg)' }}>
      <div className="cart-page container">
        <h2>Seu Carrinho</h2>
        {cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <div className="cart-item-info">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <span>{item.title}</span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 0)}
                        min="0"
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remover</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
                <h3>Total: R$ {total.toFixed(2)}</h3>
                <button className="clear-cart-button" onClick={clearCart}>Limpar Carrinho</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;