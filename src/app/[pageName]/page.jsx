'use client'
import { useEffect, useState } from 'react';
import ProductCard from '@/components/cards/ProductCard';
import Sidebar from '@/components/CategoriesSidebar';
import SearchBar from '@/components/common/Searchbar';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import RestaurantCard from '@/components/cards/RestaurantCard';




function Header({ header }) {

  return (<>
    <div className="bg-white w-full overflow-hidden shrink-0 relative h-[680px]">
      <div className="absolute bg-[#dd9090] h-full w-full left-1/2 -translate-x-1/2 max-w-[1920px] overflow-hidden">
        <div className="absolute w-full h-full">
          <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={header} />
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-5xl mb-4">          {header.includes('product') ? 'Products' : 'Restaurants'}
        </p>
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-xl">Home /           {header.includes('product') ? 'Products' : 'Restaurants'}
</p>
      </div>
    </div>

  </>
  );
}

export default function Products() {
  const { pageName } = useParams()
  const isProducts = pageName === 'products'
  const isRestaurants = pageName === 'restaurants'
  const [productsData, setProductsData] = useState([])
  const [restaurantsData, setRestaurantsData] = useState([])
  const [img, setImg] = useState('')


  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:5000/product");
        setProductsData(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      }
    }
    fetchProducts();
  }, []);
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const res = await axios.get("http://localhost:5000/restaurant");
        setRestaurantsData(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load restaurant");
      }
    }
    fetchRestaurants();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredProducts = selectedCategories.length === 0
    ? productsData
    : productsData.filter(product => selectedCategories.includes(product.categoryId));

  const headerImg = isProducts
    ? '/images/productsHeader.png'
    : '/images/restaurantheader.png'


  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <Header header={headerImg} />

      <div className="bg-white w-full shrink-0 relative">
        <div className="max-w-[1520px] mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar */}

            <Sidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-8">
              {/* Search Bar */}
              <SearchBar />


              {/* Products Grid */}
              {isProducts && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>}


              {isRestaurants && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
                {restaurantsData.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>}


              {isProducts && filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-2xl text-gray-400">
                    No products found in selected categories
                  </p>
                </div>
              )}
              {isRestaurants && restaurantsData.length === 0 && (
                <div className="text-center py-20">
                  <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-2xl text-gray-400">
                    No Restaurants found
                  </p>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
