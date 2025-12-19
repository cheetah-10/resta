import StarRating from '../StarRaing';

export default function RestaurantCard({ restaurant }) {
      if (!restaurant) return null

    return (
        <div className="group border-2 border-black/20 rounded-[20px] ">
            <div className="relative overflow-hidden rounded-t mb-4 rounded-bl-[200px] rounded-br-[200px] rounded-tl-[10px] rounded-tr-[10px]">
                <img
                    src={restaurant.image?.secure_url || restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover  group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="text-center">
                <div className="flex justify-center mb-2">
                    <StarRating rating={restaurant.rating} />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{restaurant.name}</h3>
                <div className="flex items-center justify-center text-sm my-3 text-black/60">
                    <svg className="w-6 h-8 mr-1" fill="#410C0C" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {restaurant.address}
                </div>
            </div>
        </div>
    );
};
