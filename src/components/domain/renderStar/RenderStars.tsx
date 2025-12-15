import { Star } from "lucide-react";

  export const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 justify-center mb-4">
        {[...Array(5)].map((_, index) => (
        <Star
              key={index}
              className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            />
        ))}
      </div>
    );
  };
