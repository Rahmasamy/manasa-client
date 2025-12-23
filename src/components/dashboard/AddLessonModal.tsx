"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import SingleImageUpload from "./SingleImageUpload";

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, servicesCount: number) => void;
  title?: string;
}

export default function AddLessonModal({
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800"> اضافة{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
           
            <SingleImageUpload
              label="  صورة الدرس"
              image={""}
              onChange={(image) => {}}
            />
          </div>

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
