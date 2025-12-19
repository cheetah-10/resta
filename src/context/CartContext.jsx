'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], cartId: null });

  // جلب الكارت عند التحميل
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/cart', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCart({ 
        items: res.data.data.products.map(p => ({
          id: p.itemId,
          productId: p.productId,
          quantity: p.quantity,
          price: p.price,
          product: {
            ...p,
            image: p.image.secure_url,
            name: p.name
          }
        })),
        cartId: res.data.data.cartId
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      await axios.post('http://localhost:5000/cart/add', { productId: product.id, quantity }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success("Product added to cart");
      fetchCart(); //
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await axios.patch('http://localhost:5000/cart', { itemId, quantity }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await axios.put('http://localhost:5000/cart/clear', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
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
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
