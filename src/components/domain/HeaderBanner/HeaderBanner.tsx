
'use client'
import Image from "next/image";
import ServiceListItem from "../ServiceListItem/ServiceListItem";
import { Eye } from "lucide-react";

interface HeaderBannerProps {
  title: string;
  services: string[];
  viewCount?: number;
  backgroundImage?: string;
  foregroundImage?: string;
  direction?: "rtl" | "ltr";
}

export default function HeaderBanner({
  title,
  services,
  viewCount = 5412,
  direction = "rtl",
}: HeaderBannerProps) {
  return (
    <div className="relative w-full min-h-[500px] bg-gradient-to-br from-[#39A975] to-[#2885AC] overflow-hidden" dir={direction}>
      {/* Blurred background image */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-cover bg-center blur-sm">
            <div className="w-full">
              <Image
              src={"/imgs/academic-guide.jpg"}
              width={100}
              height={100}
              alt="cover image"
              className="w-full object-cover"
              />

             
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className={`  w-full flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 ${
          direction === "ltr" ? "lg:flex-row-reverse" : ""
        }`}>
          {/* Left side - Title and Services */}
          <div className={`flex-1 w-full  ${
            direction === "ltr" ? "text-left" : "text-right"
          }`}>
            {/* View count */}
            {/* <div className="flex items-center gap-2 mb-6 text-white/80">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{viewCount}</span>
            </div> */}

            {/* Title in Decorative Box */}
            <div className="mt-14 w-full flex justify-center mb-8">
              <div className="border-2 border-white rounded-xl bg-white/95 shadow-xl px-6 py-4 sm:px-8 sm:py-6 md:px-10 md:py-6 lg:px-12 lg:py-8 backdrop-blur-sm max-w-4xl">
                <h1 className="text-[#2885AC] font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight text-center">
                  {title}
                </h1>
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-2">
               
              {services.map((service, index) => (
                <ServiceListItem key={index} text={service} />
              ))}
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}

