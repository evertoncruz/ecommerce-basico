import { renderHook, act } from '@testing-library/react';
import { useCart, CartProvider } from '../context/CartContext';
import type { Product } from '../data/products';

const mockProduct: Product = {
  id: 1,
  title: 'Mock Product',
  price: 10.5,
  description: 'A mock product for testing.',
  category: 'electronics',
  image: 'mock-image.jpg',
  rating: { rate: 4.5, count: 100 },
};

describe('useCart', () => {
  it('should initialize with an empty cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
    expect(result.current.cartItems).toEqual([]);
  });

  it('should add a product to the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems).toEqual([{ ...mockProduct, quantity: 1 }]);
  });

  it('should increase the quantity if the product already exists', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('should remove a product from the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cartItems).toEqual([]);
  });

  it('should update a products quantity', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(mockProduct.id, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
  });
  
  it('should remove product when quantity is updated to 0', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });
    
    act(() => {
        result.current.updateQuantity(mockProduct.id, 0);
    });

    expect(result.current.cartItems).toEqual([]);
  });
});
