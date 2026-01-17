"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  title?: string;
  initialData?: {
    id: string;
    title: string;
    description: string;
  };
}

export default function AddServiceModal({
  isOpen,
  onClose,
  onSubmit,
  title = "إضافة خدمة",
  initialData,
}: AddServiceModalProps) {
  const [serviceTitle, setServiceTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // Populate fields when editing
  useEffect(() => {
    if (initialData) {
      setServiceTitle(initialData.title);
      setDescription(initialData.description);
    } else {
      setServiceTitle("");
      setDescription("");
    }
    setTitleError("");
    setDescriptionError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    let isValid = true;

    // Validate title
    if (!serviceTitle || typeof serviceTitle !== "string" || serviceTitle.trim() === "") {
      setTitleError("العنوان مطلوب");
      isValid = false;
    } else {
      setTitleError("");
    }

    // Validate description
    if (!description || typeof description !== "string" || description.trim() === "") {
      setDescriptionError("الوصف مطلوب");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(serviceTitle.trim(), description.trim());
      setServiceTitle("");
      setDescription("");
      setTitleError("");
      setDescriptionError("");
      onClose();
    }
  };

  const handleClose = () => {
    setServiceTitle("");
    setDescription("");
    setTitleError("");
    setDescriptionError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان الخدمة
            </label>
            <input
              type="text"
              value={serviceTitle}
              onChange={(e) => {
                setServiceTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
              placeholder="أدخل عنوان الخدمة"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-right ${
                titleError
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#2885AC]"
              }`}
              required
            />
            {titleError && (
              <p className="mt-1 text-sm text-red-600 text-right">{titleError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف الخدمة
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (descriptionError) setDescriptionError("");
              }}
              placeholder="أدخل وصف الخدمة"
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-right resize-none ${
                descriptionError
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#2885AC]"
              }`}
              required
            />
            {descriptionError && (
              <p className="mt-1 text-sm text-red-600 text-right">{descriptionError}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#2885AC] text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              {initialData ? "حفظ" : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
