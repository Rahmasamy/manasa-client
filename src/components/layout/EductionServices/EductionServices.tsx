"use client";
import React, { useEffect, useState } from "react";
import WrapperComponent from "../../domain/WrapperComponent/WrapperComponent";
import { Button } from "@/components/ui/button";
import ServiceCard from "../../domain/ServiceComponent/ServiceComponent";
import {
  academicServiceApi,
  ApiAcademicCategory,
} from "@/src/infrastructure/api/academicServiceApi";
import { Service } from "@/src/types/services/services";

export default function EductionServices() {
  const [categories, setCategories] = useState<ApiAcademicCategory[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [displayedServices, setDisplayedServices] = useState<Service[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const DISPLAY_LIMIT = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories which include services nested inside
        const categoriesResponse = await academicServiceApi.getAllCategories();
        // Reverse the order so the last category appears first
        setCategories([...categoriesResponse.data].reverse());

        // Extract all services from categories
        // Categories endpoint returns services with limited fields: id, title, description, createdAt
        const services: Service[] = [];
        categoriesResponse.data.forEach((category) => {
          if (category.services && category.services.length > 0) {
            category.services.forEach((service: any) => {
              // Map the service with category info
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
        setDisplayedServices(services);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("فشل تحميل الخدمات. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prefetch data on component mount for faster subsequent loads
  useEffect(() => {
    // Prefetch categories API endpoint
    const prefetchCategories = async () => {
      try {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = "https://edu-3nj8.onrender.com/api/academic/categories";
        link.as = "fetch";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      } catch (err) {
        // Silently fail prefetching
      }
    };
    prefetchCategories();
  }, []);

  useEffect(() => {
    // Filter services based on selected category
    if (selectedCategoryId) {
      const filtered = allServices.filter(
        (service) => service.categoryId === selectedCategoryId
      );
      setDisplayedServices(filtered);
    } else {
      setDisplayedServices(allServices);
    }
    // Reset showAll when filter changes
    setShowAll(false);
  }, [selectedCategoryId, allServices]);

  const handleFilterClick = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  if (loading) {
    return (
      <div className="bg-[#D6ECF5] px-4 sm:px-8 lg:px-24 py-8 sm:py-10">
        <WrapperComponent
          order={"اولا"}
          title={"خدمات الأرشاد الأكاديمي"}
          knowMore="المزيد"
          knowMoreLink="/acedemic"
        />
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#D6ECF5] px-4 sm:px-8 lg:px-24 py-8 sm:py-10">
        <WrapperComponent
          order={"اولا"}
          title={"خدمات الأرشاد الأكاديمي"}
          knowMore="المزيد"
          knowMoreLink="/acedemic"
        />
        <div className="flex justify-center items-center py-20">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#D6ECF5] px-4 sm:px-8 lg:px-24 py-8 sm:py-10">
      <WrapperComponent
        order={"اولا"}
        title={"خدمات الأرشاد الأكاديمي"}
        knowMore="المزيد"
        knowMoreLink="/acedemic"
      />
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory">
        <div className="flex gap-2 min-w-max">
          <Button
            onClick={() => handleFilterClick(null)}
            className={`text-[#4a4f52] border-[#4a4f52] bg-white hover:bg-[#4a4f52] hover:text-white py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base whitespace-nowrap snap-start ${
              selectedCategoryId === null ? "bg-[#4a4f52] text-white" : ""
            }`}
          >
            الكل
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleFilterClick(category.id)}
              className={`text-[#4a4f52] border-[#4a4f52] bg-white hover:bg-[#4a4f52] hover:text-white py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base whitespace-nowrap snap-start ${
                selectedCategoryId === category.id
                  ? "bg-[#4a4f52] text-white"
                  : ""
              }`}
            >
              {category.title}
            </Button>
          ))}
        </div>
      </div>
      <section className="container mx-auto px-4 py-9">
        {displayedServices.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600">لا توجد خدمات متاحة</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {(showAll
                ? displayedServices
                : displayedServices.slice(0, DISPLAY_LIMIT)
              ).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            {displayedServices.length > DISPLAY_LIMIT && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  className="text-[#2885AC] border-2 border-[#2885AC] bg-white hover:bg-[#2885AC] hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  {showAll ? "عرض أقل" : "عرض المزيد"}
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
