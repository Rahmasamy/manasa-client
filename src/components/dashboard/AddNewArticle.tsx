"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import SectionCard from "./SectionCard";
import TextField from "./TextField";
import SingleImageUpload from "./SingleImageUpload";

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, servicesCount: number) => void;
  title?: string;
}

export default function AddNewArticle({
  isOpen,
  onClose,
  onSubmit,
  title = "إضافة قسم جديد",
}: AddSectionModalProps) {
  const [sectionName, setSectionName] = useState("");
  const [servicesCount, setServicesCount] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sectionName.trim()) {
      onSubmit(sectionName, servicesCount);
      setSectionName("");
      setServicesCount(0);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl overflow-y-auto  w-[70%] mx-4 m-2  pb-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-2 space-y-4 overflow-y-auto"
        >
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

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#2885AC] text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
