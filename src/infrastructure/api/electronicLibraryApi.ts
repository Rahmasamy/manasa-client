import { API_BASE_URL, API_ENDPOINTS } from "@/src/lib/config/api";

export interface ApiElectronicLibrary {
  id: number | string;
  title: string;
  ResearchType?: string;
  type?: string; // Mapped from ResearchType or direct from backend
  subTitle?: string;
  author?: string;
  degree?: string;
  content?: string;
  description?: string; // Fallback if content doesn't exist
  university?: string | null;
  location?: string | null;
  imageUrl?: string | null;
  photoUrl?: string | null;
  photoPublicId?: string | null;
  categoryId?: string;
  category?: {
    id: string;
    title: string;
  };
  authorId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ElectronicLibraryResponse {
  message?: string;
  data?: ApiElectronicLibrary[];
  library?: ApiElectronicLibrary[];
}

// API might return array directly, so we need to handle both cases
export type ElectronicLibraryApiResponse = ElectronicLibraryResponse | ApiElectronicLibrary[];

export interface SingleElectronicLibraryResponse {
  message?: string;
  data?: ApiElectronicLibrary;
  library?: ApiElectronicLibrary;
}

// API might return library item directly, so we need to handle both cases
export type SingleElectronicLibraryApiResponse = SingleElectronicLibraryResponse | ApiElectronicLibrary;

export class ElectronicLibraryApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async getAllLibraryItems(): Promise<ElectronicLibraryApiResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ELECTRONIC_LIBRARY.ALL}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch library items: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch library items: ${String(error)}`);
    }
  }

  async getLibraryItemById(id: string | number): Promise<SingleElectronicLibraryApiResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ELECTRONIC_LIBRARY.BY_ID(id)}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch library item: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch library item: ${String(error)}`);
    }
  }

  async createLibraryItem(formData: FormData): Promise<ApiElectronicLibrary> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ELECTRONIC_LIBRARY.CREATE}`,
        {
          method: "POST",
          body: formData,
          // Don't set Content-Type header - browser will set it with boundary for FormData
        }
      );

      if (!response.ok) {
        let errorMessage = `Failed to create library item: ${response.status} ${response.statusText}`;
        try {
          const errorText = await response.text();
          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorMessage;
            } catch {
              errorMessage = errorText.trim() || errorMessage;
            }
          }
        } catch (readError) {
          console.error("Error reading error response:", readError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      // Backend returns { message, data } or just the item
      return result.data || result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to create library item: ${String(error)}`);
    }
  }

  async updateLibraryItem(
    id: string | number,
    formData: FormData
  ): Promise<ApiElectronicLibrary> {
    try {
      // Convert id to number if it's a string (backend expects numeric ID)
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;

      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ELECTRONIC_LIBRARY.UPDATE(numericId)}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        let errorMessage = `Failed to update library item: ${response.status} ${response.statusText}`;
        try {
          const errorText = await response.text();
          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorMessage;
            } catch {
              errorMessage = errorText.trim() || errorMessage;
            }
          }
        } catch (readError) {
          console.error("Error reading error response:", readError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      // Backend returns { message, data } or just the item
      return result.data || result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to update library item: ${String(error)}`);
    }
  }

  async deleteLibraryItem(id: string | number): Promise<{ message: string }> {
    try {
      // Convert id to number if it's a string (backend expects parseInt)
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;

      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ELECTRONIC_LIBRARY.DELETE(numericId)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        let errorMessage = `Failed to delete library item: ${response.status} ${response.statusText}`;
        try {
          const errorText = await response.text();
          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorMessage;
            } catch {
              errorMessage = errorText.trim() || errorMessage;
            }
          }
        } catch (readError) {
          console.error("Error reading error response:", readError);
        }
        const error = new Error(errorMessage);
        (error as any).status = response.status;
        throw error;
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to delete library item: ${String(error)}`);
    }
  }
}

export const electronicLibraryApi = new ElectronicLibraryApi();

