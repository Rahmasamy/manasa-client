"use client";

import AddCourseModal from "@/src/components/dashboard/AddCourseModal";
import ServiceTable, {
  ServiceItem,
} from "@/src/components/dashboard/ServiceTable";
import TableCard from "@/src/components/dashboard/TableCard";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { courseApi } from "@/src/infrastructure/api/courseApi";

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

export default function CourseDetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<{
    id: string;
    title: string;
    instructorId: string;
    description?: string | null;
    price?: number | null;
    discount?: number | null;
    courseBenefits?: string | null;
    wayOfTraining?: string | null;
    targetAudience?: string | null;
  } | null>(null);
  
  const params = useParams();
  const { id } = params;
  const groupId = id as string;
  
  // Log groupId extraction for debugging
  useEffect(() => {
    if (groupId) {
      console.log("Extracted groupId from URL:", groupId);
    } else {
      console.error("groupId not found in URL params:", params);
    }
  }, [groupId, params]);
  
  const [courses, setCourses] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupTitle, setGroupTitle] = useState<string>("");

  // Fetch courses by group ID on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      if (!groupId) return;

      try {
        setLoading(true);
        setError(null);
        const response = await courseApi.getCoursesByGroupId(groupId);
        
        // Map API response to ServiceItem format
        const mappedCourses: ServiceItem[] = response.data.map((course) => ({
          id: course.id,
          name: course.title,
          identity: course.price || 0,
        }));
        
        setCourses(mappedCourses);
        
        // Set group title if available in response (backend may use title or name)
        if (response.group) {
          setGroupTitle((response.group.title || response.group.name) || "");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'فشل تحميل الدورات');
        console.error('Error fetching courses by group:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [groupId]);

  const handleAddCourse = async (formData: CourseFormData) => {
    // Validate groupId first - it's required by the backend
    if (!groupId || typeof groupId !== 'string' || groupId.trim() === "") {
      const errorMsg = "معرف المجموعة غير موجود أو غير صالح";
      setError(errorMsg);
      console.error("Invalid groupId:", groupId);
      alert(errorMsg);
      return;
    }

    if (!formData.instructorId || formData.instructorId.trim() === "") {
      setError("يجب اختيار محاضر");
      return;
    }

    try {
      setError(null);
      
      // Create FormData for multipart upload
      const data = new FormData();
      data.append("title", formData.title.trim());
      data.append("instructorId", formData.instructorId);
      
      // CRITICAL: groupId is required by Prisma schema (NOT NULL)
      // Ensure it's always sent as a valid string
      if (!groupId || groupId.trim() === "") {
        throw new Error("معرف المجموعة مطلوب");
      }
      data.append("groupId", groupId.trim());
      
      // Log what we're sending
      console.log("Sending course creation request with:", {
        title: formData.title,
        instructorId: formData.instructorId,
        groupId: groupId.trim(),
        hasPhoto: !!formData.coursePhoto,
      });
      
      // Only append optional fields if they have values (not empty strings)
      if (formData.description && formData.description.trim()) {
        data.append("description", formData.description.trim());
      }
      if (formData.price !== undefined && formData.price !== null && formData.price !== "") {
        data.append("price", formData.price.toString());
      }
      if (formData.discount !== undefined && formData.discount !== null && formData.discount !== "") {
        data.append("discount", formData.discount.toString());
      }
      if (formData.courseBenefits && formData.courseBenefits.trim()) {
        data.append("courseBenefits", formData.courseBenefits.trim());
      }
      if (formData.wayOfTraining && formData.wayOfTraining.trim()) {
        data.append("wayOfTraining", formData.wayOfTraining.trim());
      }
      if (formData.targetAudience && formData.targetAudience.trim()) {
        data.append("targetAudience", formData.targetAudience.trim());
      }
      if (formData.coursePhoto) {
        data.append("course_photo", formData.coursePhoto);
      }
      
      // Verify FormData has groupId
      const formDataGroupId = data.get("groupId");
      if (!formDataGroupId || formDataGroupId.toString().trim() === "") {
        const errorMsg = `فشل إضافة معرف المجموعة إلى الطلب. groupId من URL: ${groupId}`;
        console.error("FormData validation failed:", {
          urlGroupId: groupId,
          formDataGroupId: formDataGroupId,
          allFormDataKeys: Array.from(data.keys()),
        });
        throw new Error(errorMsg);
      }
      
      // Debug: Log FormData contents (for development)
      console.log("FormData contents being sent:", {
        urlGroupId: groupId,
        formDataGroupId: formDataGroupId.toString(),
        title: data.get("title"),
        instructorId: data.get("instructorId"),
        hasPhoto: !!data.get("course_photo"),
        allKeys: Array.from(data.keys()),
        allValues: Array.from(data.keys()).map(key => ({
          key,
          value: data.get(key)?.toString().substring(0, 50), // First 50 chars
        })),
      });
      
      await courseApi.createCourse(data);
      
      // Refresh courses list after successful creation
      const response = await courseApi.getCoursesByGroupId(groupId);
      const mappedCourses: ServiceItem[] = response.data.map((course) => ({
        id: course.id,
        name: course.title,
        identity: course.price || 0,
      }));
      setCourses(mappedCourses);
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل إنشاء الدورة';
      setError(errorMessage);
      console.error('Error creating course:', err);
      alert(errorMessage);
    }
  };

  const handleEditCourse = async (formData: CourseFormData) => {
    if (!editingCourse || !groupId) return;

    try {
      setError(null);
      
      // Create FormData for multipart upload
      const data = new FormData();
      
      if (formData.title && formData.title.trim()) {
        data.append("title", formData.title.trim());
      }
      if (formData.instructorId) {
        data.append("instructorId", formData.instructorId);
      }
      if (formData.description && formData.description.trim()) {
        data.append("description", formData.description.trim());
      }
      if (formData.price !== undefined && formData.price !== null) {
        data.append("price", formData.price.toString());
      }
      if (formData.discount !== undefined && formData.discount !== null) {
        data.append("discount", formData.discount.toString());
      }
      if (formData.courseBenefits && formData.courseBenefits.trim()) {
        data.append("courseBenefits", formData.courseBenefits.trim());
      }
      if (formData.wayOfTraining && formData.wayOfTraining.trim()) {
        data.append("wayOfTraining", formData.wayOfTraining.trim());
      }
      if (formData.targetAudience && formData.targetAudience.trim()) {
        data.append("targetAudience", formData.targetAudience.trim());
      }
      if (formData.coursePhoto) {
        data.append("course_photo", formData.coursePhoto);
      }
      
      await courseApi.updateCourse(editingCourse.id, data);
      
      // Refresh courses list after successful update
      const response = await courseApi.getCoursesByGroupId(groupId);
      const mappedCourses: ServiceItem[] = response.data.map((course) => ({
        id: course.id,
        name: course.title,
        identity: course.price || 0,
      }));
      setCourses(mappedCourses);
      setEditingCourse(null);
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل تحديث الدورة';
      setError(errorMessage);
      console.error('Error updating course:', err);
      alert(errorMessage);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الدورة؟")) {
      return;
    }

    try {
      setError(null);
      await courseApi.deleteCourse(id);
      
      // Refresh courses list after successful deletion
      const response = await courseApi.getCoursesByGroupId(groupId);
      const mappedCourses: ServiceItem[] = response.data.map((course) => ({
        id: course.id,
        name: course.title,
        identity: course.price || 0,
      }));
      setCourses(mappedCourses);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل حذف الدورة';
      setError(errorMessage);
      console.error('Error deleting course:', err);
      alert(errorMessage);
    }
  };

  const handleViewCourse = async (id: string) => {
    // Find the course and open edit modal
    const course = courses.find(c => c.id === id);
    if (course) {
      // Fetch full course details for editing
      try {
        const fullCourse = await courseApi.getCourseById(id);
        setEditingCourse({
          id: fullCourse.id,
          title: fullCourse.title,
          instructorId: fullCourse.instructorId,
          description: fullCourse.description,
          price: fullCourse.price,
          discount: fullCourse.discount,
          courseBenefits: fullCourse.courseBenefits,
          wayOfTraining: fullCourse.wayOfTraining,
          targetAudience: fullCourse.targetAudience,
        });
        setIsModalOpen(true);
      } catch (err) {
        console.error('Error fetching course details:', err);
        alert('فشل تحميل تفاصيل الدورة');
      }
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <TableCard
        title={groupTitle || "الدورات والبرامج"}
        onAdd={() => {
          setEditingCourse(null);
          setIsModalOpen(true);
        }}
        addButtonText="إضافة دورة"
      >
        {loading ? (
          <div className="px-6 py-8 text-center text-gray-500">
            جاري التحميل...
          </div>
        ) : (
          <ServiceTable
            items={courses}
            onDelete={handleDeleteCourse}
            onView={handleViewCourse}
            serviceHeadline="السعر"
          />
        )}
      </TableCard>

      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={editingCourse ? handleEditCourse : handleAddCourse}
        title={editingCourse ? "تعديل دورة" : "إضافة دورة"}
        groupId={groupId}
        initialData={editingCourse || undefined}
      />
    </div>
  );
}
