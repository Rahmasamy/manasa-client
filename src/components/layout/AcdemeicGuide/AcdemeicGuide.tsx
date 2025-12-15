import { Button } from "@/components/ui/button";
import { filters } from "@/src/lib/consts/filters/Filters";
import React from "react";
import ServiceCard from "../../domain/ServiceComponent/ServiceComponent";
import { services } from "@/src/lib/consts/services/services";

export default function AcdemeicGuide() {
  return (
    <div>
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-bold text-5xl p-5">
          الأرشاد الأكاديمي{" "}
        </h2>
        <p className="text-center text-white font-bold text-xl p-5">
          25 دورة/ 7 اقسام
        </p>
      </div>
      <div className="w-full px-24 py-10">
        <div className="flex gap-2 mt-4">
          {filters.map((filter, index) => (
            <Button
              key={filter + index}
              variant="outline"
              className="text-[#4a4f52] border-[#4a4f52] bg-white hover:bg-[#4a4f52] hover:text-white py-3 px-4"
            >
              {filter}
            </Button>
          ))}
          </div>
          <section className="container mx-auto px-4 py-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service}  />
              ))}
            </div>
          </section>
        
      </div>
    </div>
  );
}
