"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { academicServiceApi } from "@/src/infrastructure/api/academicServiceApi";

interface CategoryWithServices {
  id: string;
  title: string;
  services: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

interface RequestServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  preselectedServiceId?: string;
  preselectedCategoryId?: string;
}

export default function RequestServiceModal({
  isOpen,
  onClose,
  onSuccess,
  preselectedServiceId,
  preselectedCategoryId,
}: RequestServiceModalProps) {
  const [serviceCategories, setServiceCategories] = useState<
    CategoryWithServices[]
  >([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    preselectedCategoryId || ""
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || ""
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsappCode: "+966",
    whatsappNumber: "",
    serviceId: "",
    request: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await academicServiceApi.getAllCategories();
        const categoriesWithServices: CategoryWithServices[] =
          categoriesResponse.data.map((category) => ({
            id: category.id,
            title: category.title,
            services: category.services || [],
          }));
        setServiceCategories(categoriesWithServices);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    if (isOpen) {
      fetchCategories();
      // Set preselected values if provided
      if (preselectedServiceId) {
        setSelectedServiceId(preselectedServiceId);
        setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
      }
      if (preselectedCategoryId) {
        setSelectedCategoryId(preselectedCategoryId);
      }
    }
  }, [isOpen, preselectedServiceId, preselectedCategoryId]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    setSelectedServiceId("");
    setFormData((prev) => ({ ...prev, serviceId: "" }));
    setFormError(null);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;
    setSelectedServiceId(serviceId);
    setFormData((prev) => ({ ...prev, serviceId }));
    setFormError(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, whatsappCode, whatsappNumber, serviceId, request } =
      formData;

    // Validation
    if (
      !whatsappNumber.trim() 
    ) {
      setFormError("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    try {
      setLoading(true);
      // TODO: Send form data to API endpoint
      // await academicServiceApi.submitServiceRequest(formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        whatsappCode: "+966",
        whatsappNumber: "",
        serviceId: "",
        request: "",
      });
      setSelectedCategoryId(preselectedCategoryId || "");
      setSelectedServiceId(preselectedServiceId || "");
      setFormError(null);

      // Close modal and trigger success callback
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  // Get filtered services based on selected category
  const filteredServices =
    serviceCategories.find((cat) => cat.id === selectedCategoryId)?.services ||
    [];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => {
        onClose();
        setFormError(null);
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 mx-4"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
            طلب خدمة
          </h3>
          <button
            onClick={() => {
              onClose();
              setFormError(null);
            }}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{formError}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="الإسم *"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0B72B9] focus:border-transparent"
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="البريد الإلكتروني *"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0B72B9] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <input
                name="whatsappNumber"
                type="tel"
                value={formData.whatsappNumber}
                onChange={handleFormChange}
                placeholder="رقم الواتس اب *"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0B72B9] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <select
                value={selectedCategoryId}
                onChange={handleCategoryChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0B72B9] focus:border-transparent bg-white"
              >
                <option value="">اختر الفئة *</option>
                {serviceCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedServiceId}
                onChange={handleServiceChange}
                disabled={!selectedCategoryId}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0B72B9] focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {selectedCategoryId ? "اختر الخدمة *" : "اختر فئة أولاً *"}
                </option>
                {filteredServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <textarea
              name="request"
              value={formData.request}
              onChange={handleFormChange}
              placeholder="طلبكم *"
              rows={4}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0B72B9] focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#0B72B9] hover:bg-[#0B72B9]/90 text-white rounded-lg py-2.5 text-sm sm:text-base font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "جاري الإرسال..." : "إرسال"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                onClose();
                setFormError(null);
              }}
              className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
