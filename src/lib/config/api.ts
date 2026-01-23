export const API_BASE_URL = "https://edu-3nj8.onrender.com";

export const API_ENDPOINTS = {
  // Courses
  COURSES: {
    ALL: "/api/course/courses",
    BY_ID: (id: string) => `/api/course/courses/${id}`,
    BY_GROUP: (groupId: string) =>
      `/api/course/courses/group/${groupId}`,
    CREATE: "/api/course/course",
    UPDATE: (id: string) => `/api/course/course/${id}`,
    DELETE: (id: string) => `/api/course/course/${id}`,
    GROUPS: "/api/course/course-groups",
    GROUP_BY_ID: (id: string) =>
      `/api/course/course-groups/${id}`,
    INSTRUCTORS: "/api/course/course-instructors",
    INSTRUCTOR_BY_ID: (id: string) =>
      `/api/course/course-instructors/${id}`,
  },

  // Academic Services
  ACADEMIC: {
    SERVICES: "/api/academic/services",
    SERVICES_BY_CATEGORY: (categoryId: string) =>
      `/api/academic/services/category/${categoryId}`,
    SERVICE_BY_ID: (id: string) =>
      `/api/academic/services/${id}`,
    CATEGORIES: "/api/academic/categories",
    CATEGORY_BY_ID: (id: string) =>
      `/api/academic/categories/${id}`,
    SUBMIT_SERVICE_REQUEST: "/api/academic/services/request",
  },

  // Articles
  ARTICLES: {
    ALL: "/api/articles/articles",
    BY_ID: (id: string) => `/api/articles/articles/${id}`,
    BY_CATEGORY: (categoryId: string) =>
      `/api/articles/articles/category/${categoryId}`,
    CREATE: "/api/articles/articles",
    UPDATE: (id: string) => `/api/articles/articles/${id}`,
    DELETE: (id: string) => `/api/articles/articles/${id}`,
  },

  // Auth
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
  },

  // Electronic Library
  ELECTRONIC_LIBRARY: {
    ALL: "/api/library/library",
    BY_ID: (id: string | number) => `/api/library/library/${id}`,
    CREATE: "/api/library/library",
    UPDATE: (id: string | number) => `/api/library/library/${id}`,
    DELETE: (id: string | number) => `/api/library/library/${id}`,
  },
};
