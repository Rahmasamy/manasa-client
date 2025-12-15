import React from "react";
import CourseCard from "../../domain/CourseCardComponent/CourseCardComponent";
import { Button } from "@/components/ui/button";
import { CourseFilters } from "@/src/lib/consts/filters/Filters";
import { courses } from "@/src/lib/consts/courses/courses";
import { Trainerslist } from "@/src/lib/consts/tainers/trainers";
import TrainerCard from "../../domain/TrainerCard/TrainerCard";

export default function CoursesAndPrograms() {
  return (
    <>
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-bold text-5xl p-5">
          الدورات والبرامج
        </h2>
        <p className="text-center text-white font-bold text-xl p-5">
          25 دورة/ 7 اقسام
        </p>
      </div>
       <div className="w-full px-24 py-3">
        <section className="container mx-auto px-4 py-9 flex flex-col gap-5">
        <h1 className="font-bold text-[#2885AC] py-4 text-2xl">اكمل دوراتك</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id + course.title} course={course} />
            ))}
          </div>
        </section>
      </div>
      <div className="w-full px-24 py-10">
        
        <section className="container mx-auto px-4 py-9">
             <h1 className="font-bold text-[#2885AC] py-4 text-2xl">
            كل الدورات
           </h1>
        <div className="flex gap-2 my-4">
          {CourseFilters.map((filter, index) => (
            <Button
              key={filter + index}
              className="text-[#4a4f52] bg-white hover:text-white hover:border-white border border-[#4a4f52] py-3 px-4"
            >
              {filter}
            </Button>
          ))}
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id + course.title} course={course} />
            ))}
          </div>
        </section>
      </div>
      <div className="w-full  px-24 py-10 bg-[#D6ECF5]">
        <h1 className="font-bold text-black py-4 text-xl">
          تعرف علي المدربين الأخرين
        </h1>
        <div className="flex gap-3">

        {CourseFilters.map((filter, index) => (
          <Button
            key={filter + index}
            className="text-[#4a4f52] bg-white hover:text-white hover:border-white border border-[#4a4f52] py-3 px-4"
          >
            {filter}
          </Button>
        ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
          {Trainerslist.map((trianer, index) => (
            <TrainerCard key={trianer.name + index} {...trianer} />
          ))}
        </div>
      </div>
    </>
  );
}
