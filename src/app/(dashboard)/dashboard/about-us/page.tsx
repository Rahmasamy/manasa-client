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

export default function AboutUsPage() {
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
    <div className="max-w-4xl space-y-6">
      {/* Page Header */}
      {/* <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">عن الأكاديمية </h1>
              
            </div> */}

      {/* Background Image */}
      {/* <SectionCard title="صورة الخلفية">
                <SingleImageUpload
                    label="صورة الخلفية الرئيسية"
                    image={formData.backgroundImage}
                    onChange={(image) => updateField('backgroundImage', image)}
                />
            </SectionCard> */}

      {/* Main Title Section */}
      <SectionCard title="عن الأكاديمية ">
        <div className="space-y-4">
          <TextField
            label="من نحن"
            placeholder="التخطيط والتهيئة البحثية  "
            value={formData.mainTitle}
            onChange={(value) => updateField("mainTitle", value)}
          />
          <TextField
            label=" الرسالة"
            placeholder="الرسالة  "
            value={formData.mainSubtitle}
            onChange={(value) => updateField("mainSubtitle", value)}
          />
          <TextField
            label="الأهداف"

            placeholder="الأهداف"
            value={formData.mainSubtitle}
            onChange={(value) => updateField("mainSubtitle", value)}
          />
           <TextField
            label="سياسة الخصوصية"
            placeholder=" سياسة الخصوصية  "
            value={formData.downloadDescription}
            onChange={(value) => updateField("downloadDescription", value)}
            rows={3}
          />
           <TextField
            label="حقوق الملكية "
            placeholder=" حقوق الملكية   "
            value={formData.downloadDescription}
            onChange={(value) => updateField("downloadDescription", value)}
            rows={3}
          />
           <TextField
            label=" تحديث السياسات"
            placeholder=" سياسة الخصوصية  "
            value={formData.downloadDescription}
            onChange={(value) => updateField("downloadDescription", value)}
            rows={3}
          />
           <TextField
            label="ختاما "
            placeholder=" ختاما   "
            value={formData.downloadDescription}
            onChange={(value) => updateField("downloadDescription", value)}
            rows={3}
          />
        </div>
      </SectionCard>

      {/* About Service Section */}
      <SectionCard title="القيم ">
        <div className="space-y-4">
          <TextField
            label="عنوان "
            placeholder="أدخل عنوان القسم"
            value={formData.aboutTitle}
            onChange={(value) => updateField("aboutTitle", value)}
          />
          <TextField
            label="المحتوي"
            placeholder="أدخل  المحتوي"
            value={formData.aboutDescription}
            onChange={(value) => updateField("aboutDescription", value)}
            rows={4}
          />
           <ListInput
          label="قائمة القيم"
          items={formData.advantages}
          onChange={(items) => updateField("advantages", items)}
          placeholder="اضافة قيم جديدة   "
        />
          {/* <SingleImageUpload
            label="صورة القسم"
            image={formData.aboutImage}
            onChange={(image) => updateField("aboutImage", image)}
          /> */}
        </div>
      </SectionCard>

      {/* Service Details Section */}
      <SectionCard title="سياسة الخصوصية ">
        <div className="space-y-4">
          <TextField
            label="من نحن "
            placeholder="  من نحن"
            value={formData.detailsTitle}
            onChange={(value) => updateField("detailsTitle", value)}
          />
          <TextField
            label="الرسالة "
            placeholder="أدخل وصف الرسالة"
            value={formData.detailsDescription}
            onChange={(value) => updateField("detailsDescription", value)}
            rows={4}
          />
           <TextField
            label="الأهداف "
            placeholder="أدخل وصف الأهداف"
            value={formData.detailsDescription}
            onChange={(value) => updateField("detailsDescription", value)}
            rows={4}
          />
       
        </div>
      </SectionCard>

      



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
