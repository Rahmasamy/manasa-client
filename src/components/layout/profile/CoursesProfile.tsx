
'use client'
import { Button } from "@/components/ui/button";
import { profileCourseFilters } from "@/src/lib/consts/filters/Filters";
import React from "react";
import AllCourses from "../../domain/profile/AllCourses/AllCourses";
import CompleteCourse from "../../domain/profile/CompleteCourse/CompleteCourse";
import NonCompleteCourse from "../../domain/profile/NonCompleteCourse/NonCompleteCourse";
import FavouriteCourse from "../../domain/profile/FavouriteCourse/FavouriteCourse";
import Certificates from "../../domain/profile/Certificates/Certificates";

export default function CoursesProfile() {
  const [selectedFilter, setSelectedFilter] = React.useState("كل الدورات ");
  const renderContent = () => {
    switch (selectedFilter) {
      case "كل الدورات ":
        return <AllCourses />;
      case "الدوارات المكتملة":
        return <CompleteCourse />;
      case "الدوارات الغير المكتملة":
        return <NonCompleteCourse />;
      case "المفضلة":
        return <FavouriteCourse />;
      case "الشهادات":
        return <Certificates />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-bold text-5xl p-5">
          دوراتي{" "}
        </h2>
        <p className="text-center text-white font-bold text-xl p-5">
          25 دورة/ 7 اقسام
        </p>
      </div>

      <div className="w-full px-24 py-10">
        <h1 className="font-bold text-[#2885AC] py-4 text-xl">
          الدورات الخاصة “أحمد اسماعيل”
        </h1>
        <div className="flex gap-2 mt-4">
          {profileCourseFilters.map((filter, index) => (
            <Button
              key={filter + index}
              className="text-[#4a4f52] border border-[#4a4f52] py-3 px-4"
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        <section className="container mx-auto px-4 py-9">
          {renderContent()}
        </section>
      </div>
    </>
  );
}
