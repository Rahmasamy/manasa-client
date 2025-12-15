"use client";
import React, { useState } from "react";
import { ChevronDown, Star, Clock, BookOpen, Video, Users } from "lucide-react";
import { Course } from "@/src/types/courses/courses";
import { singleCourse } from "@/src/lib/consts/courses/courses";
import Image from "next/image";

const CoursePage: React.FC = () => {
  const [course, setCourse] = useState<Course>(singleCourse);
  const [activeTab, setActiveTab] = useState<"description" | "content">(
    "description"
  );

  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleEnrollment = () => {
    setCourse({ ...course, isEnrolled: !course.isEnrolled });
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-[30px]">
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
                  src={singleCourse.imageUrl}
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

            {/* Course Sections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 -mb-px font-semibold text-gray-700 transition-colors ${
                    activeTab === "description"
                      ? "border-b-2 border-[#2885AC] text-[#2885AC]"
                      : ""
                  }`}
                >
                  وصف الدورة
                </button>
                <button
                  onClick={() => setActiveTab("content")}
                  className={`px-4 py-2 -mb-px font-semibold text-gray-700 transition-colors ${
                    activeTab === "content"
                      ? "border-b-2 border-[#2885AC] text-[#2885AC]"
                      : ""
                  }`}
                >
                  محتوى الدورة
                </button>
              </div>
              {activeTab === "content" ? (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {course.isEnrolled ? "محتوى الدورة" : "ملاحظة الدورة"}
                  </h2>
                  {course.isEnrolled && (
                    <span className="text-sm text-gray-600">
                      {course.sections.length} فصول
                    </span>
                  )}
                </div>
              ) : (
                <p className="py-3 text-gray-500">
                  أنت على بُعد خطوات من إتمام المحتوى… كمّلي باقي الفيديوهات
                  علشان توصلي للمرحلة اللي بعدهاأنت على بُعد خطوات من إتمام
                  المحتوى… كمّلي باقي الفيديوهات علشان توصلي للمرحلة اللي
                  بعدهاأنت على بُعد خطوات من إتمام المحتوى… كمّلي باقي
                  الفيديوهات علشان توصلي للمرحلة اللي بعدهاأنت على بُعد خطوات من
                  إتمام المحتوى… كمّلي باقي الفيديوهات علشان توصلي للمرحلة اللي
                  بعدهاأنت على بُعد خطوات من إتمام المحتوى… كمّلي باقي
                  الفيديوهات علشان توصلي للمرحلة اللي بعدها.أنت على بُعد خطوات
                  من إتمام المحتوى… كمّلي باقي الفيديوهات علشان توصلي للمرحلة
                  اللي بعدها.
                </p>
              )}

              {!course.isEnrolled ? (
                // Preview sections before enrollment
                <div className="space-y-3">
                  {course.sections.map((section, index) => (
                    <div
                      key={section.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#2885AC] transition-colors cursor-pointer"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {section.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {section.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            {section.lectures} محاضرات
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedSections.has(section.id) ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Detailed sections after enrollment
                <div className="space-y-3">
                  {course.sections.map((section, index) => (
                    <div
                      key={section.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div
                        className="flex items-center justify-between p-4 bg-emerald-50 cursor-pointer hover:bg-emerald-100 transition-colors"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="w-8 h-8 bg-[#2885AC] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </span>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {section.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                              <span>{section.lectures} محاضرات</span>
                              <span>•</span>
                              <span>{section.duration}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-600 transition-transform ${
                            expandedSections.has(section.id) ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {expandedSections.has(section.id) && (
                        <div className="p-4 bg-white space-y-2">
                          {Array.from({ length: section.lectures }).map(
                            (_, lectureIndex) => (
                              <div
                                key={lectureIndex}
                                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <Video className="w-4 h-4 text-[#2885AC]" />
                                  <span className="text-gray-700">
                                    محاضرة {lectureIndex + 1}:{" "}
                                    {section.title.split(":")[1]?.trim() ||
                                      "محتوى الدرس"}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {Math.floor(Math.random() * 20) + 5} دقيقة
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
                <p className="text-2xl font-bold text-gray-900 mb-4 ">اضف تعليقاتك</p>
                <textarea name="comment" id="comment" className="min-h-80 w-full bg-gray-200 p-4 rounded-lg">

                </textarea>
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
                onClick={toggleEnrollment}
                className={`w-full py-3 rounded-lg font-semibold mb-4 transition-colors ${
                  course.isEnrolled
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : "bg-[#2885AC] hover:bg-emerald-700 text-white"
                }`}
              >
                {course.isEnrolled ? "إلغاء الاشتراك" : "اشترك الآن"}
              </button>

              <button className="w-full py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors mb-6">
                اضافة للسلة
              </button>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between pb-3 border-b">
                  <span className="text-gray-600">عدد الاقسام</span>
                  <span className="font-semibold">
                    {course.sections.length}
                  </span>
                </div>
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
                <div className="flex items-center justify-between pb-3 border-b">
                  <span className="text-gray-600">عدد الطلاب</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
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
