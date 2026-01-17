"use client";

import AddSectionModal from "@/src/components/dashboard/AddSectionModal";
import ServiceTable, {
  ServiceItem,
} from "@/src/components/dashboard/ServiceTable";
import TableCard from "@/src/components/dashboard/TableCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { courseApi } from "@/src/infrastructure/api/courseApi";

export default function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [groups, setGroups] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coursesCountMap, setCoursesCountMap] = useState<Record<string, number>>({});

  // Fetch course groups and courses count on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch groups and all courses
        const [groupsResponse, coursesResponse] = await Promise.all([
          courseApi.getAllCourseGroups(),
          courseApi.getAllCourses(),
        ]);

        // Count courses per group
        const countMap: Record<string, number> = {};
        coursesResponse.courses.forEach((course) => {
          if (course.groupId) {
            countMap[course.groupId] = (countMap[course.groupId] || 0) + 1;
          }
        });

        // Map API response to ServiceItem format
        // Backend returns 'title' field, but we map it to 'name' for ServiceItem
        const mappedGroups: ServiceItem[] = groupsResponse.map((group) => ({
          id: group.id,
          name: group.title || group.name || "غير محدد", // Use 'title' from Prisma, fallback to 'name' for backward compatibility
          identity: countMap[group.id] || 0,
        }));

        setGroups(mappedGroups);
        setCoursesCountMap(countMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'فشل تحميل الأقسام');
        console.error('Error fetching course groups:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddSection = async (title: string) => {
    try {
      setError(null);
      await courseApi.createCourseGroup(title);
      
      // Refresh groups list after successful creation
      const [groupsResponse, coursesResponse] = await Promise.all([
        courseApi.getAllCourseGroups(),
        courseApi.getAllCourses(),
      ]);

      const countMap: Record<string, number> = {};
      coursesResponse.courses.forEach((course) => {
        if (course.groupId) {
          countMap[course.groupId] = (countMap[course.groupId] || 0) + 1;
        }
      });

      const mappedGroups: ServiceItem[] = groupsResponse.map((group) => ({
        id: group.id,
        name: group.title || group.name || "غير محدد",
        identity: countMap[group.id] || 0,
      }));

      setGroups(mappedGroups);
      setCoursesCountMap(countMap);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل إنشاء القسم';
      setError(errorMessage);
      console.error('Error creating course group:', err);
      alert(errorMessage);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا القسم؟")) {
      return;
    }

    try {
      setError(null);
      await courseApi.deleteCourseGroup(id);
      
      // Refresh groups list after successful deletion
      const [groupsResponse, coursesResponse] = await Promise.all([
        courseApi.getAllCourseGroups(),
        courseApi.getAllCourses(),
      ]);

      const countMap: Record<string, number> = {};
      coursesResponse.courses.forEach((course) => {
        if (course.groupId) {
          countMap[course.groupId] = (countMap[course.groupId] || 0) + 1;
        }
      });

      const mappedGroups: ServiceItem[] = groupsResponse.map((group) => ({
        id: group.id,
        name: group.title || group.name || "غير محدد",
        identity: countMap[group.id] || 0,
      }));

      setGroups(mappedGroups);
      setCoursesCountMap(countMap);
    } catch (err) {
      let errorMessage = 'فشل حذف القسم';
      
      if (err instanceof Error) {
        const status = (err as any).status;
        if (status === 400) {
          errorMessage = 'لا يمكن مسح مجموعة دورات بدون مسح كل الدورات داخل هذة المجموعة';
        } else {
          errorMessage = err.message || errorMessage;
        }
      }
      
      setError(errorMessage);
      alert(errorMessage);
      console.error('Error deleting course group:', err);
    }
  };

  const handleViewSection = (id: string) => {
    // Navigate to courses page for this group
    router.push(`/dashboard/courses/${id}`);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <TableCard
        title="اقسام الدورات والبرامج"
        onAdd={() => setIsModalOpen(true)}
        addButtonText="إضافة قسم"
      >
        {loading ? (
          <div className="px-6 py-8 text-center text-gray-500">
            جاري التحميل...
          </div>
        ) : (
          <ServiceTable
            items={groups}
            onDelete={handleDeleteSection}
            onView={handleViewSection}
            serviceHeadline="الدورات"
          />
        )}
      </TableCard>

      <AddSectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSection}
        title="إضافة قسم جديد"
      />
    </div>
  );
}
