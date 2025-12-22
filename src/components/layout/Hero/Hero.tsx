"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { academicServiceApi } from "@/src/infrastructure/api/academicServiceApi";
import { Service } from "@/src/types/services/services";
import { useAuth } from "@/src/contexts/AuthContext";
import Link from "next/link";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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
    if (!isAuthenticated) {
      router.push("/auth/signup");
      return;
    }
    setShowSuccessPopup(true);
  };

  return (
    <div
      id="hero"
      className="min-h-screen"
      style={{
        backgroundImage: 'url("/hero.svg")',
        backgroundSize: "cover",
        backgroundPosition: "unset",
      }}
    >
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

      {/* Content */}
      <div className="container min-h-screen mx-auto pt-40 pb-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Images */}

        <div className="text-black">
          <h1 className="text-4xl font-bold leading-relaxed mb-4">
            نُلهم الباحثين… ونوجّههم نحو التميُّز الأكاديمي
          </h1>
          <p className="text-lg opacity-90 mb-6 text-[#71717A]">
            انضم إلى بوابة العلوم الإنسانية، حيث الإرشاد الأكاديمي والتدريب
            النوعي بأيدي خبراء معتمدين، لتمكينك من تطوير مهاراتك وتحقيق إنجازات
            أكاديمية تواكب المستقبل.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={handleButtonClick}
              className="rounded-lg px-9 py-4 bg-[#0B72B9] hover:bg-[#0B72B9]/90 text-white"
            >
              اطلب الخدمة الآن
            </Button>
            <Button
              onClick={handleButtonClick}
              className="px-9 py-4 rounded-lg bg-white text-[#0B72B9] border-2 border-white hover:bg-[#0B72B9] hover:text-white hover:border-[#0B72B9] transition-colors"
            >
              اطلب استشارة مجانية
            </Button>
          </div>

          {/* Search */}
          <div ref={searchRef} className="relative w-full max-w-sm">
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
              <Button className="bg-[#0B72B9] hover:bg-[#0B72B9]/90 text-white rounded-lg px-6">
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Image
              src="/imgs/hero-1.jpg"
              alt="students"
              width={270}
              height={350}
              className="rounded-2xl shadow-lg h-96 w-[300px] object-cover"
            />
            <Image
              src="/imgs/hero-2.jpg"
              alt="people"
              width={270}
              height={350}
              className="rounded-2xl shadow-lg h-96 w-[300px] object-cover relative top-24"
            />
          </div>
          <div className="bg-[#0B72B9] text-white p-4 rounded-xl shadow-md w-fit relative bottom-20 right-5">
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
                منصة نظامية إلكترونية
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
                تضمن أوراق رسمية للالتزام بالخدمات
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
