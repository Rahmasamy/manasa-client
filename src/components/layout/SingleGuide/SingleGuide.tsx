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

  if (loading) {
    return (
      <div>
        <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
          <h2 className="text-center text-white font-bold text-5xl p-5">
            الأرشاد الأكاديمي
          </h2>
          <p className="text-center text-white font-bold text-xl p-5">
            جاري التحميل...
          </p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div>
        <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
          <h2 className="text-center text-white font-bold text-5xl p-5">
            الأرشاد الأكاديمي
          </h2>
          <p className="text-center text-white font-bold text-xl p-5">
            {error || "الخدمة غير موجودة"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div className="w-20 h-20 bg-[#39A975]/10 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[#39A975]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Success Message */}
            <div className="text-center space-y-3">
              <p className="text-gray-800 font-semibold text-lg leading-relaxed">
                سيتم التواصل معك بخصوص طلبك في أقرب وقت
              </p>
              <p className="text-[#2885AC] font-bold text-xl">
                شكراً لاختيارك HSP
              </p>
            </div>

            {/* Close Button */}
            <Button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-[#2885AC] text-white hover:bg-[#2885AC]/90 px-8 py-2 rounded-md transition-colors"
            >
              موافق
            </Button>
          </div>
        </div>
      )}

      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-bold text-5xl p-5">
          الأرشاد الأكاديمي
        </h2>
        <p className="text-center text-white font-bold text-xl p-5">
          {service.category?.title || "خدمة أكاديمية"}
        </p>
      </div>
      <div className="w-full px-24 py-10">
        <div className="flex flex-col gap-6 mt-4">
          <h1 className="font-bold text-2xl text-gray-900">{service.title}</h1>
          <p className="text-gray-600 font-medium p-2 text-lg leading-relaxed">
            {service.description}
          </p>
        </div>
        <div className="w-full flex justify-start items-center mt-6">
          <Button
            onClick={() => {
              if (!isAuthenticated) {
                router.push("/auth/signup");
                return;
              }
              setShowSuccessPopup(true);
            }}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2885AC] disabled:pointer-events-none disabled:opacity-50 bg-[#2885AC] text-white shadow-lg hover:bg-[#2885AC]/90 hover:shadow-xl transition-all duration-200 px-8 py-4"
          >
            اطلب الخدمة
          </Button>
        </div>
        {relatedServices.length > 0 && (
          <section className="container mx-auto px-4 py-9">
            <h1 className="font-bold text-xl">
              خدمات أخرى في {service.category?.title || "نفس القسم"}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
