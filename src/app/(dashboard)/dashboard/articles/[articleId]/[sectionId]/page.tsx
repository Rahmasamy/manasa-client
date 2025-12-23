"use client";
// import FileUpload from "@/src/components/dashboard/FileUpload";
// import ListInput from "@/src/components/dashboard/ListInput";
import SaveButton from "@/src/components/dashboard/SaveButton";
import SectionCard from "@/src/components/dashboard/SectionCard";
import SingleImageUpload from "@/src/components/dashboard/SingleImageUpload";
import TextField from "@/src/components/dashboard/TextField";
import { ServiceFormData } from "@/src/types/dashboard/analytics/anayltics";
import { useState } from "react";

export default function ArticleDetails() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ServiceFormData>({
    backgroundImage: null,
    mainTitle: "",
    mainSubtitle: "",
    aboutTitle: "",
    aboutDescription: "",
    aboutImage: null,
    detailsTitle: "",
    detailsDescription: "",
    detailsImage: null,
    advantages: [],
    downloadTitle: "",
    downloadDescription: "",
    downloadFiles: [],
  });

  const updateField = <K extends keyof ServiceFormData>(
    field: K,
    value: ServiceFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Service data saved:", formData);
    alert("تم الحفظ بنجاح!");
    setLoading(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-end mb-6">
       
        <button className="bg-transparent rounded-xl text-red-500 px-10 py-2 font-bold border border-red-500">
          حذف{" "}
        </button>
      </div>

      {/* Main Title Section */}
      <SectionCard title="اضافة مقالة " className="w-full">
        <div className="space-y-4">
          <TextField
            label=" عنوان المقالة  "
            placeholder="  عنوان المقالة  "
            value={"formData.mainTitle"}
            onChange={(value) => {}}
          />
          <TextField
            label="  أسم الكاتب"
            placeholder="  أسم الكاتب   "
            value={""}
            onChange={(value) => {}}
          />
          <TextField
            label="  الوصف "
            placeholder="  الوصف    "
            value={""}
            onChange={(value) => {}}
            rows={2}
          />
          <SingleImageUpload
            label="  صورة   المقالة "
            image={""}
            onChange={(image) => {}}
          />
        </div>
      </SectionCard>
      <SectionCard title="المحتوي  " className="w-full">
        <div className="space-y-4 w-full">
          <div className="w-full flex justify-end items-center my-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="8" fill="#FFDDD9" />
              <path
                d="M25 12V26C25 26.5304 24.7893 27.0391 24.4142 27.4142C24.0391 27.7893 23.5304 28 23 28H13C12.4696 28 11.9609 27.7893 11.5858 27.4142C11.2107 27.0391 11 26.5304 11 26V12"
                stroke="#E32929"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 12H27"
                stroke="#E32929"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 12V10C14 9.46957 14.2107 8.96086 14.5858 8.58579C14.9609 8.21071 15.4696 8 16 8H20C20.5304 8 21.0391 8.21071 21.4142 8.58579C21.7893 8.96086 22 9.46957 22 10V12"
                stroke="#E32929"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <TextField
            label=" عنوان الجزء   "
            placeholder="  عنوان الجزء   "
            value={"formData.mainTitle"}
            onChange={(value) => {}}
          />
          <TextField
            label="  وصف الجزء "
            placeholder="   وصف الجزء   "
            value={""}
            onChange={(value) => {}}
            rows={4}
          />
        </div>
      </SectionCard>

      {/* Save Button */}
      <div className="flex justify-end pt-4 gap-5">
        <SaveButton onClick={handleSave} loading={loading} />
      </div>
    </div>
  );
}
