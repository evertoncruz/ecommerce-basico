import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartPage from './pages/CartPage';
import './styles/app.css';
import ProductDetailPage from './pages/ProductDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/produto/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;