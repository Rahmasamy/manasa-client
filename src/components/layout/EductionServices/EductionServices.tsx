import React from "react";
import WrapperComponent from "../../domain/WrapperComponent/WrapperComponent";
import { filters } from "@/src/lib/consts/filters/Filters";
import { Button } from "@/components/ui/button";
import { services } from "@/src/lib/consts/services/services";
import ServiceCard from "../../domain/ServiceComponent/ServiceComponent";

export default function EductionServices() {
  return (
    <div className="bg-[#D6ECF5] px-24 py-10">
      <WrapperComponent
        order={"اولا"}
        title={"خدمات الأرشاد الأكاديمي"}
        knowMore="المزيد"
      />
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
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </section>
      
    </div>
  );
}
