"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface LibraryItemFormData {
  title: string;
  type: string;
  content?: string;
  image?: File | null;
}

interface AddLibraryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  title?: string;
  initialData?: {
    id: number | string;
    title: string;
    type: string;
    content?: string | null;
    imageUrl?: string | null;
  };
}

export default function AddLibraryItemModal({
  isOpen,
  onClose,
  onSubmit,
  title = "إضافة عنصر مكتبة",
  initialData,
}: AddLibraryItemModalProps) {
  const [formData, setFormData] = useState<LibraryItemFormData>({
    title: "",
    type: "",
    content: "",
    image: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LibraryItemFormData, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        type: initialData.type || initialData.ResearchType || "",
        content: initialData.content || "",
        image: null, // Don't pre-set file on edit
      });
      setImagePreview(initialData.imageUrl || null);
    } else {
      setFormData({
        title: "",
        type: "",
        content: "",
        image: null,
      });
      setImagePreview(null);
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LibraryItemFormData, string>> = {};

    // Validate title
    if (!formData.title || typeof formData.title !== "string" || formData.title.trim() === "") {
      newErrors.title = "العنوان مطلوب";
    }

    // Validate type
    if (!formData.type || formData.type.trim() === "") {
      newErrors.type = "النوع مطلوب";
    } else if (formData.type !== "ARABIC_ABSTRACTS" && formData.type !== "ENGLISH_ABSTRACTS") {
      newErrors.type = "النوع يجب أن يكون عربي أو إنجليزي";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // Create FormData
      const submitFormData = new FormData();
      submitFormData.append("title", formData.title.trim());
      submitFormData.append("type", formData.type);

      // Always send content in edit mode (even if empty) to allow clearing
      // In create mode, only send if content exists (optional field)
      if (initialData) {
        // Edit mode: always send content (even if empty string)
        submitFormData.append("content", formData.content || "");
      } else {
        // Create mode: only send if content exists
        if (formData.content && formData.content.trim()) {
          submitFormData.append("content", formData.content.trim());
        }
      }

      // Only append image if a new file is selected (not when editing without changing image)
      if (formData.image) {
        submitFormData.append("image", formData.image);
      }

      onSubmit(submitFormData);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.image) {
        setErrors({ ...errors, image: undefined });
      }
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      type: "",
      content: "",
      image: null,
    });
    setErrors({});
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              العنوان <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: undefined });
              }}
              placeholder="أدخل عنوان العنصر"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-right ${
                errors.title
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#2885AC]"
              }`}
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 text-right">{errors.title}</p>
            )}
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              النوع <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value });
                if (errors.type) setErrors({ ...errors, type: undefined });
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-right ${
                errors.type
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#2885AC]"
              }`}
              required
            >
              <option value="">اختر النوع</option>
              <option value="ARABIC_ABSTRACTS">عربي</option>
              <option value="ENGLISH_ABSTRACTS">إنجليزي</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600 text-right">{errors.type}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              المحتوى
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => {
                setFormData({ ...formData, content: e.target.value });
              }}
              placeholder="أدخل المحتوى (اختياري)"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] text-right resize-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              الصورة
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] text-right file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2885AC] file:text-white hover:file:bg-teal-600"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600 text-right">{errors.image}</p>
            )}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-auto max-h-48 rounded-lg border border-gray-300"
                />
              </div>
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

