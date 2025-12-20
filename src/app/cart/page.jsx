//cart.jsx
'use client'
import LoadingSpinner from "@/components/common/LoadingSpinner";
import StarRating from "@/components/StarRaing";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import svgPaths from "../../../imports/svg";
{/* <Trash2 /> */ }

function CartHeader() {
  return (
    <div className="bg-white w-full overflow-hidden shrink-0 relative h-170">
      <div className="absolute bg-[#dd9090] h-full w-full left-1/2 -translate-x-1/2 max-w-480 overflow-hidden">
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
function DeleteIcon() {
  return (
    <div className="absolute right-[43px] top-[50px] w-[44px] h-[44px] cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide text-red-600 lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
    </div>
  );
}
function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="relative bg-white border border-[rgba(0,0,0,0.2)] border-solid h-83.5 overflow-clip rounded-[20px] w-[635px]">
      <div className="absolute left-12.5 top-12.5 w-25 h-25 rounded-full overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            maskSize: '100px 99.977px',
            maskPosition: 'center',
            maskRepeat: 'no-repeat'
          }}
        >
          <img
            alt={item.name}
            className="w-full h-full object-cover"
            src={item.image}
          />
        </div>
      </div>
      {/* Rating */}
      <div className="absolute left-[170.21px] top-[50.03px]">
        <StarRating rating={5} />
      </div>
      {/* Product Name */}
      <p className="absolute font-['Cyntho_Next:SemiBold',sans-serif] left-[170.21px] top-[94.02px] text-[26px] text-black">
        {item.name}
      </p>

      {/* View Details Link */}
      <p className="absolute font-['Cyntho_Next:Medium',sans-serif] left-[170.21px] top-36.25 text-[#ffbb15] text-[20px] underline cursor-pointer">
        View Details
      </p>
      {/* Price */}
      <div className="absolute left-[170.21px] top-[199.02px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Price</p>
      </div>
      <div className="absolute left-[277.06px] top-[199.02px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[352.71px] top-[199.02px]">
        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[22px] text-black">SAR {item.price}</p>
      </div>

      {/* Quantity */}
      <div className="absolute left-[170.21px] top-[234.01px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Quantity</p>
      </div>
      <div className="absolute left-[277.06px] top-[234.01px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[352.71px] top-[234.01px] flex gap-3">
        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[22px] text-black">x {item.quantity}</p>
        <button
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
         disabled={item.quantity <= 1}
        className="w-8 h-8 rounded bg-gray-200 text-black flex items-center justify-center hover:bg-gray-300"
      >−</button>
        <button
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="w-8 h-8 rounded bg-gray-200 text-black flex items-center justify-center hover:bg-gray-300"
      >+</button>
      </div>

      {/* Subtotal */ }
      <div className="absolute left-[170.21px] top-67.25">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Subtotal</p>
      </div>
      <div className="absolute left-[277.06px] top-67.25">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[352.71px] top-67.25">
        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[22px] text-black">SAR {item.subTotal}</p>
      </div>


      <div onClick={() => onRemove(item.id)}>
        <DeleteIcon />
      </div>
    </div >
  );
}

// Cart Row Component (2 items per row)
function CartRow({ items, onRemove, onUpdateQuantity }) {
  return (
    <div className="relative bg-white border border-[rgba(0,0,0,0.2)] border-solid lg:h-[434px] lg:w-[1420px]  md:w-[750px] h-[850px]  overflow-clip rounded-[20px]">
      <div className="absolute left-12.5 top-12.25 flex-col flex lg:flex-row gap-12.5">
        {items.map((item) => (
          <CartItem key={item.id} item={item} onRemove={onRemove} onUpdateQuantity={onUpdateQuantity}/>
        ))}
      </div>
    </div>
  );
}

