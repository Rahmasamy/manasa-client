"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, Clock, BookOpen, Video, Users, ChevronDown } from "lucide-react";
import { Course } from "@/src/types/courses/courses";
import Image from "next/image";
import { courseApi } from "@/src/infrastructure/api/courseApi";
import { mapApiCourseToCourse } from "@/src/lib/utils/mappers";
import { useAuth } from "@/src/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import RequestServiceModal from "../../domain/RequestServiceModal/RequestServiceModal";
import SuccessPopup from "../../domain/SuccessPopup/SuccessPopup";

interface CoursePageProps {
  courseId?: string;
}

const CoursePage: React.FC<CoursePageProps> = ({ courseId: propCourseId }) => {
  const params = useParams();
  const router = useRouter();
  const courseId = propCourseId || (params?.id as string);
  const { isAuthenticated } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setError("معرف الدورة غير موجود");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log(
          "🔍 [DEBUG] CoursePage - Fetching course with ID:",
          courseId
        );
        const apiCourse = await courseApi.getCourseById(courseId);
        console.log("🔍 [DEBUG] CoursePage - Received API Course:", apiCourse);
        const mappedCourse = mapApiCourseToCourse(apiCourse);
        console.log("🔍 [DEBUG] CoursePage - Mapped Course:", mappedCourse);
        console.log("🔍 [DEBUG] CoursePage - Mapped Course fields:", {
          benefits: mappedCourse.benefits,
          trainingSystem: mappedCourse.trainingSystem,
          targetAudience: mappedCourse.targetAudience,
        });
        setCourse(mappedCourse);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("فشل تحميل الدورة. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const toggleEnrollment = () => {
    if (course) {
      setCourse({ ...course, isEnrolled: !course.isEnrolled });
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mt-[30px]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 mt-[30px]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center py-20">
            <p className="text-red-600 mb-4">{error || "الدورة غير موجودة"}</p>
            <button
              onClick={() => router.push("/courses")}
              className="px-4 py-2 bg-[#2885AC] text-white rounded-lg"
            >
              العودة إلى الدورات
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-[30px]">
      {/* Service Request Form Modal */}
      <RequestServiceModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSuccess={() => setShowSuccessPopup(true)}
      />

      {/* Success Popup Modal */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        message="تم تقديم الطلب سيتواصل معكم فريق العمل في أقرب وقت"
        subMessage="شكراً لاختيارك HSP"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-sm text-gray-600 mb-4">تطوير الذات / الدورات</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {course.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </span>
                <span>أستاذ: {course.instructor}</span>
              </div>

              {/* Video Thumbnail */}
              <div className="relative bg-slate-700 rounded-lg overflow-hidden mb-6">
                <Image
                  src={course.imageUrl || "/imgs/course-1.png"}
                  width={400}
                  height={350}
                  alt="Course preview"
                  className="w-full h-64 object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4">
                    <div className="w-12 h-12 bg-[#2885AC] rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-r-0 border-b-8 border-b-transparent border-l-12 border-l-white mr-1"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                  Uber
                </div>
              </div>
            </div>

            {/* Course Detail Sections */}
            <div className="space-y-6">
              {/* Section 1: التعريف بالدورة */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-[#2885AC]" />
                  التعريف بالدورة
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {course.introduction ||
                      course.desc ||
                      "هذه الدورة مصممة لتزويدك بالمهارات والمعرفة اللازمة في هذا المجال. ستحصل على فهم شامل للمفاهيم الأساسية والتطبيقات العملية."}
                  </p>
                </div>
              </div>

              {/* Section 2: المقدمة */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#2885AC] transition-colors cursor-pointer"
                  onClick={() => toggleSection("benefits")}
                >
                  <h2 className="text-xl font-bold text-gray-900">
                    أوجة الإستفادة من الدورة
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      expandedSections.has("benefits") ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedSections.has("benefits")
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 pt-0">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {course.benefits || "لا توجد معلومات متاحة"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: الأساسيات */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#2885AC] transition-colors cursor-pointer"
                  onClick={() => toggleSection("training")}
                >
                  <h2 className="text-xl font-bold text-gray-900">
                    نظام التدريب في الدورة
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      expandedSections.has("training") ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedSections.has("training")
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 pt-0">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {course.trainingSystem || "لا توجد معلومات متاحة"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4: المشاريع العلمية */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#2885AC] transition-colors cursor-pointer"
                  onClick={() => toggleSection("audience")}
                >
                  <h2 className="text-xl font-bold text-gray-900">
                    الفئة المستهدفة
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      expandedSections.has("audience") ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedSections.has("audience")
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 pt-0">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {course.targetAudience || "لا توجد معلومات متاحة"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ما هو تقييمك للكورس{" "}
              </h2>
              <div className="flex items-start justify-start gap-2 text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-8 h-8 fill-yellow-400" />
                ))}
              </div>
              <div className="bg-gray-50 rounded-lg py-8 text-center flex flex-col justify-start items-start">
                <p className="text-2xl font-bold text-gray-900 mb-4 ">
                  اضف تعليقاتك
                </p>
                <textarea
                  name="comment"
                  id="comment"
                  className="min-h-80 w-full bg-gray-200 p-4 rounded-lg"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="text-3xl font-bold text-[#2885AC] mb-2">
                US${course.originalPrice}
              </div>
              <div className="inline-block bg-emerald-100 text-[#2885AC] text-sm px-3 py-1 rounded-full mb-6">
                خصم 50%
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowFormModal(true);
                }}
                className="w-full py-3 rounded-lg font-semibold mb-4 bg-[#0B72B9] hover:bg-[#0B72B9]/90 text-white transition-colors"
              >
                اطلب الخدمة الآن
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowFormModal(true);
                }}
                className="w-full py-3 rounded-lg font-semibold mb-6 border-2 border-[#0B72B9] text-[#0B72B9] hover:bg-[#0B72B9] hover:text-white transition-colors bg-white"
              >
                اطلب استشارة مجانية
              </button>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between pb-3 border-b"></div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <span className="text-gray-600">عدد المحاضرات</span>
                  <span className="font-semibold flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.lectures}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <span className="text-gray-600">مدة الكورس</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">اللغة</span>
                  <span className="font-semibold">{course.language}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
