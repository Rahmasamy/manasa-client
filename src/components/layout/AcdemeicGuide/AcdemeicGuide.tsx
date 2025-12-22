"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ServiceCard from "../../domain/ServiceComponent/ServiceComponent";
import {
  academicServiceApi,
  ApiAcademicCategory,
} from "@/src/infrastructure/api/academicServiceApi";
import { Service } from "@/src/types/services/services";

export default function AcdemeicGuide() {
  const [categories, setCategories] = useState<ApiAcademicCategory[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [displayedServices, setDisplayedServices] = useState<Service[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories which include services
        const categoriesResponse = await academicServiceApi.getAllCategories();
        setCategories(categoriesResponse.data);

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
        console.error("Error fetching academic data:", err);
        setError("فشل تحميل البيانات. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
  }, [selectedCategoryId, allServices]);

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  // Calculate total counts
  const totalServices = allServices.length;
  const totalCategories = categories.length;

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

  if (error) {
    return (
      <div>
        <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
          <h2 className="text-center text-white font-bold text-5xl p-5">
            الأرشاد الأكاديمي
          </h2>
          <p className="text-center text-white font-bold text-xl p-5">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-bold text-5xl p-5">
          الأرشاد الأكاديمي
        </h2>
        <p className="text-center text-white font-bold text-xl p-5">
          {totalServices} خدمة / {totalCategories} أقسام
        </p>
      </div>
      <div className="w-full px-24 py-10">
        <div className="flex gap-2 mt-4 flex-wrap">
          <Button
            onClick={() => handleCategoryClick(null)}
            className={`text-[#4a4f52] border-[#4a4f52] bg-white hover:bg-[#4a4f52] hover:text-white py-3 px-4 ${
              selectedCategoryId === null ? "bg-[#4a4f52] text-white" : ""
            }`}
          >
            الكل
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`text-[#4a4f52] border-[#4a4f52] bg-white hover:bg-[#4a4f52] hover:text-white py-3 px-4 ${
                selectedCategoryId === category.id
                  ? "bg-[#4a4f52] text-white"
                  : ""
              }`}
            >
              {category.title}
            </Button>
          ))}
        </div>
        <section className="container mx-auto px-4 py-9">
          {displayedServices.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-gray-600">لا توجد خدمات متاحة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
