export default function StarRating({ rating }) {
  return (
    <div className="flex gap-2">
      {[1,2,3,4,5].map((star) => (
        <svg
          key={star}
          className="w-8 h-8"   // حجم النجمة
          viewBox="0 0 24 24"
          fill={rating >= star ? "#FFBB15" : "#CCCCCC"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l2.92 5.91 6.52.95-4.72 4.6 1.11 6.49L12 16.9l-5.83 3.05 1.11-6.49-4.72-4.6 6.52-.95L12 2z"/>
        </svg>
      ))}
    </div>
  );
}
