'use client'
import svgPaths from "../../../imports/svg";
// import { useRouter } from 'next/router';


const orderHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/order', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
     return res.data.data
    } catch (error) {
      console.log(error);
    }
  };

export default function OrderHistoryPage() {

//  const router = useRouter()

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ffbb15';
      case 'accepted': return '#4c8900';
      case 'cancelled': return '#ec362b';
      case 'completed': return '#1249ff';
      default: return '#ffbb15';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getPaidStatus = (status) => {
    return status === 'accepted' || status === 'completed';
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      {/* Header/Title Bar */}
      <div className="bg-white w-full py-8 border-b border-gray-200">
        <div className="max-w-[1520px] mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="font-['Cyntho_Next:SemiBold',sans-serif] text-[32px] text-black">
              Order History
            </h1>
            <button 
            //   onClick={() => router('/') }
              className="font-['Cyntho_Next:Regular',sans-serif] text-[20px] text-[#ffbb15] hover:underline"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white w-full max-w-[1520px] mx-auto px-4 py-16">
        {orderHistory.length === 0 ? (
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
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-[20px] overflow-clip">
                {/* Order Header */}
                <div className="p-8 border-b border-[rgba(0,0,0,0.2)]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[28px] text-black mb-2">
                        Order# {order.orderNumber}
                      </p>
                      <p className="font-['Cyntho_Next:Regular',sans-serif] text-[18px] text-[rgba(0,0,0,0.5)]">
                        {new Date(order.date).toLocaleDateString()}
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
                        {order.supplier}
                      </p>
                      <p className="font-['Cyntho_Next:Medium',sans-serif] text-[20px] text-[rgba(236,54,43,0.5)] mb-4">
                        Restaurant
                      </p>

                      <div className="flex items-center gap-2 mb-6">
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
                          {order.location}
                        </p>
                      </div>

                      <p className="font-['Cyntho_Next:Bold',sans-serif] text-[22px] text-[#ec362b]">
                        SAR {order.total}
                      </p>
                    </div>

                    {/* Payment Status Badge */}
                    <div className="flex items-center justify-center">
                      {getPaidStatus(order.status) ? (
                        <div className="relative">
                          <div className="size-[100px] rounded-full" style={{ backgroundColor: '#4c8900' }}>
                            <svg className="size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
                              <path d="M100 50C100 77.614 77.614 100 50 100C22.386 100 0 77.614 0 50C0 22.386 22.386 0 50 0C77.614 0 100 22.386 100 50Z" fill="#4C8900" />
                            </svg>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[88px] rounded-full" style={{ backgroundColor: '#4c8900' }}>
                            <svg className="size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 88">
                              <path d="M88 44C88 68.3005 68.3005 88 44 88C19.6995 88 0 68.3005 0 44C0 19.6995 19.6995 0 44 0C68.3005 0 88 19.6995 88 44Z" fill="#4C8900" />
                            </svg>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-[#4c8900] border h-[26px] w-[124px]" />
                          
                          {/* "PAID" text */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Podkova:Bold',sans-serif] font-bold text-[#4c8900] text-[26px] tracking-[5.98px]">
                            PAID
                          </div>
                          
                          {/* Decorative lines and dots */}
                          {[...Array(5)].map((_, i) => (
                            <div key={i}>
                              <div className="absolute h-0 w-[48px] border-t-[1px] border-[#4c8900]" style={{ left: '26px', top: i % 2 === 0 ? '31px' : '62px' }} />
                              <div className="absolute h-0 w-[38px] border-t-[1px] border-[#4c8900]" style={{ left: '31px', top: i % 2 === 0 ? '29px' : '64px' }} />
                            </div>
                          ))}
                          {[...Array(10)].map((_, i) => (
                            <div key={i} className="absolute size-[3px] rounded-full bg-[#4c8900]" style={{ 
                              left: `${30 + (i * 4)}px`, 
                              top: i % 2 === 0 ? '27px' : '69px' 
                            }} />
                          ))}
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="size-[100px] rounded-full" style={{ backgroundColor: '#e40f1b' }}>
                            <svg className="size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
                              <path d="M100 50C100 77.614 77.614 100 50 100C22.386 100 0 77.614 0 50C0 22.386 22.386 0 50 0C77.614 0 100 22.386 100 50Z" fill="#E40F1B" />
                            </svg>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[88px] rounded-full" style={{ backgroundColor: '#e40f1b' }}>
                            <svg className="size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 88">
                              <path d="M88 44C88 68.3005 68.3005 88 44 88C19.6995 88 0 68.3005 0 44C0 19.6995 19.6995 0 44 0C68.3005 0 88 19.6995 88 44Z" fill="#E40F1B" />
                            </svg>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-[#e40f1b] border h-[26px] w-[124px]" />
                          
                          {/* "NOT PAID" text */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Podkova:Bold',sans-serif] font-bold text-[#e40f1b] text-[26px] tracking-[-0.52px]">
                            NOT PAID
                          </div>
                          
                          {/* Decorative lines and dots */}
                          {[...Array(5)].map((_, i) => (
                            <div key={i}>
                              <div className="absolute h-0 w-[48px] border-t-[1px] border-[#e40f1b]" style={{ left: '26px', top: i % 2 === 0 ? '31px' : '62px' }} />
                              <div className="absolute h-0 w-[38px] border-t-[1px] border-[#e40f1b]" style={{ left: '31px', top: i % 2 === 0 ? '29px' : '64px' }} />
                            </div>
                          ))}
                          {[...Array(10)].map((_, i) => (
                            <div key={i} className="absolute size-[3px] rounded-full bg-[#e40f1b]" style={{ 
                              left: `${30 + (i * 4)}px`, 
                              top: i % 2 === 0 ? '27px' : '69px' 
                            }} />
                          ))}
                        </div>
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
