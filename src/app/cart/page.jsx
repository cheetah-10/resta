//cart.jsx
'use client'
import { useCart } from "@/context/CartContext";
import Link from "next/link";

function CartHeader() {
  return (
    <div className="bg-white w-full overflow-hidden shrink-0 relative h-[680px]">
      <div className="absolute bg-[#dd9090] h-full w-full left-1/2 -translate-x-1/2 max-w-[1920px] overflow-hidden">
        <div className="absolute w-full h-full">
          <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src='/images/header.png' />
        </div>
        <div className="absolute bg-[rgba(0,0,0,0.75)] h-full w-full mix-blend-hard-light" />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-5xl mb-4">Shopping Cart</p>
        <div className="flex items-center justify-center gap-2">
          <Link href='/' className="font-['Cyntho_Next:Regular',sans-serif] text-xl hover:text-[#ffbb15] transition-colors">Home</Link>
          <span className="font-['Cyntho_Next:Regular',sans-serif] text-xl">/</span>
          <Link href='/products' className="font-['Cyntho_Next:Regular',sans-serif] text-xl hover:text-[#ffbb15] transition-colors">Products</Link>
          <span className="font-['Cyntho_Next:Regular',sans-serif] text-xl">/</span>
          <span className="font-['Cyntho_Next:Regular',sans-serif] text-xl">Cart</span>
        </div>
      </div>
    </div>
  );
}

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.2)] rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition-shadow">
      <div className="w-full md:w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col gap-3 w-full">
        <h3 className="font-['Cyntho_Next:SemiBold',sans-serif] text-2xl text-black">{item.product.name}</h3>
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[rgba(0,0,0,0.6)] text-lg">Park Lank Hotel • Restaurant</p>
        <div className="flex items-center gap-2">
          <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[#ec362b] text-xl">SAR {item.price}</p>
          <span className="text-[rgba(0,0,0,0.4)]">each</span>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-2">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="w-10 h-10 rounded-lg bg-white border border-[rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-[#410c0c] hover:text-white transition-colors font-['Cyntho_Next:SemiBold',sans-serif] text-xl">−</button>
        <span className="font-['Cyntho_Next:SemiBold',sans-serif] text-xl w-12 text-center">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 rounded-lg bg-white border border-[rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-[#410c0c] hover:text-white transition-colors font-['Cyntho_Next:SemiBold',sans-serif] text-xl">+</button>
      </div>

      <div className="flex flex-col items-end gap-2 min-w-[120px]">
        <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-2xl text-[#410c0c]">SAR {(item.price * item.quantity).toFixed(2)}</p>
        <button onClick={() => onRemove(item.id)} className="text-[#ec362b] hover:text-[#d62c21] font-['Cyntho_Next:Regular',sans-serif] text-sm flex items-center gap-1 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
}

function CartSummary({ total, itemCount, onClearCart }) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.2)] rounded-lg p-8 sticky top-8">
      <h2 className="font-['Cyntho_Next:SemiBold',sans-serif] text-2xl text-black mb-6">Order Summary</h2>
      <div className="space-y-4 mb-6 pb-6 border-b border-[rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center">
          <span className="font-['Cyntho_Next:Regular',sans-serif] text-lg text-[rgba(0,0,0,0.6)]">Items ({itemCount})</span>
          <span className="font-['Cyntho_Next:SemiBold',sans-serif] text-lg text-black">SAR {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-['Cyntho_Next:Regular',sans-serif] text-lg text-[rgba(0,0,0,0.6)]">Delivery Fee</span>
          <span className="font-['Cyntho_Next:SemiBold',sans-serif] text-lg text-[#2ecc71]">Free</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <span className="font-['Cyntho_Next:SemiBold',sans-serif] text-2xl text-black">Total</span>
        <span className="font-['Cyntho_Next:SemiBold',sans-serif] text-3xl text-[#410c0c]">SAR {total.toFixed(2)}</span> 
      </div>

      <div className="space-y-3">
        <button className="w-full cursor-pointer bg-[#410c0c] text-white rounded-lg py-4 font-['Open_Sans:SemiBold',sans-serif] text-lg hover:bg-[#5a1010] transition-colors shadow-lg">Proceed to Checkout</button>
        <button className="w-full cursor-pointer bg-white border-2 border-[#410c0c] text-[#410c0c] rounded-lg py-4 font-['Open_Sans:SemiBold',sans-serif] text-lg hover:bg-gray-50 transition-colors">
          <Link href="/products">Continue Shopping</Link>
        </button>
        <button onClick={onClearCart} className="w-full bg-white border border-[rgba(0,0,0,0.2)] text-[#ec362b] rounded-lg py-3 font-['Open_Sans:Regular',sans-serif] text-sm hover:bg-red-50 transition-colors">Clear Cart</button>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useCart();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <CartHeader />
      <div className="bg-white w-full shrink-0 relative py-16">
        <div className="max-w-[1520px] mx-auto px-4 lg:px-8">
          {cart.items.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-8">
                <svg className="w-32 h-32 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="font-['Cyntho_Next:SemiBold',sans-serif] text-3xl text-black mb-4">Your cart is empty</h2>
              <p className="font-['Cyntho_Next:Regular',sans-serif] text-xl text-[rgba(0,0,0,0.5)] mb-8">Looks like you haven't added anything to your cart yet</p>
              <button className="bg-[#410c0c] text-white rounded-lg py-4 px-12 font-['Open_Sans:SemiBold',sans-serif] text-lg hover:bg-[#5a1010] transition-colors">
                <Link href='/products'>Start Shopping</Link>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-['Cyntho_Next:SemiBold',sans-serif] text-3xl text-black">Shopping Cart</h2>
                  <p className="font-['Cyntho_Next:Regular',sans-serif] text-lg text-[rgba(0,0,0,0.5)]">{getCartItemCount()} {getCartItemCount() === 1 ? 'item' : 'items'}</p>
                </div>
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
                ))}
              </div>
              <div className="lg:col-span-1">
                <CartSummary total={getCartTotal()} itemCount={getCartItemCount()} onClearCart={handleClearCart} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
