export const API_BASE_URL = "https://edu-3nj8.onrender.com";

export const API_ENDPOINTS = {
  // Courses
  COURSES: {
    ALL: "/api/course/courses",
    BY_ID: (id: string) => `/api/course/courses/${id}`,
    BY_GROUP: (groupId: string) => `/api/course/courses/group/${groupId}`,
    GROUPS: "/api/course/course-groups",
    GROUP_BY_ID: (id: string) => `/api/course/course-groups/${id}`,
  },
  // Academic Services
  ACADEMIC: {
    SERVICES: "/api/academic/services",
    SERVICES_BY_CATEGORY: (categoryId: string) =>
      `/api/academic/services/category/${categoryId}`,
    SERVICE_BY_ID: (id: string) => `/api/academic/services/${id}`,
    CATEGORIES: "/api/academic/categories",
    CATEGORY_BY_ID: (id: string) => `/api/academic/categories/${id}`,
  },
  // Articles
  ARTICLES: {
    ALL: "/api/articles/articles",
    BY_ID: (id: string) => `/api/articles/articles/${id}`,
    BY_CATEGORY: (categoryId: string) =>
      `/api/articles/articles/category/${categoryId}`,
  },
  // Auth
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
  },
};

