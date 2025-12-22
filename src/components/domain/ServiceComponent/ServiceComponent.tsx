import { Service } from "@/src/types/services/services";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const serviceDetailUrl = service.id 
    ? `/acedemic/single/${service.id}` 
    : "#";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-[#2885AC]/30">
      {/* Header */}
      <div className="p-5 bg-white">
        <div className="w-14 h-14 bg-[#2885AC]/10 rounded-xl mb-4 flex items-center justify-center">
          <div className="w-8 h-8 bg-[#2885AC] rounded-lg"></div>
        </div>
        <h3 className="text-xl font-bold leading-relaxed text-gray-800">
          {service.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <p className="text-gray-600 leading-relaxed text-sm">
          {service.description}
        </p>
        
        {/* Link Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href={serviceDetailUrl}
            className="inline-flex items-center gap-2 text-[#2885AC] font-semibold hover:text-[#2885AC]/80 transition-colors group"
          >
            {service.link_text}
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;