
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
}

export default function HeaderBanner({
  title,
  services,
  viewCount = 5412,

}: HeaderBannerProps) {
  return (
    <div className="relative w-full min-h-[500px] bg-gradient-to-br from-[#39A975] to-[#2885AC] overflow-hidden">
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
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
          {/* Left side - Title and Services */}
          <div className="flex-1 lg:max-w-2xl">
            {/* View count */}
            <div className="flex items-center gap-2 mb-6 text-white/80">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{viewCount}</span>
            </div>

            {/* Title */}
            <div className="mt-14 w-full">

           <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-8 mt-5 leading-tight">
              {title}
            </h1>
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

