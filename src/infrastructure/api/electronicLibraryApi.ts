import { API_BASE_URL, API_ENDPOINTS } from "@/src/lib/config/api";

export interface ApiElectronicLibrary {
  id: number | string;
  title: string;
  ResearchType?: string;
  subTitle?: string;
  author?: string;
  degree?: string;
  content?: string;
  description?: string; // Fallback if content doesn't exist
  university?: string | null;
  location?: string | null;
  imageUrl?: string | null;
  photoUrl?: string | null;
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

  async getLibraryItemById(id: string): Promise<SingleElectronicLibraryApiResponse> {
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
}

export const electronicLibraryApi = new ElectronicLibraryApi();

