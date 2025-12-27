import { API_BASE_URL, API_ENDPOINTS } from "@/src/lib/config/api";

export interface ApiCourse {
  id: string;
  title: string;
  coursePhotoUrl: string | null;
  description: string | null;
  courseBenefits: string | null;
  wayOfTraining: string | null;
  targetAudience: string | null;
  price: number | null;
  discount: number | null;
  rating: number;
  groupId: string;
  instructorId: string;
  group: {
    id: string;
    title: string;
    instructorId: string;
  };
  instructor: {
    id: string;
    name: string;
    email: string | null;
    bio: string | null;
    photoUrl: string | null;
  };
  createdAt: string;
}

export interface ApiCourseGroup {
  id: string;
  title: string;
  instructorId: string;
  instructor: {
    id: string;
    name: string;
    email: string | null;
    bio: string | null;
    photoUrl: string | null;
  };
  courses: ApiCourse[];
  createdAt: string;
}

export interface CoursesResponse {
  courseCategories: ApiCourseGroup[];
  courses: ApiCourse[];
  instructors: unknown[];
}

export interface CoursesByGroupResponse {
  message: string;
  data: ApiCourse[];
  group: {
    id: string;
    title: string;
    instructor: {
      id: string;
      name: string;
      email: string | null;
      bio: string | null;
      photoUrl: string | null;
    };
  };
}

export class CourseApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async getAllCourses(): Promise<CoursesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.COURSES.ALL}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch courses: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch courses: ${String(error)}`);
    }
  }

  async getCourseById(id: string): Promise<ApiCourse> {
    const fullUrl = `${this.baseUrl}${API_ENDPOINTS.COURSES.BY_ID(id)}`;
    console.log("🔍 [DEBUG] getCourseById - Course ID:", id);
    console.log("🔍 [DEBUG] getCourseById - Full URL:", fullUrl);
    console.log(
      "🔍 [DEBUG] getCourseById - Endpoint:",
      API_ENDPOINTS.COURSES.BY_ID(id)
    );

    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch course: ${response.statusText}`);
    }
    const result = await response.json();
    console.log("🔍 [DEBUG] getCourseById - Full API Response:", result);
    console.log("🔍 [DEBUG] getCourseById - Response structure:", {
      hasMessage: !!result.message,
      hasData: !!result.data,
      keys: Object.keys(result),
    });

    // Backend returns { message: "...", data: course }, so extract data
    const courseData = result.data || result;
    console.log(
      "🔍 [DEBUG] getCourseById - Extracted Course Data:",
      courseData
    );
    console.log("🔍 [DEBUG] getCourseById - Course fields check:", {
      hasCourseBenefits: !!courseData.courseBenefits,
      hasWayOfTraining: !!courseData.wayOfTraining,
      hasTargetAudience: !!courseData.targetAudience,
      courseBenefits: courseData.courseBenefits,
      wayOfTraining: courseData.wayOfTraining,
      targetAudience: courseData.targetAudience,
    });

    return courseData;
  }

  async getCoursesByGroupId(groupId: string): Promise<CoursesByGroupResponse> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.COURSES.BY_GROUP(groupId)}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch courses by group: ${response.statusText}`
      );
    }
    return response.json();
  }

  async getAllCourseGroups(): Promise<ApiCourseGroup[]> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.COURSES.GROUPS}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch course groups: ${response.statusText}`);
    }
    return response.json();
  }
}

export const courseApi = new CourseApi();
