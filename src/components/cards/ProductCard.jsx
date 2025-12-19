'use client'
import { useCart } from "@/context/CartContext";
import StarRating from "../StarRaing";



export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {

    addToCart(product, 1);

  };


  return (
    <div
      // onClick={goToDetails}
      className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-[20px] overflow-hidden flex flex-col w-full max-w-[343px]">
      <div className="relative bg-white rounded-bl-[200px] rounded-br-[200px] rounded-tl-[10px] rounded-tr-[10px] overflow-hidden h-[310px]">
        <div className="absolute -left-1 -top-9 rounded-[62px] w-[350px] h-[350px]">
          <img
            alt={product.name}
            className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[62px] size-full object-center"
            src={product.image.secure_url}
          />
        </div>
        {product.stock > 0 && (
          <div className="absolute left-5 top-5 bg-white border border-[rgba(0,0,0,0.2)] border-solid h-10 rounded px-6 flex items-center justify-center">
            <p className="font-['Aspira_XWide:Regular',sans-serif] text-black text-xl">Featured</p>
          </div>
        )}
      </div>

      <div className="p-6 pb-8 flex flex-col items-center gap-3">
        <StarRating rating={5} />

        <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-black text-2xl text-center">{product.name}</p>

        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[rgba(0,0,0,0.5)] text-lg">
          {product.slug}
        </p>

        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[rgba(236,54,43,0.5)] text-lg">Restaurant ID: {product.restaurantId}</p>

        <div className="flex items-center gap-3">
          {product.discount > 0 && (
            <div className="relative">
              <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[rgba(0,0,0,0.5)] text-xl">SAR{product.price}</p>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-black opacity-50" />
            </div>
          )}
          <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[#ec362b] text-xl">SAR {(product.price) - (product.discount) * (product.price)}</p>
        </div>



        <button
          onClick={() => { handleAddToCart }}
          className="bg-[#ffbb15] cursor-pointer text-[#410c0c] font-['Open_Sans:Regular',sans-serif] uppercase tracking-widest px-8 py-3 rounded hover:bg-[#e5a613] transition-colors w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}