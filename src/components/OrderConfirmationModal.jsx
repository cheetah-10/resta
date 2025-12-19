export default function OrderConfirmationModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[20px] p-12 max-w-md w-full mx-4 relative shadow-2xl transform animate-in fade-in zoom-in">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="size-20 rounded-full bg-[#4c8900] flex items-center justify-center">
            <svg className="size-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="font-['Cyntho_Next:SemiBold',sans-serif] text-[32px] text-black text-center mb-4">
          Order Placed Successfully!
        </h2>
        
        <p className="font-['Cyntho_Next:Regular',sans-serif] text-[18px] text-[rgba(0,0,0,0.7)] text-center mb-8">
          Thank you for your order. You can track your order status in the order history.
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full rounded-[10px] border-[#ffbb15] border-[3px] border-solid overflow-clip px-[50px] py-[13px] hover:bg-[#ffbb15] transition-colors"
        >
          <p className="font-['Cyntho_Next:Medium',sans-serif] leading-[normal] text-[20px] text-black text-nowrap">
            View Order History
          </p>
        </button>
      </div>
    </div>
  );
}
