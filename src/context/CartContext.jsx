'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], cartId: null, totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [actionLoading, setActionLoading] = useState(false); // تعديل عنصر


  // جلب الكارت عند التحميل أو عند تغيير التوكن
  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const products = res.data.data.products.map(p => ({
        id: p.itemId,
        productId: p.productId,
        quantity: p.quantity,
        price: p.price,
        name: p.name,
        image: p.image?.secure_url || '/images/restaurant.png',
        subTotal: p.subTotal
      }));

      setCart({
        items: products,
        cartId: res.data.data.cartId,
        totalPrice: res.data.data.totalPrice
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      await axios.post('http://localhost:5000/cart/add', { productId: product.id, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Product added to cart");
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await axios.patch('http://localhost:5000/cart', { itemId, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await axios.put('http://localhost:5000/cart/clear', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };



  const checkout = async ({ address, phoneNumber, paymentMethod = 'cash' }) => {
    setActionLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/order',
        { address, phoneNumber, paymentMethod },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Order placed successfully ✅");
      fetchCart(); // الكارت فاضي بعد الأوردر
      return res.data.data; // { orderId }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Checkout failed");
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      checkout
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
