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

  async createCategory(title: string): Promise<{
    message: string;
    data: ApiAcademicCategory;
  }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ACADEMIC.CATEGORIES}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create category: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to create category: ${String(error)}`);
    }
  }

  async deleteCategory(id: string): Promise<{
    message: string;
  }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ACADEMIC.CATEGORY_BY_ID(id)}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        const error = new Error(errorData.message || `Failed to delete category: ${response.statusText}`);
        (error as any).status = response.status;
        throw error;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to delete category: ${String(error)}`);
    }
  }

  async createService(
    title: string,
    description: string,
    categoryId: string
  ): Promise<{
    message: string;
    data: ApiAcademicService;
  }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ACADEMIC.SERVICES}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, categoryId }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create service: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to create service: ${String(error)}`);
    }
  }

  async updateService(
    id: string,
    title?: string,
    description?: string,
    categoryId?: string
  ): Promise<{
    message: string;
    data: ApiAcademicService;
  }> {
    try {
      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (categoryId !== undefined) updateData.categoryId = categoryId;

      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ACADEMIC.SERVICE_BY_ID(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update service: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to update service: ${String(error)}`);
    }
  }

  async deleteService(id: string): Promise<{
    message: string;
  }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ACADEMIC.SERVICE_BY_ID(id)}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete service: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to delete service: ${String(error)}`);
    }
  }
}

export const academicServiceApi = new AcademicServiceApi();
