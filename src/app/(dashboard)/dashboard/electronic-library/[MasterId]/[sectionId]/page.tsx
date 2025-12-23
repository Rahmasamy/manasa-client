"use client";
import FileUpload from "@/src/components/dashboard/FileUpload";
import ListInput from "@/src/components/dashboard/ListInput";
import SaveButton from "@/src/components/dashboard/SaveButton";
import SectionCard from "@/src/components/dashboard/SectionCard";
import SingleImageUpload from "@/src/components/dashboard/SingleImageUpload";
import TextField from "@/src/components/dashboard/TextField";
import { ServiceFormData } from "@/src/types/dashboard/analytics/anayltics";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SectionDetailsPage() {
  const router = useRouter();
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
    <div className=" space-y-6">
      {/* Main Title Section */}
      <form onSubmit={handleSave} className="px-2 space-y-4 overflow-y-auto">
        <SectionCard title="اضافة موضوع ">
          <div className="space-y-4">
            <TextField
              label=" أسم الموضوع "
              placeholder="التخطيط والتهيئة البحثية  "
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
              label="  صورة  الموضوع "
              image={""}
              onChange={(image) => {}}
            />
          </div>
        </SectionCard>

        {/* Actions */}
      </form>

      {/* Save Button */}
      <div className="flex justify-end pt-4 gap-5">
        <SaveButton onClick={handleSave} loading={loading} />
        <button className="bg-white rounded-xl text-[#2885AC] px-10 py-2 font-bold border border-[#2885AC]">
          الغاء
        </button>
      </div>
    </div>
  );
}
