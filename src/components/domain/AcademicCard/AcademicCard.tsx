import { AcademicPayload } from "@/src/types/ElectronicLibrary/AcademicPayload";
import Image from "next/image";
import React from "react";

export default function AcademicCard({
  image,
  title,
  description,
  date,
  writenBy,
  buttonText,
  onButtonClick,
}: AcademicPayload) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-xl hover:border-[#2885AC]/20 transition-all duration-300">
      {/* Image Container */}
      <div 
        onClick={onButtonClick}
        className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center overflow-hidden relative group cursor-pointer"
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            width={100}
            height={100}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-400 text-sm">277 Hug × 24 Hug</div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-3 text-right leading-relaxed">
          {title}
        </h3>
        <div className="icon flex gap-3 items-center">
          <div className="flex gap-2 items-center p-2">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33337 1.33301V3.99967"
                  stroke="#27272A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6666 1.33301V3.99967"
                  stroke="#27272A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.6667 2.66699H3.33333C2.59695 2.66699 2 3.26395 2 4.00033V13.3337C2 14.07 2.59695 14.667 3.33333 14.667H12.6667C13.403 14.667 14 14.07 14 13.3337V4.00033C14 3.26395 13.403 2.66699 12.6667 2.66699Z"
                  stroke="#27272A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 6.66699H14"
                  stroke="#27272A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {date}
          </div>
          {/* <div className="flex gap-2 items-center p-2">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99996 8.66667C9.84091 8.66667 11.3333 7.17428 11.3333 5.33333C11.3333 3.49238 9.84091 2 7.99996 2C6.15901 2 4.66663 3.49238 4.66663 5.33333C4.66663 7.17428 6.15901 8.66667 7.99996 8.66667Z"
                  stroke="#27272A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3333 14.0003C13.3333 12.5858 12.7714 11.2293 11.7712 10.2291C10.771 9.2289 9.41445 8.66699 7.99996 8.66699C6.58547 8.66699 5.22892 9.2289 4.22872 10.2291C3.22853 11.2293 2.66663 12.5858 2.66663 14.0003"
                  stroke="#27272A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {writenBy}
          </div> */}
        </div>
        <p className="text-sm text-gray-500 mb-4 text-justify flex-1 leading-relaxed">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <button
            onClick={onButtonClick}
            className="bg-[#2885AC] hover:bg-[#2885AC]/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
