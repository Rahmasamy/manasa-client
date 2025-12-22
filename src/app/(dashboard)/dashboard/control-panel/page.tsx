"use client";
import List from "@/components/ui/List";
import React, { useState } from "react";

export default function ControlPanel() {
  const [toggles, setToggles] = useState({
    mainPage: false,
    academicGuidance: false,
    trainingCourses: false,
    comments: false,
    rumors: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log("Settings saved:", toggles);
    alert("تم الحفظ بنجاح");
  };

  return (
    <main className="flex-1 p-2">
      <div className="w-[100%] flex flex-col mx-auto justify-start items-start">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          تنسيق الصفحة الرئيسية
        </h1>

        <div className="w-[80%] font-bold bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Toggle Item 1 */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <List />

                <span className="text-gray-700 ">ماذا نقدم لك؟</span>
              </div>
              <button
                onClick={() => handleToggle("mainPage")}
                className={`relative inline-flex h-7 pr-3 w-24 items-center rounded-full transition-colors ${
                  toggles.mainPage ? "bg-[#2885AC]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    toggles.mainPage ? "translate-x-1" : "translate-x-6"
                  }`}
                />
              </button>
            </div>

            {/* Toggle Item 2 */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
               <List />
                <span className="text-gray-700 ">خدمات الإرشاد الأكاديمي</span>
              </div>
              <button
                onClick={() => handleToggle("academicGuidance")}
                className={`relative inline-flex h-7  pr-3 w-24 items-center rounded-full transition-colors ${
                  toggles.academicGuidance ? "bg-[#2885AC]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    toggles.academicGuidance ? "translate-x-1" : "translate-x-6"
                  }`}
                />
              </button>
            </div>

            {/* Toggle Item 3 */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
               <List />
                <span className="text-gray-700 ">الدورات التدريبية</span>
              </div>
              <button
                onClick={() => handleToggle("trainingCourses")}
                className={`relative inline-flex h-7  pr-3 w-24 items-center rounded-full transition-colors ${
                  toggles.trainingCourses ? "bg-[#2885AC]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    toggles.trainingCourses ? "translate-x-1" : "translate-x-6"
                  }`}
                />
              </button>
            </div>

            {/* Toggle Item 4 */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <List />
                <span className="text-gray-700 ">التعليقات</span>
              </div>
              <button
                onClick={() => handleToggle("comments")}
                className={`relative inline-flex h-7  pr-3 w-24 items-center rounded-full transition-colors ${
                  toggles.comments ? "bg-[#2885AC]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    toggles.comments ? "translate-x-1" : "translate-x-6"
                  }`}
                />
              </button>
            </div>

            {/* Toggle Item 5 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
               <List />
                <span className="text-gray-700 ">الاستفتاءات الشائعة</span>
              </div>
              <button
                onClick={() => handleToggle("rumors")}
                className={`relative inline-flex h-7  pr-3 w-24 items-center rounded-full transition-colors ${
                  toggles.rumors ? "bg-[#2885AC]" : "bg-gray-300 pr-3 w-24 "
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    toggles.rumors ? "translate-x-1" : "translate-x-6"
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="w-full flex justify-end items-center">
            <div className="mt-8 w-[30%]">
              <button
                onClick={handleSave}
                className="w-full bg-[#2885AC] text-white py-3 rounded-lg  hover:bg-[#2885AC] transition-colors"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
