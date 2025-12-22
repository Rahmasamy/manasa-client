import { API_BASE_URL, API_ENDPOINTS } from "@/src/lib/config/api";

export interface ApiAcademicService {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  category: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ApiAcademicCategory {
  id: string;
  title: string;
  services?: Array<{
    id: string;
    title: string;
    description: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  message: string;
  data: ApiAcademicService[];
}

export interface ServicesByCategoryResponse {
  message: string;
  data: ApiAcademicService[];
  category?: {
    id: string;
    title: string;
  };
}

export class AcademicServiceApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async getAllServices(): Promise<ServicesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ACADEMIC.SERVICES}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch services: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch services: ${String(error)}`);
    }
  }

  async getServicesByCategoryId(
    categoryId: string
  ): Promise<ServicesByCategoryResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ACADEMIC.SERVICES_BY_CATEGORY(
          categoryId
        )}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch services by category: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch services by category: ${String(error)}`);
    }
  }

  async getServiceById(
    id: string
  ): Promise<{ message: string; data: ApiAcademicService }> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.ACADEMIC.SERVICE_BY_ID(id)}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch service: ${response.statusText}`);
    }
    return response.json();
  }

  async getAllCategories(): Promise<{
    message: string;
    data: ApiAcademicCategory[];
  }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ACADEMIC.CATEGORIES}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch categories: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch categories: ${String(error)}`);
    }
  }
}

export const academicServiceApi = new AcademicServiceApi();
