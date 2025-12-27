"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { academicServiceApi } from "@/src/infrastructure/api/academicServiceApi";
import { Service } from "@/src/types/services/services";
import { useAuth } from "@/src/contexts/AuthContext";
import Link from "next/link";
import RequestServiceModal from "../../domain/RequestServiceModal/RequestServiceModal";
import SuccessPopup from "../../domain/SuccessPopup/SuccessPopup";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Fetch all services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const categoriesResponse = await academicServiceApi.getAllCategories();

        // Store flattened services for search
        const services: Service[] = [];
        categoriesResponse.data.forEach((category) => {
          if (category.services && category.services.length > 0) {
            category.services.forEach((service: any) => {
              services.push({
                id: service.id,
                title: service.title,
                description: service.description || "",
                link_text: "أعرف المزيد",
                categoryId: category.id,
              });
            });
          }
        });

        setAllServices(services);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allServices.filter(
        (service) =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery, allServices]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceClick = (serviceId: string) => {
    router.push(`/acedemic/single/${serviceId}`);
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleButtonClick = () => {
    setShowFormModal(true);
  };

  return (
    <div
      id="hero"
      className="min-h-screen overflow-x-hidden w-full"
      style={{
        backgroundImage: 'url("/hero.svg")',
        backgroundSize: "cover",
        backgroundPosition: "unset",
      }}
    >
      {/* Service Request Form Modal */}
      <RequestServiceModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSuccess={() => setShowSuccessPopup(true)}
      />

      {/* Success Popup Modal */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      />

      {/* Content */}
      <div className="container min-h-screen mx-auto pt-20 sm:pt-32 md:pt-40 pb-10 sm:pb-16 md:pb-20 px-4 sm:px-8 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center overflow-x-hidden w-full max-w-full">
        {/* Left Images */}

        <div className="text-black">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-relaxed mb-3 sm:mb-4">
            نُلهم الباحثين… ونوجّههم نحو التميُّز الأكاديمي
          </h1>
          <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6 text-[#71717A]">
            انضم إلى بوابة العلوم الإنسانية، حيث الإرشاد الأكاديمي والتدريب
            النوعي بأيدي خبراء معتمدين، لتمكينك من تطوير مهاراتك وتحقيق إنجازات
            أكاديمية تواكب المستقبل.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleButtonClick();
              }}
              className="rounded-lg px-6 sm:px-9 py-3 sm:py-4 bg-[#0B72B9] hover:bg-[#0B72B9]/90 text-white text-sm sm:text-base font-medium transition-colors"
            >
              اطلب الخدمة الآن
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleButtonClick();
              }}
              className="px-6 sm:px-9 py-3 sm:py-4 rounded-lg bg-white text-[#0B72B9] border-2 border-white hover:bg-[#0B72B9] hover:text-white hover:border-[#0B72B9] transition-colors text-sm sm:text-base font-medium"
            >
              اطلب استشارة مجانية
            </button>
          </div>

          {/* Search */}
          <div ref={searchRef} className="relative w-full sm:max-w-sm">
            <div className="flex items-center gap-2 w-full bg-white rounded-lg">
              <input
                className="flex-1 outline-none text-gray-700 px-4 py-2 rounded-lg"
                placeholder="ابحث عما تريده هنا"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setShowDropdown(true);
                }}
              />
              <Button className="bg-[#0B72B9] hover:bg-[#0B72B9]/90 text-white rounded-lg px-4 sm:px-6 text-sm sm:text-base">
                بحث
              </Button>
            </div>

            {/* Search Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                {searchResults.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service.id!)}
                    className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {showDropdown &&
              searchQuery.trim().length > 0 &&
              searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                  <p className="text-gray-500 text-center">لا توجد نتائج</p>
                </div>
              )}
          </div>
        </div>
        <div className="hidden lg:flex flex-col gap-4 overflow-hidden w-full max-w-full">
          <div className="flex gap-4 w-full max-w-full overflow-hidden">
            <div className="flex-shrink-0">
              <Image
                src="/imgs/hero-1.jpg"
                alt="students"
                width={270}
                height={350}
                className="rounded-2xl shadow-lg h-96 w-full max-w-[270px] object-cover"
              />
            </div>
            <div className="flex-shrink-0 mt-24">
              <Image
                src="/imgs/hero-2.jpg"
                alt="people"
                width={270}
                height={350}
                className="rounded-2xl shadow-lg h-96 w-full max-w-[270px] object-cover"
              />
            </div>
          </div>
          <div className="bg-[#0B72B9] text-white p-4 rounded-xl shadow-md w-fit max-w-full -mt-20 mr-5">
            <ul className="space-y-2 text-sm ">
              <li className="flex gap-3 items-center">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#FCFCFC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                المنصة لها سجل تجاري
              </li>
              <li className="flex gap-3 items-center">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#FCFCFC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                المنصة مسجلة بوزارة الاستثمار السعودي
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
