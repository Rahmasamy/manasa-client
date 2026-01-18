import { Course } from "@/src/types/courses/courses";
import { Clock, PlayCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface CourseCardProps {
  course: Course;
}
const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Use apiId (from API) which is the course ID like "cmjgpms2h0001bgwk92sq8gp2"
  // This will navigate to /single-course/cmjgpms2h0001bgwk92sq8gp2
  // Which will call /api/course/courses/cmjgpms2h0001bgwk92sq8gp2
  const courseDetailUrl = course.apiId
    ? `/single-course/${course.apiId}`
    : course.id
    ? `/single-course/${course.id}`
    : "/courses"; // Fallback to courses list if no ID available

  console.log("🔍 [DEBUG] CourseCard - Course:", {
    title: course.title,
    apiId: course.apiId,
    id: course.id,
    courseDetailUrl,
  });

  return (
    <Link href={courseDetailUrl} className="block">
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#2885AC]/20 cursor-pointer">
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#39A975] text-white px-3 py-1 rounded-full text-sm font-bold">
            {course.discountPercentage}
          </span>
        </div>

        {/* Optional Top Badge (e.g. "الأكثر مبيعاً") */}
        {course.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-[#2885AC] text-white px-3 py-1 rounded-full text-xs font-bold">
              {course.badge}
            </span>
          </div>
        )}

        {/* Course Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Title */}
          <h3 className="font-bold text-lg line-clamp-2 text-gray-800 leading-tight text-right">
            {course.title}
          </h3>

          {/* Instructor */}
          {/* <p className="text-sm text-gray-600 flex items-center gap-2">
            <span className="flex items-center gap-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 9.75C11.0025 9.75 15 10.755 15 12.75V14.25C15 14.6625 14.6625 15 14.25 15H3.75C3.3375 15 3 14.6625 3 14.25V12.75C3 10.755 6.9975 9.75 9 9.75ZM9 11.1748C6.7725 11.1748 4.4248 12.27 4.4248 12.75V13.5752H13.5752V12.75C13.5752 12.27 11.2275 11.1748 9 11.1748ZM9 3C10.6575 3 12 4.3425 12 6C12 7.6575 10.6575 9 9 9C7.3425 9 6 7.6575 6 6C6 4.3425 7.3425 3 9 3ZM9 4.4248C8.13 4.4248 7.4248 5.13 7.4248 6C7.4248 6.87 8.13 7.5752 9 7.5752C9.87 7.5752 10.5752 6.87 10.5752 6C10.5752 5.13 9.87 4.4248 9 4.4248Z"
                  fill="#52525B"
                />
              </svg>

              {course.instructor}
            </span>
          </p> */}
          <p className="text-sm text-gray-400 p-2 text-justify">{course.desc}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">(1.2k)</span>
          </div>
          {/* Duration (optional) */}
          {course.duration && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-emerald-600">
                {course.discountedPrice.toFixed(2)} SAR
              </span>
              <span className="text-sm text-gray-500 line-through">
                {course.originalPrice.toFixed(2)} SAR
              </span>
            </div>

            {/* Rating Stars (example) */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
