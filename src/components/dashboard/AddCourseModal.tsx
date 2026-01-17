"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { courseApi, ApiInstructor } from "@/src/infrastructure/api/courseApi";

interface CourseFormData {
  title: string;
  instructorId: string;
  groupId?: string;
  description?: string;
  price?: number;
  discount?: number;
  courseBenefits?: string;
  wayOfTraining?: string;
  targetAudience?: string;
  coursePhoto?: File | null;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CourseFormData) => void;
  title?: string;
  groupId?: string;
  initialData?: {
    id: string;
    title: string;
    instructorId: string;
    description?: string | null;
    price?: number | null;
    discount?: number | null;
    courseBenefits?: string | null;
    wayOfTraining?: string | null;
    targetAudience?: string | null;
  };
}

export default function AddCourseModal({
  isOpen,
  onClose,
  onSubmit,
  title = "إضافة دورة",
  groupId,
  initialData,
}: AddCourseModalProps) {
  const [instructors, setInstructors] = useState<ApiInstructor[]>([]);
  const [loadingInstructors, setLoadingInstructors] = useState(false);
  
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    instructorId: "",
    groupId: groupId || "",
    description: "",
    price: undefined,
    discount: undefined,
    courseBenefits: "",
    wayOfTraining: "",
    targetAudience: "",
    coursePhoto: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CourseFormData, string>>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Load instructors when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchInstructors = async () => {
        try {
          setLoadingInstructors(true);
          const instructorsList = await courseApi.getAllInstructors();
          setInstructors(instructorsList);
          
          if (instructorsList.length === 0) {
            setErrors({ instructorId: "يجب إنشاء محاضر أولاً قبل إضافة دورة" });
          }
        } catch (error) {
          console.error("Error fetching instructors:", error);
          setErrors({ instructorId: "فشل تحميل المحاضرين" });
        } finally {
          setLoadingInstructors(false);
        }
      };

      fetchInstructors();
    }
  }, [isOpen]);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        instructorId: initialData.instructorId,
        groupId: groupId || "",
        description: initialData.description || "",
        price: initialData.price || undefined,
        discount: initialData.discount || undefined,
        courseBenefits: initialData.courseBenefits || "",
        wayOfTraining: initialData.wayOfTraining || "",
        targetAudience: initialData.targetAudience || "",
        coursePhoto: null,
      });
      setPhotoPreview(null);
    } else {
      setFormData({
        title: "",
        instructorId: "",
        groupId: groupId || "",
        description: "",
        price: undefined,
        discount: undefined,
        courseBenefits: "",
        wayOfTraining: "",
        targetAudience: "",
        coursePhoto: null,
      });
      setPhotoPreview(null);
    }
    setErrors({});
  }, [initialData, groupId, isOpen]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CourseFormData, string>> = {};

    if (!formData.title || typeof formData.title !== "string" || formData.title.trim() === "") {
      newErrors.title = "العنوان مطلوب";
    }

    if (!formData.instructorId || typeof formData.instructorId !== "string" || formData.instructorId.trim() === "") {
      newErrors.instructorId = "المحاضر مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, coursePhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      instructorId: "",
      groupId: groupId || "",
      description: "",
      price: undefined,
      discount: undefined,
      courseBenefits: "",
      wayOfTraining: "",
      targetAudience: "",
      coursePhoto: null,
    });
    setErrors({});
    setPhotoPreview(null);
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
          {/* Title - Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان الدورة <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: "" });
              }}
              placeholder="أدخل عنوان الدورة"
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

          {/* Instructor - Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المحاضر <span className="text-red-500">*</span>
            </label>
            {loadingInstructors ? (
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-500">
                جاري التحميل...
              </div>
            ) : (
              <select
                value={formData.instructorId}
                onChange={(e) => {
                  setFormData({ ...formData, instructorId: e.target.value });
                  if (errors.instructorId) setErrors({ ...errors, instructorId: "" });
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-right ${
                  errors.instructorId
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#2885AC]"
                }`}
                required
              >
                <option value="">اختر المحاضر</option>
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
            )}
            {errors.instructorId && (
              <p className="mt-1 text-sm text-red-600 text-right">{errors.instructorId}</p>
            )}
          </div>

          {/* Description - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="أدخل وصف الدورة"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] text-right resize-none"
            />
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                السعر
              </label>
              <input
                type="number"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="السعر"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الخصم (%)
              </label>
              <input
                type="number"
                value={formData.discount || ""}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="الخصم"
                min="0"
                max="100"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] text-right"
              />
            </div>
          </div>

          {/* Course Benefits - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              فوائد الدورة
            </label>
            <textarea
              value={formData.courseBenefits}
              onChange={(e) => setFormData({ ...formData, courseBenefits: e.target.value })}
              placeholder="أدخل فوائد الدورة"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] text-right resize-none"
            />
          </div>

          {/* Way of Training - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              طريقة التدريب
            </label>
            <textarea
              value={formData.wayOfTraining}
              onChange={(e) => setFormData({ ...formData, wayOfTraining: e.target.value })}
              placeholder="أدخل طريقة التدريب"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] text-right resize-none"
            />
          </div>

          {/* Target Audience - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الجمهور المستهدف
            </label>
            <textarea
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="أدخل الجمهور المستهدف"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] text-right resize-none"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة الدورة
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC]"
            />
            {photoPreview && (
              <div className="mt-2">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="max-w-xs max-h-40 rounded-lg object-cover"
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

