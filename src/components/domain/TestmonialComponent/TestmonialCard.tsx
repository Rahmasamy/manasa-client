import { Testimonial } from "@/src/types/testmonial/testmonial";
import Image from "next/image";
import { renderStars } from "../renderStar/RenderStars";

export const TestimonialCard: React.FC<Testimonial > = ({
  name,
  title,
  image,
  rating,
  text
}) => {
  

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-full hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#2885AC]/20 hover:-translate-y-1">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2885AC] to-[#39A975] rounded-full blur-lg opacity-20"></div>
          <div className="w-20 h-20 rounded-full overflow-hidden relative z-10 ring-4 ring-[#2885AC]/10">
            <Image
              src={image}
              alt={name}
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {name}
        </h3>
        <p className="text-[#2885AC] font-semibold text-sm">
          {title}
        </p>
      </div>

      {/* Stars */}
      <div className="flex justify-center mb-4">
        {renderStars(rating)}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 text-center leading-relaxed text-sm">
        {text}
      </p>
    </div>
  );
};
