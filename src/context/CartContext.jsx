'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on init
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {
      id: 1,
      cartId: 'cart-' + Date.now(),
      items: []
    };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return {
          ...prevCart,
          items: prevCart.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        // Add new item
        const newItem = {
          id: Date.now(),
          cartId: prevCart.cartId,
          productId: product.id,
          quantity: 1,
          price: product.finalPrice,
          product: product
        };
        return {
          ...prevCart,
          items: [...prevCart.items, newItem]
        };
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.id !== itemId)
    }));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    }));
  };

  const clearCart = () => {
    setCart({
      id: cart.id + 1,
      cartId: 'cart-' + Date.now(),
      items: []
    });
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
