'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import axios from 'axios';
import svgPaths from "../../imports/svg";
import { imgImage5 } from "../../imports/svg";
import OrderConfirmationModal from '@/components/OrderConfirmationModal';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart(); // استخدم الكارت من الـ context
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCartTotal = () => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const subtotal = getCartTotal();
  const vat = Math.round(subtotal * 0.15);
  const total = subtotal + vat;

  const handlePlaceOrder = async () => {
    if (!cart.items.length) return;

    const orderData = {
      address: 'Main Market Riyadh, KSA',
      phoneNumber: '0500000000',
      paymentMethod: selectedPayment
    };

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/orders', orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setShowOrderModal(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowOrderModal(false);
    router.push('/order-history');
  };

  if (!cart.items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-['Cyntho_Next:SemiBold',sans-serif] mb-4">Your cart is empty</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#ffbb15] text-[#410c0c] font-['Open_Sans:Regular',sans-serif] uppercase tracking-widest px-8 py-3 rounded hover:bg-[#e5a613] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] flex flex-col items-center w-full min-h-screen">
      {/* Ordered Items Section */}
      <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-[20px] overflow-clip p-[50px] max-w-[1520px] w-full mx-auto mb-8">
        <h2 className="font-['Cyntho_Next:SemiBold',sans-serif] text-[28px] mb-8 text-center">Ordered Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cart.items.map((item) => (
            <div key={item.id} className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-[20px] overflow-clip p-[50px]">
              <div className="flex gap-6 mb-8">
                <div className="h-[99.977px] w-[144.715px] flex-shrink-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[22.357px_0px] mask-size-[100px_99.977px]" style={{ maskImage: `url('${imgImage5}')` }}>
                  <div className="w-full h-full overflow-hidden">
                    <img alt="" className="h-[100.06%] w-[100.22%] object-cover" src={item.product.image || '/images/header.png'} />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[26px] text-black mb-2">{item.product.name}</p>
                  <p className="font-['Cyntho_Next:Medium',sans-serif] text-[20px] text-[#ffbb15] underline decoration-solid cursor-pointer">View Details</p>
                </div>
              </div>

              <div className="space-y-2 text-[22px]">
                <div className="flex justify-between">
                  <span className="font-['Cyntho_Next:Regular',sans-serif] text-[rgba(0,0,0,0.5)]">Price</span>
                  <span className="font-['Cyntho_Next:Medium',sans-serif] text-black">SAR {item.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-['Cyntho_Next:Regular',sans-serif] text-[rgba(0,0,0,0.5)]">Quantity</span>
                  <span className="font-['Cyntho_Next:Medium',sans-serif] text-black">x {item.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-['Cyntho_Next:Regular',sans-serif] text-[rgba(0,0,0,0.5)]">Subtotal</span>
                  <span className="font-['Cyntho_Next:Medium',sans-serif] text-black">SAR {item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-[20px] overflow-clip p-[50px] max-w-[600px] w-full mx-auto mb-16">
        <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[28px] text-black text-center mb-8">Order Summary</p>
        <div className="space-y-4">
          <div className="flex justify-between text-[22px]">
            <span className="font-['Cyntho_Next:Regular',sans-serif] text-[rgba(0,0,0,0.5)]">Subtotal</span>
            <span className="font-['Cyntho_Next:Medium',sans-serif] text-black">SAR {subtotal}</span>
          </div>
          <div className="flex justify-between text-[22px]">
            <span className="font-['Cyntho_Next:Regular',sans-serif] text-[rgba(0,0,0,0.5)]">VAT</span>
            <span className="font-['Cyntho_Next:Medium',sans-serif] text-black">SAR {vat}</span>
          </div>
          <div className="flex justify-between text-[22px]">
            <span className="font-['Cyntho_Next:Regular',sans-serif] text-[rgba(0,0,0,0.5)]">Total</span>
            <span className="font-['Cyntho_Next:Medium',sans-serif] text-[#ec362b]">SAR {total}</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={handlePlaceOrder}
            disabled={loading}
            className="rounded-[10px] border-[#ffbb15] border-[3px] border-solid overflow-clip px-[50px] py-[13px]"
          >
            <p className="font-['Cyntho_Next:Medium',sans-serif] leading-[normal] text-[20px] text-black text-nowrap">
              {loading ? 'Placing Order...' : 'Place Order'}
            </p>
          </button>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showOrderModal && (
        <OrderConfirmationModal onClose={handleModalClose} />
      )}
    </div>
  );
}
