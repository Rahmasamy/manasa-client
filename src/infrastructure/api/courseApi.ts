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
  name?: string; // For backward compatibility
  title?: string; // Actual field from Prisma schema
  createdAt: string;
}

export interface ApiInstructor {
  id: string;
  name: string;
  email: string | null;
  bio: string | null;
  photoUrl: string | null;
  photoPublicId: string | null;
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
    title?: string;
    name?: string;
    instructor?: {
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

  async createCourseGroup(name: string): Promise<ApiCourseGroup> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.COURSES.GROUPS}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }), // Backend will map 'name' to 'title'
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Failed to create course group: ${response.status} ${response.statusText}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to create course group: ${String(error)}`);
    }
  }

  async deleteCourseGroup(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.COURSES.GROUP_BY_ID(id)}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        const error = new Error(errorData.message || `Failed to delete course group: ${response.statusText}`);
        (error as any).status = response.status;
        throw error;
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to delete course group: ${String(error)}`);
    }
  }

  async getAllInstructors(): Promise<ApiInstructor[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.COURSES.INSTRUCTORS}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch instructors: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch instructors: ${String(error)}`);
    }
  }

  async createCourse(courseData: FormData): Promise<ApiCourse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.COURSES.CREATE}`,
        {
          method: "POST",
          body: courseData,
          // Don't set Content-Type header - browser will set it with boundary for FormData
        }
      );
      
      if (!response.ok) {
        let errorMessage = `Failed to create course: ${response.status} ${response.statusText}`;
        
        // Try to get error message from response
        try {
          // Read response as text first
          const errorText = await response.text();
          console.error("Raw backend error response:", errorText);
          
          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              console.error("Parsed error data:", errorData);
              errorMessage = errorData.message || errorData.error || errorMessage;
              
              // Also log the full error object for debugging
              if (errorData.details) {
                console.error("Error details:", errorData.details);
              }
            } catch (parseError) {
              // If not JSON, use text as error message
              console.error("Error parsing JSON, using raw text:", errorText);
              errorMessage = errorText.trim() || errorMessage;
            }
          }
        } catch (readError) {
          console.error("Error reading error response:", readError);
        }
        
        // Log full error details for debugging
        console.error("Course creation failed:", {
          status: response.status,
          statusText: response.statusText,
          errorMessage,
        });
        
        throw new Error(errorMessage);
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to create course: ${String(error)}`);
    }
  }

  async updateCourse(id: string, courseData: FormData): Promise<ApiCourse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.COURSES.UPDATE(id)}`,
        {
          method: "PUT",
          body: courseData,
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update course: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const result = await response.json();
      return result.course || result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to update course: ${String(error)}`);
    }
  }

  async deleteCourse(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.COURSES.DELETE(id)}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete course: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to delete course: ${String(error)}`);
    }
  }
}

export const courseApi = new CourseApi();
