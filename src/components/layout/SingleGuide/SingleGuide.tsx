"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ServiceCard from "../../domain/ServiceComponent/ServiceComponent";
import { Button } from "@/components/ui/button";
import {
  academicServiceApi,
  ApiAcademicService,
} from "@/src/infrastructure/api/academicServiceApi";
import { Service } from "@/src/types/services/services";
import { useAuth } from "@/src/contexts/AuthContext";
import RequestServiceModal from "../../domain/RequestServiceModal/RequestServiceModal";
import SuccessPopup from "../../domain/SuccessPopup/SuccessPopup";
import ConsultationPopup from "../../domain/ConsultationPopup/ConsultationPopup";
import ShareButton from "../../domain/ShareButton/ShareButton";

export default function SingleGuide() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.id as string;
  const { isAuthenticated } = useAuth();

  const [service, setService] = useState<ApiAcademicService | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConsultationPopup, setShowConsultationPopup] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      if (!serviceId) {
        setError("معرف الخدمة غير موجود");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch the service by ID
        const serviceResponse = await academicServiceApi.getServiceById(
          serviceId
        );
        setService(serviceResponse.data);

        // Fetch related services from the same category
        if (serviceResponse.data.categoryId) {
          const relatedResponse =
            await academicServiceApi.getServicesByCategoryId(
              serviceResponse.data.categoryId
            );

          // Filter out the current service and map to Service type
          const related = relatedResponse.data
            .filter((s) => s.id !== serviceId)
            .map((s) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              link_text: "أعرف المزيد",
              categoryId: s.categoryId,
            }));

          setRelatedServices(related);
        }
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("فشل تحميل الخدمة. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleConsultationClick = () => {
    const phoneNumber = "+966557818234";
    const message = "مرحباً، أود الاستفسار عن خدماتكم";
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailRedirect = () => {
    window.location.href = "mailto:order@hspportal.com";
  };

  if (loading) {
    return (
      <div>
        <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center px-4">
          <h2 className="text-center text-white font-bold text-3xl sm:text-4xl md:text-5xl p-3 sm:p-4 md:p-5">
            الأرشاد الأكاديمي
          </h2>
          <p className="text-center text-white font-bold text-base sm:text-lg md:text-xl p-3 sm:p-4 md:p-5">
            جاري التحميل...
          </p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div>
        <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center px-4">
          <h2 className="text-center text-white font-bold text-3xl sm:text-4xl md:text-5xl p-3 sm:p-4 md:p-5">
            الأرشاد الأكاديمي
          </h2>
          <p className="text-center text-white font-bold text-base sm:text-lg md:text-xl p-3 sm:p-4 md:p-5">
            {error || "الخدمة غير موجودة"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Service Request Form Modal */}
      <RequestServiceModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSuccess={() => setShowSuccessPopup(true)}
        preselectedServiceId={service?.id}
        preselectedCategoryId={service?.categoryId}
      />

      {/* Success Popup Modal */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      />

      {/* Consultation Popup Modal */}
      <ConsultationPopup
        isOpen={showConsultationPopup}
        onClose={() => setShowConsultationPopup(false)}
        onRedirect={handleEmailRedirect}
      />

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center px-4">
        <h2 className="text-center text-white font-bold text-3xl sm:text-4xl md:text-5xl p-3 sm:p-4 md:p-5">
          الأرشاد الأكاديمي
        </h2>
        <p className="text-center text-white font-bold text-base sm:text-lg md:text-xl p-3 sm:p-4 md:p-5">
          {service.category?.title || "خدمة أكاديمية"}
        </p>
      </div>

      {/* Content Section */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-8 md:py-10">
        {/* Service Details */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 mt-2 sm:mt-3 md:mt-4">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900">
            {service.title}
          </h1>
          <p className="text-gray-600 font-medium p-2 text-sm sm:text-base md:text-lg leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row justify-start items-stretch sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowFormModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base sm:text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2885AC] disabled:pointer-events-none disabled:opacity-50 bg-[#0B72B9] text-white shadow-lg hover:bg-[#0B72B9]/90 hover:shadow-xl transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4"
          >
            اطلب الخدمة الآن
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleConsultationClick();
            }}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base sm:text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B72B9] disabled:pointer-events-none disabled:opacity-50 border-2 border-[#0B72B9] text-[#0B72B9] hover:bg-[#0B72B9] hover:text-white transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 bg-white"
          >
            إستشارة مجانية عبر الواتساب
          </button>
        </div>

        {/* Share Button */}
        <div className="mt-4 sm:mt-5 md:mt-6">
          <ShareButton
            title={`خدمة: ${service.title}`}
            url={window.location.href}
          />
        </div>

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <section className="mx-auto px-0 py-6 sm:py-8 md:py-9 mt-4 sm:mt-6">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
              خدمات أخرى في {service.category?.title || "نفس القسم"}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {relatedServices.map((relatedService) => (
                <ServiceCard key={relatedService.id} service={relatedService} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
