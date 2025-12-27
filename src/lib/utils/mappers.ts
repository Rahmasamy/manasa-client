import { Course } from "@/src/types/courses/courses";
import { Service } from "@/src/types/services/services";
import {
  ApiCourse,
  ApiCourseGroup,
} from "@/src/infrastructure/api/courseApi";
import { ApiAcademicService } from "@/src/infrastructure/api/academicServiceApi";

/**
 * Map API course to frontend Course type
 */
export function mapApiCourseToCourse(apiCourse: ApiCourse): Course {
  const discountPercentage =
    apiCourse.discount && apiCourse.price
      ? Math.round((apiCourse.discount / apiCourse.price) * 100)
      : 0;

  const discountedPrice =
    apiCourse.price && apiCourse.discount
      ? apiCourse.price - apiCourse.discount
      : apiCourse.price || 0;

  return {
    id: parseInt(apiCourse.id) || 0, // Convert to number for compatibility
    title: apiCourse.title,
    desc: apiCourse.description || "",
    duration: "10 ساعات", // Default value, can be updated if available in API
    originalPrice: apiCourse.price || 0,
    discountedPrice: discountedPrice,
    discountPercentage: discountPercentage > 0 ? `${discountPercentage}% خصم` : "",
    badge: undefined,
    imageUrl: apiCourse.coursePhotoUrl || "/imgs/course-1.png",
    platform: apiCourse.group?.title,
    instructor: apiCourse.instructor?.name || "غير محدد",
    lectures: 0, // Default value
    students: 0, // Default value
    language: "العربية",
    isEnrolled: false,
    rating: apiCourse.rating || 0,
    sections: [], // Default empty sections
    // Course detail sections
    introduction: apiCourse.description || undefined,
    benefits: apiCourse.courseBenefits || undefined,
    trainingSystem: apiCourse.wayOfTraining || undefined,
    targetAudience: apiCourse.targetAudience || undefined,
    // Store API ID for reference
    apiId: apiCourse.id,
    groupId: apiCourse.groupId,
    instructorId: apiCourse.instructorId,
  };
}

/**
 * Map API academic service to frontend Service type
 */
export function mapApiServiceToService(
  apiService: ApiAcademicService
): Service {
  return {
    title: apiService.title,
    description: apiService.description,
    link_text: "أعرف المزيد",
    // Store API data for reference
    id: apiService.id,
    categoryId: apiService.categoryId,
  };
}

/**
 * Get courses by group ID from the courses array
 */
export function getCoursesByGroupId(
  courses: ApiCourse[],
  groupId: string
): ApiCourse[] {
  return courses.filter((course) => course.groupId === groupId);
}