// Order Summary Component
function OrderSummary({ itemCount, total, onClearCart }) {
  return (
    <div className="relative bg-white border border-[rgba(0,0,0,0.2)] border-solid h-[350px] overflow-clip rounded-[20px] w-[685px]">
      {/* Title */}
      <p className="text-center mt-5 capitalize font-['Cyntho_Next:SemiBold',sans-serif] text-[35px] text-[#181818]">
        Order Summary
      </p>

      {/* Divider Line */}
      <div className="absolute left-1/2 top-[98.73px] -translate-x-1/2 w-[584.999px] h-[1px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 584.999 1">
          <path d="M0 0.5H584.999" stroke="black" strokeOpacity="0.2" />
        </svg>
      </div>

      {/* Subtotal */}
      <div className="absolute left-[50.29px] top-[149.23px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Number of items</p>
      </div>
      <div className="absolute left-[338.12px] top-[149.23px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[413.71px] top-[149.23px]">
        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[22px] text-black">SAR {itemCount}</p>
      </div>



      {/* Total */}
      <div className="absolute left-[50.29px] top-[219.23px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Total</p>
      </div>
      <div className="absolute left-[338.12px] top-[219.23px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[413.71px] top-[219.23px]">
        <p className="font-['Cyntho_Next:Bold',sans-serif] text-[22px] text-[#ec362b]">SAR {total}</p>
      </div>

      <div className="absolute left-1/2 bottom-[10.23px] -translate-x-1/2">
        <button onClick={onClearCart} className="px-8 py-3 bg-white border border-[rgba(0,0,0,0.2)] text-[#ec362b] rounded-lg font-['Open_Sans:Regular',sans-serif] text-xl hover:bg-red-50 transition-colors">Clear Cart</button>
      </div>
    </div>
  );
}

function FeaturedCard({ total }) {
  return (
    <div className="relative -top-52 bg-white rounded-[10px] shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)] border-[3px] border-[rgba(0,0,0,0.2)] w-[577px] h-[359px] flex flex-col items-center justify-center">
      {/* Star Rating */}
      <div className="mt-[32px]">
        <svg className="w-[240.216px] h-[31.72px]" fill="none" preserveAspectRatio="none" viewBox="0 0 240.216 31.7203">
          <g>
            <path d={svgPaths.p224b41a0} fill="#FFBB15" />
            <path d={svgPaths.p14146100} fill="#FFBB15" />
            <path d={svgPaths.p3b66bb00} fill="#FFBB15" />
            <path d={svgPaths.p33875700} fill="#FFBB15" />
            <path d={svgPaths.p19993d00} fill="#CCCCCC" />
          </g>
        </svg>
      </div>

      {/* Product Name */}
      <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[35px] text-[#181818] text-center capitalize mt-[30px]">
        { } Nice to meet you
      </p>

      {/* Price */}
      <div className="flex items-center gap-[20px] mt-[20px]">
        <div className="relative">
          <p className="font-['Cyntho_Next:Medium',sans-serif] text-[30px] text-[#181818] opacity-20 line-through">
            SAR89
          </p>
        </div>
        <p className="font-['Cyntho_Next:Bold',sans-serif] text-[30px] text-[#181818]">
          SAR {total}
        </p>
      </div>

      {/* Checkout Button */}
      <div className="mt-[30px]">
        <Link href='/checkout' className="border-[3px] border-[#ffbb15] rounded-[10px] px-[50px] py-[13px] font-['Cyntho_Next:Medium',sans-serif] text-[20px] text-black hover:bg-[#ffbb15] transition-colors">
          Proceed To Checkout
        </Link>
      </div>
    </div>
  );
}


export default function CartPage() {
  const { loading, cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useCart();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-[70vh]">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }
  const groupedItems = [];
  for (let i = 0; i < cart.items.length; i += 2) {
    groupedItems.push(cart.items.slice(i, i + 2));
  }

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center">
      <CartHeader />
      <FeaturedCard total={cart.totalPrice} />
      <div className="bg-white relative -top-52 w-full shrink-0 py-16">
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

            <div className="bg-white rounded-[20px] w-[1520px] min-h-[1484px] mt-[7px] p-[50px]">
              {/* Category Title */}
              <div className="mb-[30px]">
                <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[28px] text-black">
                  Butter Sandwich
                </p>
                <p className="font-['Cyntho_Next:Medium',sans-serif] text-[22px] text-[#ec362b]">
                  Restaurant
                </p>
              </div>

              {/* Cart Items */}
              <div className="space-y-[50px]">
                {groupedItems.map((row, index) => (
                  <CartRow key={index} items={row} onRemove={removeFromCart} onUpdateQuantity={updateQuantity}/>
                ))}
              </div>

              {/* Order Summary */}
              <div className="flex justify-center mt-[50px]">
                <OrderSummary
                  itemCount={getCartItemCount()}
                  total={cart.totalPrice}
                  onClearCart={handleClearCart}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
