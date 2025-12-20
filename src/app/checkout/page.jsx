'use client'
import StarRating from "@/components/StarRaing";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import svgPaths from "../../../imports/svg";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// --- Cart Header ---
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

// --- Cart Item ---
function CartItem({ item }) {
  return (
    <div className="relative bg-white border border-[rgba(0,0,0,0.2)] border-solid h-83.5 overflow-clip rounded-[20px] w-[635px]">
      <div className="absolute left-12.5 top-12.5 w-25 h-25 rounded-full overflow-hidden">
        <div className="w-full h-full" style={{ maskSize: '100px 99.977px', maskPosition: 'center', maskRepeat: 'no-repeat' }}>
          <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
        </div>
      </div>
      <div className="absolute left-[170.21px] top-[50.03px]">
        <StarRating rating={5} />
      </div>
      <p className="absolute font-['Cyntho_Next:SemiBold',sans-serif] left-[170.21px] top-[94.02px] text-[26px] text-black">
        {item.name}
      </p>
      <p className="absolute font-['Cyntho_Next:Medium',sans-serif] left-[170.21px] top-36.25 text-[#ffbb15] text-[20px] underline cursor-pointer">
        View Details
      </p>
      <div className="absolute left-[170.21px] top-[199.02px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Price</p>
      </div>
      <div className="absolute left-[277.06px] top-[199.02px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[352.71px] top-[199.02px]">
        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[22px] text-black">SAR {item.price}</p>
      </div>
      <div className="absolute left-[170.21px] top-[234.01px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Quantity</p>
      </div>
      <div className="absolute left-[277.06px] top-[234.01px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[352.71px] top-[234.01px] flex gap-3">
        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[22px] text-black">x {item.quantity}</p>
      </div>
      <div className="absolute left-[170.21px] top-67.25">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Subtotal</p>
      </div>
      <div className="absolute left-[277.06px] top-67.25">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[352.71px] top-67.25">
        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[22px] text-black">SAR {item.subTotal}</p>
      </div>
    </div>
  );
}

// --- Cart Row ---
function CartRow({ items }) {
  return (
    <div className="relative bg-white border border-[rgba(0,0,0,0.2)] border-solid lg:h-[434px] lg:w-[1420px]  md:w-[750px] h-[850px] overflow-clip rounded-[20px]">
      <div className="absolute left-12.5 top-12.25 flex-col flex lg:flex-row gap-12.5">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

// --- Order Summary ---
function OrderSummary({ itemCount, total }) {
  return (
    <div className="relative bg-white border border-[rgba(0,0,0,0.2)] border-solid h-[350px] overflow-clip rounded-[20px] w-[685px]">
      <p className="text-center mt-5 capitalize font-['Cyntho_Next:SemiBold',sans-serif] text-[35px] text-[#181818]">
        Order Summary
      </p>
      <div className="absolute left-1/2 top-[98.73px] -translate-x-1/2 w-[584.999px] h-[1px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 584.999 1">
          <path d="M0 0.5H584.999" stroke="black" strokeOpacity="0.2" />
        </svg>
      </div>
      <div className="absolute left-[50.29px] top-[149.23px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Number of items</p>
      </div>
      <div className="absolute left-[338.12px] top-[149.23px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[413.71px] top-[149.23px]">
        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[22px] text-black">SAR {itemCount}</p>
      </div>
      <div className="absolute left-[50.29px] top-[219.23px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">Total</p>
      </div>
      <div className="absolute left-[338.12px] top-[219.23px]">
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[22px] text-[rgba(0,0,0,0.5)]">:</p>
      </div>
      <div className="absolute left-[413.71px] top-[219.23px]">
        <p className="font-['Cyntho_Next:Bold',sans-serif] text-[22px] text-[#ec362b]">SAR {total}</p>
      </div>
    </div>
  );
}

// --- Featured Card (ثابتة) ---
function FeaturedCard({ total, onPlaceOrder }) {
  return (
    <div className="relative -top-52 bg-white rounded-[10px] shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)] border-[3px] border-[rgba(0,0,0,0.2)] w-[577px] h-[359px] flex flex-col items-center justify-center">
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
      <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[35px] text-[#181818] text-center capitalize mt-[30px]">
        Nice to meet you
      </p>
      <div className="flex items-center gap-[20px] mt-[20px]">
        <div className="relative">
          <p className="font-['Cyntho_Next:Medium',sans-serif] text-[30px] text-[#181818] opacity-20 line-through">SAR89</p>
        </div>
        <p className="font-['Cyntho_Next:Bold',sans-serif] text-[30px] text-[#181818]">SAR {total}</p>
      </div>
       <button
        className="border-[3px] border-[#ffbb15] rounded-[10px] px-10 py-3 text-[20px] hover:bg-[#ffbb15] transition-colors"
        onClick={onPlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}

function OrderDetailsForm({ address, setAddress, phoneNumber, setPhoneNumber, paymentMethod, setPaymentMethod }) {
  const paymentOptions = [
    { label: "Cash On Delivery", value: "cash" },
    { label: "Credit / Debit Card", value: "card" },
    { label: "Apple Pay", value: "apple" },
  ];

  return (
    < >
      <div className="relative p-16 mb-16 bg-white border border-[rgba(0,0,0,0.2)] border-solid lg:h-[300px] lg:w-[1420px]  md:w-[750px] h-[850px] overflow-clip rounded-[20px]">

        <h2 className="text-2xl  text-[#ec362b] mb-4  font-semibold">Address</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
          className="w-full m-auto border rounded-lg p-3 mb-5 text-[22px]"
        />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone"
          className="w-full border rounded-lg p-3 mb-4 text-[22px]"
        />
      </div>
      <div className="relative p-16 bg-white border border-[rgba(0,0,0,0.2)] border-solid h-[300px] lg:w-[1420px]  md:w-[750px] overflow-clip rounded-[20px]">
        <h2 className="text-2xl  text-[#ec362b] mb-4  font-semibold">Payment method</h2>

        <div className="flex flex-col gap-2 mb-4">
          {paymentOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-[22px]">
              <input
                type="radio"
                name="payment"
                value={option.value}
                checked={paymentMethod === option.value}
                onChange={() => setPaymentMethod(option.value)}
                className="w-5 h-5 accent-[#ffbb15]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
     
    </>
  );
}

// --- CheckOut Page ---
export default function CheckOut() {
  const { checkout, cart, getCartItemCount } = useCart();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

const router = useRouter()
  const handlePlaceOrder = async () => {
    if (!address) return toast.error("Please enter your address");

    try {
      await checkout({ address, phoneNumber, paymentMethod });
      toast.success("Order placed successfully!");
      router.push('/order-history')
    } catch (err) {
      console.log(err);
    }
  };

  const groupedItems = [];
  for (let i = 0; i < cart.items.length; i += 2) {
    groupedItems.push(cart.items.slice(i, i + 2));
  }

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center">
      <CartHeader />
      <FeaturedCard total={cart.totalPrice}         onPlaceOrder={handlePlaceOrder}
 />
      <OrderDetailsForm
        address={address}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        setAddress={setAddress}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <div className="bg-white relative w-full shrink-0 py-16">
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
            <>
              <div className="mb-7.5">
                <p className="font-['Cyntho_Next:Medium',sans-serif] text-[30px] text-[#ec362b]">Ordered Items</p>
              </div>
              <div className="space-y-[50px]">
                {groupedItems.map((row, index) => (
                  <CartRow key={index} items={row} />
                ))}
              </div>
              <div className="flex justify-center mt-[50px]">
                <OrderSummary
                  itemCount={getCartItemCount()}
                  total={cart.totalPrice}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}