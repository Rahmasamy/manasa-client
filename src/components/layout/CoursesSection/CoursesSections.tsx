"use client";
import React, { useEffect, useState } from "react";
import WrapperComponent from "../../domain/WrapperComponent/WrapperComponent";
import { Button } from "@/components/ui/button";
import CourseCard from "../../domain/CourseCardComponent/CourseCardComponent";
import { courseApi, ApiCourseGroup } from "@/src/infrastructure/api/courseApi";
import { mapApiCourseToCourse } from "@/src/lib/utils/mappers";
import { Course } from "@/src/types/courses/courses";

export default function CoursesSections() {
  const [courseGroups, setCourseGroups] = useState<ApiCourseGroup[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const DISPLAY_LIMIT = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all courses which includes courseCategories (groups) with nested courses
        const response = await courseApi.getAllCourses();
        setCourseGroups(response.courseCategories || []);

        // Extract all courses from groups (similar to services)
        const courses: Course[] = [];
        if (response.courseCategories && response.courseCategories.length > 0) {
          response.courseCategories.forEach((group) => {
            if (group.courses && group.courses.length > 0) {
              group.courses.forEach((apiCourse) => {
                courses.push(mapApiCourseToCourse(apiCourse));
              });
            }
          });
        } else if (response.courses) {
          // Fallback: if courseCategories is empty, use courses array
          courses.push(...response.courses.map(mapApiCourseToCourse));
        }

        setAllCourses(courses);
        setDisplayedCourses(courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("فشل تحميل الدورات. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter courses based on selected group
    if (selectedGroupId) {
      const filtered = allCourses.filter(
        (course) => course.groupId === selectedGroupId
      );
      setDisplayedCourses(filtered);
    } else {
      setDisplayedCourses(allCourses);
    }
    // Reset showAll when filter changes
    setShowAll(false);
  }, [selectedGroupId, allCourses]);

  // Prefetch data on component mount for faster subsequent loads
  useEffect(() => {
    // Prefetch courses API endpoint
    const prefetchCourses = async () => {
      try {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = "https://edu-3nj8.onrender.com/api/course/courses";
        link.as = "fetch";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      } catch (err) {
        // Silently fail prefetching
      }
    };
    prefetchCourses();
  }, []);

  const handleFilterClick = (groupId: string | null) => {
    setSelectedGroupId(groupId);
  };

  if (loading) {
    return (
      <div className="bg-white px-24 py-10">
        <WrapperComponent
          order={"ثانيا"}
          title={"الدورات التدريبية"}
          knowMore="المزيد"
        />
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white px-24 py-10">
        <WrapperComponent
          order={"ثانيا"}
          title={"الدورات التدريبية"}
          knowMore="المزيد"
        />
        <div className="flex justify-center items-center py-20">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-24 py-10">
      <WrapperComponent
        order={"ثانيا"}
        title={"الدورات التدريبية"}
        knowMore="المزيد"
      />
      <div className="flex gap-2 mt-4 flex-wrap">
        <Button
          onClick={() => handleFilterClick(null)}
          className={`text-[#4a4f52] border-[#4a4f52] bg-white hover:bg-[#4a4f52] hover:text-white py-3 px-4 ${
            selectedGroupId === null ? "bg-[#4a4f52] text-white" : ""
          }`}
        >
          الكل
        </Button>
        {courseGroups.map((group) => (
          <Button
            key={group.id}
            onClick={() => handleFilterClick(group.id)}
            className={`text-[#4a4f52] border-[#4a4f52] bg-white hover:bg-[#4a4f52] hover:text-white py-3 px-4 ${
              selectedGroupId === group.id
                ? "bg-[#4a4f52] text-white"
                : ""
            }`}
          >
            {group.title}
          </Button>
        ))}
      </div>
      <section className="container mx-auto px-4 py-9">
        {displayedCourses.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600">لا توجد دورات متاحة</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(showAll
                ? displayedCourses
                : displayedCourses.slice(0, DISPLAY_LIMIT)
              ).map((course) => (
                <CourseCard
                  key={course.apiId || course.id + course.title}
                  course={course}
                />
              ))}
            </div>
            {displayedCourses.length > DISPLAY_LIMIT && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  className="text-[#2885AC] border-2 border-[#2885AC] bg-white hover:bg-[#2885AC] hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  {showAll ? "عرض أقل" : "عرض المزيد"}
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
