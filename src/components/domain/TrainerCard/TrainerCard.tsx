import Image from "next/image";
import React from "react";

export interface TrainerCardProps {
  image: string;
  name: string;
  title: string;
  description: string;
}

const TrainerCard: React.FC<TrainerCardProps> = ({
  image,
  name,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-center border border-gray-100 hover:shadow-xl hover:border-[#2885AC]/30 transition-all duration-300 hover:-translate-y-1">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2885AC] to-[#39A975] rounded-full blur-md opacity-20"></div>
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="w-28 h-28 rounded-full object-cover relative z-10 ring-4 ring-white shadow-lg"
        />
      </div>
      <h2 className="font-bold text-lg text-gray-800 mb-1">{name}</h2>
      <p className="text-[#2885AC] font-semibold text-sm mb-2">{title}</p>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default TrainerCard;
