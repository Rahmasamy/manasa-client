"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "../../domain/CourseCardComponent/CourseCardComponent";
import { Button } from "@/components/ui/button";
import TrainerCard from "../../domain/TrainerCard/TrainerCard";
import { courseApi, ApiCourseGroup } from "@/src/infrastructure/api/courseApi";
import { mapApiCourseToCourse } from "@/src/lib/utils/mappers";
import { Course } from "@/src/types/courses/courses";

interface Instructor {
  id: string;
  name: string;
  email: string | null;
  bio: string | null;
  photoUrl: string | null;
}

export default function CoursesAndPrograms() {
  const [courseGroups, setCourseGroups] = useState<ApiCourseGroup[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
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

        // Fetch all courses which includes courseCategories and instructors
        const response = await courseApi.getAllCourses();
        setCourseGroups(response.courseCategories || []);

        // Extract all courses from groups
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
          courses.push(...response.courses.map(mapApiCourseToCourse));
        }

        setAllCourses(courses);
        setDisplayedCourses(courses);

        // Extract unique instructors from the response
        if (response.instructors && response.instructors.length > 0) {
          setInstructors(response.instructors);
        } else {
          // Fallback: extract instructors from courses
          const uniqueInstructors = new Map<string, Instructor>();
          courses.forEach((course) => {
            // We need to get instructor info from the API response
            // For now, we'll use instructors from the response if available
          });
        }
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
    setShowAll(false);
  }, [selectedGroupId, allCourses]);

  const handleFilterClick = (groupId: string | null) => {
    setSelectedGroupId(groupId);
  };

  // Map instructor to TrainerCard format
  const mapInstructorToTrainer = (instructor: Instructor) => ({
    image: instructor.photoUrl || "/imgs/trainer.jpg",
    name: instructor.name,
    title: "مدرب معتمد",
    description: instructor.bio || "خبير في مجال التدريب والتعليم الأكاديمي",
  });

  // Calculate totals
  const totalCourses = allCourses.length;
  const totalGroups = courseGroups.length;
  const totalInstructors = instructors.length;

  if (loading) {
    return (
      <>
        <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
          <h2 className="text-center text-white font-bold text-5xl p-5">
            الدورات والبرامج
          </h2>
          <p className="text-center text-white font-bold text-xl p-5">
            جاري التحميل...
          </p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
          <h2 className="text-center text-white font-bold text-5xl p-5">
            الدورات والبرامج
          </h2>
          <p className="text-center text-white font-bold text-xl p-5">
            {error}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-bold text-5xl p-5">
          الدورات والبرامج
        </h2>
        <p className="text-center text-white font-bold text-xl p-5">
          {totalCourses} دورة / {totalGroups} أقسام
        </p>
      </div>
      <div className="w-full px-24 py-3">
        <section className="container mx-auto px-4 py-9 flex flex-col gap-5">
          <h1 className="font-bold text-[#2885AC] py-4 text-2xl">اكمل دوراتك</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(showAll ? allCourses : allCourses.slice(0, DISPLAY_LIMIT)).map((course) => (
              <CourseCard key={course.apiId || course.id + course.title} course={course} />
            ))}
          </div>
          {allCourses.length > DISPLAY_LIMIT && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setShowAll(!showAll)}
                className="text-[#2885AC] border-2 border-[#2885AC] bg-white hover:bg-[#2885AC] hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {showAll ? "عرض أقل" : "عرض المزيد"}
              </Button>
            </div>
          )}
        </section>
      </div>
      <div className="w-full px-24 py-10">
        <section className="container mx-auto px-4 py-9">
          <h1 className="font-bold text-[#2885AC] py-4 text-2xl">
            كل الدورات
          </h1>
          <div className="flex gap-2 my-4 flex-wrap">
            <Button
              onClick={() => handleFilterClick(null)}
              className={`text-[#4a4f52] bg-white hover:text-white hover:border-white border border-[#4a4f52] py-3 px-4 ${
                selectedGroupId === null ? "bg-[#4a4f52] text-white" : ""
              }`}
            >
              الكل
            </Button>
            {courseGroups.map((group) => (
              <Button
                key={group.id}
                onClick={() => handleFilterClick(group.id)}
                className={`text-[#4a4f52] bg-white hover:text-white hover:border-white border border-[#4a4f52] py-3 px-4 ${
                  selectedGroupId === group.id
                    ? "bg-[#4a4f52] text-white"
                    : ""
                }`}
              >
                {group.title}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedCourses.length === 0 ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <p className="text-gray-600">لا توجد دورات متاحة</p>
              </div>
            ) : (
              displayedCourses.map((course) => (
                <CourseCard key={course.apiId || course.id + course.title} course={course} />
              ))
            )}
          </div>
        </section>
      </div>
      <div className="w-full px-24 py-10 bg-[#D6ECF5]">
        <h1 className="font-bold text-black py-4 text-xl">
          تعرف علي المدربين الأخرين
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
          {instructors.length === 0 ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <p className="text-gray-600">لا يوجد مدربين متاحين</p>
            </div>
          ) : (
            instructors.map((instructor) => (
              <TrainerCard
                key={instructor.id}
                {...mapInstructorToTrainer(instructor)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
