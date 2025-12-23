"use client";
// import FileUpload from "@/src/components/dashboard/FileUpload";
// import ListInput from "@/src/components/dashboard/ListInput";
import SaveButton from "@/src/components/dashboard/SaveButton";
import SectionCard from "@/src/components/dashboard/SectionCard";
import SingleImageUpload from "@/src/components/dashboard/SingleImageUpload";
import TextField from "@/src/components/dashboard/TextField";
import { ServiceFormData } from "@/src/types/dashboard/analytics/anayltics";
import { useState } from "react";

export default function ServiceDetails() {
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          التخطيط والتهيئة البحثية
        </h1>
        <button className="bg-transparent rounded-xl text-red-500 px-10 py-2 font-bold border border-red-500">
          حذف{" "}
        </button>
      </div>

      {/* Main Title Section */}
      <SectionCard title="عن الخدمة ">
        <div className="space-y-4">
          <TextField
            label="عنوان الخدمة "
            placeholder="التخطيط والتهيئة البحثية  "
            value={formData.mainTitle}
            onChange={(value) => updateField("mainTitle", value)}
          />
          <TextField
            label=" وصف الخدمة"
            placeholder=" وصف الخدمة   "
            value={formData.downloadDescription}
            onChange={(value) => updateField("downloadDescription", value)}
            rows={4}
          />
          <SingleImageUpload
            label="  صورة الأيقون"
            image={formData.backgroundImage}
            onChange={(image) => updateField("backgroundImage", image)}
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
