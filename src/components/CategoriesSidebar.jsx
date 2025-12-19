'use client'
import { useApiQuery } from "@/hooks/useFetch";
import StarRating from "./StarRaing";

export default function Sidebar({ selectedCategories, setSelectedCategories }) {

    const { data: categories, isLoading, isError } = useApiQuery(
        {
        queryKey: ["categories"],
        url: "http://localhost:5000/category",
   
      })

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded overflow-y-auto p-8 w-full lg:w-[342px] shrink-0">
      <div className="space-y-8">
        {/* Rating Section */}
        <div>
          <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-black text-xl mb-4">Rating</p>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-4">
                <StarRating rating={rating} />
                <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded size-[30px]" />
              </div>
            ))}
          </div>
        </div>

        {/* Category Section */}
        <div>
          <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-black text-xl mb-4">Category</p>
          <div className="space-y-3">
            {categories?.map((category) => (
              <div key={category.id} className="flex items-center justify-between cursor-pointer" onClick={() => toggleCategory(category.id)}>
                <p className="font-['Cyntho_Next:Regular',sans-serif] text-black">{category.name}</p>
                <div className={`border border-[rgba(0,0,0,0.2)] border-solid rounded size-7.5 flex items-center justify-center transition-colors ${
                  selectedCategories.includes(category.id) ? 'bg-[#410c0c]' : 'bg-white'
                }`}>
                  {selectedCategories.includes(category.id) && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div>
          <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-black text-xl mb-4">Price Range</p>
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-['Cyntho_Next:Regular',sans-serif] text-black">
              <p>Price:</p>
              <p>$10</p>
              <p>—</p>
              <p>$80</p>
            </div>
            <div className="relative h-1">
              <div className="absolute bg-[#410c0c] h-1 rounded-full w-full" />
              <div className="absolute bg-white border-4 border-[#410c0c] rounded-full w-4 h-4 -top-1.5 left-0 shadow" />
              <div className="absolute bg-white border-4 border-[#410c0c] rounded-full w-4 h-4 -top-1.5 right-0 shadow" />
            </div>
            <button className="bg-[#410c0c] text-white rounded-[30px] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-10 px-6 w-full font-['Open_Sans:Regular',sans-serif] uppercase tracking-widest text-sm">
              Filter
            </button>
          </div>
        </div>

        {/* Special Requirements Section */}
        <div>
          <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-black text-xl mb-4">Special Requirements</p>
          <div className="space-y-3">
            {['No egg', 'No fish', 'No peanuts'].map((req) => (
              <div key={req} className="flex items-center justify-between">
                <p className="font-['Cyntho_Next:Regular',sans-serif] text-black">{req}</p>
                <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded size-[30px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}