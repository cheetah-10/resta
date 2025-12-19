'use client'
// products/[id]/page.js
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import svgPaths from "../../imports/svg";
// Images
import imgRectangle47 from '/images/header.png';
import imgEllipse19 from '/images/header.png';
import imgEllipse17 from '/images/header.png';
import imgImage74 from '/images/header.png';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ productsData }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const product = productsData.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="bg-[#f5f5f5] flex flex-col items-center w-full min-h-screen">
      {/* Header Section */}
      <div className="bg-white w-full overflow-clip shrink-0 relative h-[680px]">
        <div className="absolute bg-[#dd9090] h-[630px] left-1/2 overflow-clip top-0 -translate-x-1/2 w-full max-w-[1920px]">
          <div className="absolute h-[1326.742px] left-1/2 top-[calc(50%+1.97px)] -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[100.06%] left-0 max-w-none top-[-0.03%] w-full" src='/images/header.png' />
            </div>
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.85)] h-[630px] left-1/2 mix-blend-hard-light top-0 -translate-x-1/2 w-full" />
        </div>

        <div className="absolute left-[calc(50%-1px)] not-italic text-center text-nowrap text-white top-[309px] -translate-x-1/2 z-10">
          <p className="font-['Cyntho_Next:SemiBold',sans-serif] leading-[70px] text-[50px]">Products Details</p>
          <div className="flex flex-col font-['Cyntho_Next:Regular',sans-serif] justify-center leading-[0] text-[22px] mt-6">
            <p className="leading-[22px] text-nowrap">
              <button onClick={() => navigate('/')} className="hover:text-[#ffbb15] transition-colors">Home</button>
              {' / '}
              Product Details
            </p>
          </div>
        </div>
      </div>

      {/* Product Card */}
      <div className="relative w-full max-w-[1920px] -mt-[160px] z-20 px-4 pb-16">
        <div className="mx-auto max-w-[577px]">
          <div className="bg-white rounded-[10px] overflow-clip relative shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)] border-[3px] border-[rgba(0,0,0,0.2)] border-solid">
            {showSuccess && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-[#2ecc71] text-white px-6 py-3 rounded-full shadow-lg font-['Cyntho_Next:SemiBold',sans-serif] animate-bounce">
                Added to cart! ✓
              </div>
            )}

            <div className="p-[50px] flex flex-col items-center">
              {/* Star Rating */}
              <div className="h-[31.72px] w-[240.216px] mb-8">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240.216 31.7203">
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
              <p className="capitalize font-['Cyntho_Next:SemiBold',sans-serif] leading-[45px] text-[#181818] text-[35px] text-center mb-8">
                {product.name}
              </p>

              {/* Price Section */}
              <div className="flex items-center gap-4 mb-8">
                {product.discount > 0 && (
                  <div className="relative">
                    <p className="capitalize font-['Cyntho_Next:Medium',sans-serif] opacity-20 text-[#181818] text-[30px]">
                      SAR{product.price}
                    </p>
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black opacity-20" />
                  </div>
                )}
                <p className="capitalize font-['Cyntho_Next:Bold',sans-serif] text-[#181818] text-[30px]">
                  SAR {product.finalPrice}
                </p>
              </div>

              {/* Add to Basket Button */}
              <button 
                onClick={handleAddToCart}
                className="rounded-[10px] border-[#ffbb15] border-[3px] border-solid overflow-clip px-[50px] py-[13px]"
              >
                <p className="font-['Cyntho_Next:Medium',sans-serif] leading-[normal] text-[20px] text-black text-nowrap">
                  ADD TO BASKET
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-[20px] overflow-clip w-full max-w-[1520px] mx-auto px-4 mb-16">
        <div className="p-[50px]">
          {/* Supplier Section */}
          <div className="mb-16">
            <div className="flex flex-col font-['Cyntho_Next:SemiBold',sans-serif] text-[#ec362b] text-[28px] mb-8">
              <p className="leading-[22px]">Supplier</p>
            </div>

            <div className="flex gap-8 items-start">
              <div className="h-[200px] rounded-bl-[10px] rounded-br-[200px] rounded-tl-[10px] rounded-tr-[200px] w-[290px] flex-shrink-0">
                <img alt="" className="w-full h-full object-cover rounded-bl-[10px] rounded-br-[200px] rounded-tl-[10px] rounded-tr-[200px]" src={imgRectangle47} />
              </div>

              <div className="flex-1">
                {/* Star Rating */}
                <div className="h-[30px] w-[190.181px] mb-6">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 190.181 30">
                    <g>
                      <path d={svgPaths.pd541700} fill="#FFBB15" />
                      <path d={svgPaths.p1ba8fc80} fill="#FFBB15" />
                      <path d={svgPaths.p2bd38480} fill="#FFBB15" />
                      <path d={svgPaths.p395ef600} fill="#FFBB15" />
                      <path d={svgPaths.p32745500} fill="#CCCCCC" />
                    </g>
                  </svg>
                </div>

                <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[26px] text-black mb-4">
                  Butter Sandwich
                </p>
                <p className="font-['Cyntho_Next:Medium',sans-serif] text-[20px] text-[rgba(236,54,43,0.5)] mb-4">
                  Restaurant
                </p>

                <div className="flex items-center gap-2">
                  <div className="size-[30px] flex items-center justify-center">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 28">
                      <path d={svgPaths.p81e2c00} fill="url(#paint0_linear_19_635)" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_19_635" x1="10" x2="10" y1="0" y2="28">
                          <stop stopColor="#350202" />
                          <stop offset="1" stopColor="#6B0504" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <p className="font-['Cyntho_Next:Medium',sans-serif] text-[18px] text-[rgba(0,0,0,0.5)]">
                    Main Market Riyadh, KSA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-16">
            <div className="flex flex-col font-['Cyntho_Next:SemiBold',sans-serif] text-[#ec362b] text-[28px] mb-8">
              <p className="leading-[22px]">Description</p>
            </div>
            <p className="font-['Cyntho_Next:Regular',sans-serif] leading-[25px] text-[16px] text-[rgba(0,0,0,0.5)]">
              Hotel Booking System is complete Hotel Booking IT Solution comes with Hotel Quotation Booking System for travel agent, tour operator and hotel chains to collect the inventory of hotels from multiple sources to present their clients with the best prices including bedbanks and channel managers and direct contracts.Technoheaven is a leading Travel Software Development Company offers the best Hotel Booking Software with the key role of Hotel Extranet, OTH, Hotel XML IN, Hotel XML Out and Hotel Channel Manager for hotels to automate day-to-day hotel management operations and maximize revenues.Hotel Booking System is complete Hotel Booking IT Solution comes with Hotel Quotation Booking System for travel agent, tour operator and hotel chains to collect the inventory of hotels from multiple sources to present their clients with the best prices including bedbanks and channel managers and direct contracts.Technoheaven is a leading Travel Software Development Company offers the best Hotel Booking Software with the key role of Hotel Extranet, OTH, Hotel XML IN, Hotel XML Out and Hotel Channel Manager for hotels to automate day-to-day hotel management operations and maximize revenues.
            </p>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <div className="flex flex-col font-['Cyntho_Next:SemiBold',sans-serif] text-[#ec362b] text-[28px] mb-8">
              <p className="leading-[22px]">Customer Reviews</p>
            </div>

            {/* Review 1 */}
            <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-[20px] overflow-clip p-[49px] mb-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="size-[100px] flex-shrink-0">
                  <img alt="" className="w-full h-full" src={imgEllipse19} />
                </div>
                <div className="flex-1">
                  <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[26px] text-black">Linda</p>
                  <p className="font-['Cyntho_Next:Medium',sans-serif] text-[20px] text-[rgba(0,0,0,0.5)]">Jun 28,2021</p>
                </div>
                <div className="h-[18px] w-[120.108px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120.108 18">
                    <g>
                      <path d={svgPaths.p8ff1e80} fill="#FFBB15" />
                      <path d={svgPaths.p4ee7f70} fill="#FFBB15" />
                      <path d={svgPaths.p57e0e80} fill="#FFBB15" />
                      <path d={svgPaths.p3c0dcd80} fill="#FFBB15" />
                      <path d={svgPaths.p1706f280} fill="#CCCCCC" />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="font-['Cyntho_Next:Regular',sans-serif] leading-[25px] text-[15px] text-black">
                Hotel Booking System is complete Hotel Booking IT Solution comes with Hotel Quotation Booking System for travel agent, tour operator and hotel chains to collect the inventory of hotels from multiple sources .
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-[20px] overflow-clip p-[49px] mb-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="size-[100px] flex-shrink-0">
                  <img alt="" className="w-full h-full" src={imgEllipse17} />
                </div>
                <div className="flex-1">
                  <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[26px] text-black">Linda</p>
                  <p className="font-['Cyntho_Next:Medium',sans-serif] text-[20px] text-[rgba(0,0,0,0.5)]">Jun 28,2021</p>
                </div>
                <div className="h-[18px] w-[120.108px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120.108 18">
                    <g>
                      <path d={svgPaths.p8ff1e80} fill="#FFBB15" />
                      <path d={svgPaths.p4ee7f70} fill="#FFBB15" />
                      <path d={svgPaths.p57e0e80} fill="#FFBB15" />
                      <path d={svgPaths.p3c0dcd80} fill="#FFBB15" />
                      <path d={svgPaths.p1706f280} fill="#CCCCCC" />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="font-['Cyntho_Next:Regular',sans-serif] leading-[25px] text-[15px] text-black">
                Hotel Booking System is complete Hotel Booking IT Solution comes with Hotel Quotation Booking System for travel agent, tour operator and hotel chains to collect the inventory of hotels from multiple sources .
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-[20px] overflow-clip p-[49px]">
              <div className="flex items-start gap-6 mb-6">
                <div className="size-[100px] flex-shrink-0">
                  <img alt="" className="w-full h-full" src={imgEllipse17} />
                </div>
                <div className="flex-1">
                  <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[26px] text-black">Linda</p>
                  <p className="font-['Cyntho_Next:Medium',sans-serif] text-[20px] text-[rgba(0,0,0,0.5)]">Jun 28,2021</p>
                </div>
                <div className="h-[18px] w-[120.108px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120.108 18">
                    <g>
                      <path d={svgPaths.p8ff1e80} fill="#FFBB15" />
                      <path d={svgPaths.p4ee7f70} fill="#FFBB15" />
                      <path d={svgPaths.p57e0e80} fill="#FFBB15" />
                      <path d={svgPaths.p3c0dcd80} fill="#FFBB15" />
                      <path d={svgPaths.p1706f280} fill="#CCCCCC" />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="font-['Cyntho_Next:Regular',sans-serif] leading-[25px] text-[15px] text-black">
                Hotel Booking System is complete Hotel Booking IT Solution comes with Hotel Quotation Booking System for travel agent, tour operator and hotel chains to collect the inventory of hotels from multiple sources .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Subscribe Section */}
      <div className="bg-white rounded-[20px] overflow-clip w-full max-w-[1520px] mx-auto px-4 mb-16">
        <div className="flex flex-col items-center py-[50px] gap-8">
          <p className="font-['Cyntho_Next:Bold',sans-serif] text-[35px] text-black">Subscribe</p>
          <div className="flex gap-4">
            <input type="email" placeholder="Enter your email" className="border border-black rounded-[10px] px-4 py-2 w-[400px]" />
            <button className="bg-[#ec362b] text-white px-6 py-2 rounded-[10px] flex items-center gap-2">
              <img src={imgImage74} alt="" className="w-6 h-6" /> Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
