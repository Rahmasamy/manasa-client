import React from "react";
import WrapperComponent from "../../domain/WrapperComponent/WrapperComponent";
import { CourseFilters } from "@/src/lib/consts/filters/Filters";
import { Button } from "@/components/ui/button";
import { courses } from "@/src/lib/consts/courses/courses";
import CourseCard from "../../domain/CourseCardComponent/CourseCardComponent";

export default function CoursesSections() {
  return (
    <div className="bg-white px-24 py-10">
      <WrapperComponent
        order={"ثانيا"}
        title={"الدورات التدريبية"}
        knowMore="المزيد"
      />
      <div className="flex gap-2 mt-4">
        {CourseFilters.map((filter, index) => (
          <Button
            key={filter + index}
            variant="outline"
            className="text-[#4a4f52] border-[#4a4f52] bg-white hover:bg-[#4a4f52] hover:text-white py-3 px-4"
          >
            {filter}
          </Button>
        ))}
      </div>
      <section className="container mx-auto px-4 py-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id+course.title} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
