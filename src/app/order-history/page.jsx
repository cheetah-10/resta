'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/order', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrders(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffbb15';
      case 'accepted': return '#4c8900';
      case 'cancelled': return '#ec362b';
      case 'completed': return '#1249ff';
      default: return '#ffbb15';
    }
  };

  const getStatusLabel = (status) => status.charAt(0).toUpperCase() + status.slice(1);
  const getPaidStatus = (status) => status === 'accepted' || status === 'completed';

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen my-20">

      {/* Orders List */}
      <div className="bg-white w-full max-w-[1520px] mx-auto px-4 py-16">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-2xl text-gray-400 mb-6">
              No orders yet
            </p>
            <button
              onClick={() => router('/products')}
              className="bg-[#ffbb15] text-[#410c0c] font-['Open_Sans:Regular',sans-serif] uppercase tracking-widest px-8 py-3 rounded hover:bg-[#e5a613] transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-[20px] overflow-clip">
                {/* Order Header */}
                <div className="p-8 border-b border-[rgba(0,0,0,0.2)]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[28px] text-black mb-2">
                        Order# {order.id}
                      </p>
                      <p className="font-['Cyntho_Next:Regular',sans-serif] text-[18px] text-[rgba(0,0,0,0.5)]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col font-['Cyntho_Next:Medium',sans-serif] text-[20px] text-center" style={{ color: getStatusColor(order.status) }}>
                      <p>{getStatusLabel(order.status)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-['Cyntho_Next:Medium',sans-serif] text-[26px] text-black mb-2">
                        {order.restaurantId} {/* أو لو عندك اسم المطعم ممكن تعدله */}
                      </p>
                      <p className="font-['Cyntho_Next:Medium',sans-serif] text-[20px] text-[rgba(236,54,43,0.5)] mb-4">
                        Restaurant
                      </p>

                      <div className="flex items-center gap-2 mb-6">
                        <div className="size-[30px] flex items-center justify-center">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 0C9.48611 0 5 4.18704 5 9.33335C5 10.8783 5.41385 12.4101 6.20059 13.7687L14.4532 27.6992C14.563 27.8849 14.7724 28 15 28C15.2277 28 15.437 27.8849 15.5469 27.6992L23.8025 13.7641C24.5862 12.4101 25 10.8782 25 9.3333C25 4.18704 20.5139 0 15 0ZM15 14C12.2431 14 10 11.9065 10 9.33335C10 6.7602 12.2431 4.6667 15 4.6667C17.757 4.6667 20 6.7602 20 9.33335C20 11.9065 17.757 14 15 14Z" fill="url(#paint0_linear_115_2513)" />
                            <defs>
                              <linearGradient id="paint0_linear_115_2513" x1="15" y1="0" x2="15" y2="28" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#350202" />
                                <stop offset="1" stop-color="#6B0504" />
                              </linearGradient>
                            </defs>
                          </svg>

                        </div>
                        <p className="font-['Cyntho_Next:Medium',sans-serif] text-[18px] text-[rgba(0,0,0,0.5)]">
                          {order.address}
                        </p>
                      </div>

                      <p className="font-['Cyntho_Next:Bold',sans-serif] text-[22px] text-[#ec362b]">
                        SAR {order.totalPrice}
                      </p>
                    </div>

                    {/* Payment Status Badge */}
                    <div className="flex items-center justify-center">
                      {getPaidStatus(order.status) ? (
                        <svg width="124" height="100" viewBox="0 0 124 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M112 50C112 77.6142 89.6142 100 62 100C34.3858 100 12 77.6142 12 50C12 22.3858 34.3858 0 62 0C89.6142 0 112 22.3858 112 50ZM14.763 50C14.763 76.0883 35.9117 97.237 62 97.237C88.0883 97.237 109.237 76.0883 109.237 50C109.237 23.9117 88.0883 2.763 62 2.763C35.9117 2.763 14.763 23.9117 14.763 50Z" fill="#4C8900" />
                          <path d="M106 50C106 74.3005 86.3005 94 62 94C37.6995 94 18 74.3005 18 50C18 25.6995 37.6995 6 62 6C86.3005 6 106 25.6995 106 50ZM19.0558 50C19.0558 73.7174 38.2826 92.9442 62 92.9442C85.7174 92.9442 104.944 73.7174 104.944 50C104.944 26.2826 85.7174 7.0558 62 7.0558C38.2826 7.0558 19.0558 26.2826 19.0558 50Z" fill="#4C8900" />
                          <rect x="0.5" y="36.5" width="123" height="25" fill="white" stroke="#4C8900" />
                          <line x1="39" y1="64.5" x2="87" y2="64.5" stroke="#4C8900" />
                          <line x1="39" y1="33.5" x2="87" y2="33.5" stroke="#4C8900" />
                          <line x1="44" y1="31.5" x2="82" y2="31.5" stroke="#4C8900" />
                          <line x1="44" y1="66.5" x2="82" y2="66.5" stroke="#4C8900" />
                          <circle cx="44.5" cy="83.5" r="1.5" fill="#4C8900" />
                          <circle cx="44.5" cy="16.5" r="1.5" fill="#4C8900" />
                          <circle cx="53.5" cy="87.5" r="1.5" fill="#4C8900" />
                          <circle cx="53.5" cy="12.5" r="1.5" fill="#4C8900" />
                          <circle cx="62.5" cy="88.5" r="1.5" fill="#4C8900" />
                          <circle cx="62.5" cy="10.5" r="1.5" fill="#4C8900" />
                          <circle cx="71.5" cy="87.5" r="1.5" fill="#4C8900" />
                          <circle cx="71.5" cy="12.5" r="1.5" fill="#4C8900" />
                          <circle cx="80.5" cy="83.5" r="1.5" fill="#4C8900" />
                          <circle cx="80.5" cy="16.5" r="1.5" fill="#4C8900" />
                          <path d="M32.2463 40.686C34.2569 40.686 35.7909 41.1107 36.8483 41.96C37.9056 42.8093 38.4343 44.0487 38.4343 45.678C38.4343 47.342 37.9056 48.616 36.8483 49.5C35.7909 50.3667 34.2569 50.8 32.2463 50.8H30.6603V53.374H33.2863V56H25.4603V53.374H27.6443V43.312H25.4603V40.686H32.2463ZM32.2203 48.434C34.2656 48.434 35.2883 47.5413 35.2883 45.756C35.2883 44.1267 34.2656 43.312 32.2203 43.312H30.6863V48.434H32.2203ZM43.6064 56V53.374H46.1804L50.1064 43.312H47.9224V40.686H53.8244L58.6084 53.374H60.9484V56H54.2144V53.374H55.5924L54.7864 51.138H49.6124L48.8064 53.374H50.3144V56H43.6064ZM50.3664 49.084H54.0844L52.2644 43.65L50.3664 49.084ZM68.1943 40.686H76.1503V43.312H73.6803V53.374H76.1503V56H68.1683V53.374H70.6903V43.312H68.1943V40.686ZM91.3778 40.686C93.9431 40.686 95.9451 41.388 97.3838 42.792C98.8224 44.196 99.5418 46.1373 99.5418 48.616C99.5418 50.9387 98.8398 52.75 97.4358 54.05C96.0318 55.35 94.0818 56 91.5858 56H84.2538V53.374H86.4638V43.312H84.2538V40.686H91.3778ZM91.1178 53.374C92.8511 53.374 94.1598 52.9753 95.0438 52.178C95.9451 51.3807 96.3958 50.202 96.3958 48.642C96.3958 46.8913 95.9711 45.5653 95.1218 44.664C94.2724 43.7627 93.0244 43.312 91.3778 43.312H89.4798V53.374H91.1178Z" fill="#4C8900" />
                        </svg>

                      ) : (
                        <svg width="124" height="100" viewBox="0 0 124 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M112 50C112 77.6142 89.6142 100 62 100C34.3858 100 12 77.6142 12 50C12 22.3858 34.3858 0 62 0C89.6142 0 112 22.3858 112 50ZM14.763 50C14.763 76.0883 35.9117 97.237 62 97.237C88.0883 97.237 109.237 76.0883 109.237 50C109.237 23.9117 88.0883 2.763 62 2.763C35.9117 2.763 14.763 23.9117 14.763 50Z" fill="#E40F1B" />
                          <path d="M106 50C106 74.3005 86.3005 94 62 94C37.6995 94 18 74.3005 18 50C18 25.6995 37.6995 6 62 6C86.3005 6 106 25.6995 106 50ZM19.0558 50C19.0558 73.7174 38.2826 92.9442 62 92.9442C85.7174 92.9442 104.944 73.7174 104.944 50C104.944 26.2826 85.7174 7.0558 62 7.0558C38.2826 7.0558 19.0558 26.2826 19.0558 50Z" fill="#E40F1B" />
                          <rect x="0.5" y="36.5" width="123" height="25" fill="white" stroke="#E40F1B" />
                          <line x1="39" y1="64.5" x2="87" y2="64.5" stroke="#E40F1B" />
                          <line x1="39" y1="33.5" x2="87" y2="33.5" stroke="#E40F1B" />
                          <line x1="44" y1="31.5" x2="82" y2="31.5" stroke="#E40F1B" />
                          <line x1="44" y1="66.5" x2="82" y2="66.5" stroke="#E40F1B" />
                          <circle cx="44.5" cy="83.5" r="1.5" fill="#E40F1B" />
                          <circle cx="44.5" cy="16.5" r="1.5" fill="#E40F1B" />
                          <circle cx="53.5" cy="87.5" r="1.5" fill="#E40F1B" />
                          <circle cx="53.5" cy="12.5" r="1.5" fill="#E40F1B" />
                          <circle cx="62.5" cy="88.5" r="1.5" fill="#E40F1B" />
                          <circle cx="62.5" cy="10.5" r="1.5" fill="#E40F1B" />
                          <circle cx="71.5" cy="87.5" r="1.5" fill="#E40F1B" />
                          <circle cx="71.5" cy="12.5" r="1.5" fill="#E40F1B" />
                          <circle cx="80.5" cy="83.5" r="1.5" fill="#E40F1B" />
                          <circle cx="80.5" cy="16.5" r="1.5" fill="#E40F1B" />
                          <path d="M6.56434 40.686H13.2983L18.8363 51.684V43.312H16.8343V40.686H23.9843V43.312H21.5403V56H18.0563L11.4783 43.286L11.5043 53.374H13.6883V56H6.53834V53.374H8.80034V43.312H6.56434V40.686ZM32.8564 40.166C34.3644 40.166 35.6904 40.4867 36.8344 41.128C37.9784 41.7693 38.8711 42.6967 39.5124 43.91C40.1538 45.1233 40.4744 46.5967 40.4744 48.33C40.4744 50.0633 40.1538 51.5453 39.5124 52.776C38.8711 53.9893 37.9784 54.9167 36.8344 55.558C35.7078 56.1993 34.3904 56.52 32.8824 56.52C31.3918 56.52 30.0744 56.1993 28.9304 55.558C27.8038 54.9167 26.9198 53.9893 26.2784 52.776C25.6371 51.5453 25.3164 50.0633 25.3164 48.33C25.3164 46.5967 25.6284 45.1233 26.2524 43.91C26.8938 42.6967 27.7778 41.7693 28.9044 41.128C30.0484 40.4867 31.3658 40.166 32.8564 40.166ZM32.8824 42.714C31.4264 42.714 30.3171 43.1907 29.5544 44.144C28.8091 45.0973 28.4364 46.4927 28.4364 48.33C28.4364 50.1673 28.8091 51.5713 29.5544 52.542C30.3171 53.4953 31.4264 53.972 32.8824 53.972C34.3384 53.972 35.4478 53.4953 36.2104 52.542C36.9731 51.5713 37.3544 50.1673 37.3544 48.33C37.3544 46.4927 36.9731 45.0973 36.2104 44.144C35.4651 43.1907 34.3558 42.714 32.8824 42.714ZM41.8256 40.686H55.6836V45.886H53.0056V43.312H50.2756L50.2496 53.374H52.4596V56H44.9976V53.374H47.2076L47.2336 43.312H44.5036V45.886H41.8256V40.686ZM69.6682 40.686C71.6788 40.686 73.2128 41.1107 74.2702 41.96C75.3275 42.8093 75.8562 44.0487 75.8562 45.678C75.8562 47.342 75.3275 48.616 74.2702 49.5C73.2128 50.3667 71.6788 50.8 69.6682 50.8H68.0822V53.374H70.7082V56H62.8822V53.374H65.0662V43.312H62.8822V40.686H69.6682ZM69.6422 48.434C71.6875 48.434 72.7102 47.5413 72.7102 45.756C72.7102 44.1267 71.6875 43.312 69.6422 43.312H68.1082V48.434H69.6422ZM74.5283 56V53.374H77.1023L81.0283 43.312H78.8443V40.686H84.7463L89.5303 53.374H91.8703V56H85.1363V53.374H86.5143L85.7083 51.138H80.5343L79.7283 53.374H81.2363V56H74.5283ZM81.2883 49.084H85.0063L83.1863 43.65L81.2883 49.084ZM92.6162 40.686H100.572V43.312H98.1022V53.374H100.572V56H92.5902V53.374H95.1122V43.312H92.6162V40.686ZM109.3 40.686C111.865 40.686 113.867 41.388 115.306 42.792C116.744 44.196 117.464 46.1373 117.464 48.616C117.464 50.9387 116.762 52.75 115.358 54.05C113.954 55.35 112.004 56 109.508 56H102.176V53.374H104.386V43.312H102.176V40.686H109.3ZM109.04 53.374C110.773 53.374 112.082 52.9753 112.966 52.178C113.867 51.3807 114.318 50.202 114.318 48.642C114.318 46.8913 113.893 45.5653 113.044 44.664C112.194 43.7627 110.946 43.312 109.3 43.312H107.402V53.374H109.04Z" fill="#E40F1B" />
                        </svg>

                      )}
                    </div>
                  </div>


                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
