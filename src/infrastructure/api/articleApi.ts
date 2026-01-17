import { API_BASE_URL, API_ENDPOINTS } from "@/src/lib/config/api";

export interface ApiArticle {
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

export interface ArticlesResponse {
  message?: string;
  data?: ApiArticle[];
  articles?: ApiArticle[];
}

// API might return array directly, so we need to handle both cases
export type ArticlesApiResponse = ArticlesResponse | ApiArticle[];

export interface ArticleResponse {
  message?: string;
  data?: ApiArticle;
  article?: ApiArticle;
}

// API might return article directly, so we need to handle both cases
export type ArticleApiResponse = ArticleResponse | ApiArticle;

export class ArticleApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async getAllArticles(): Promise<ArticlesApiResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ARTICLES.ALL}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch articles: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch articles: ${String(error)}`);
    }
  }

  async getArticleById(id: string): Promise<ArticleApiResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ARTICLES.BY_ID(id)}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch article: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch article: ${String(error)}`);
    }
  }

  async getArticlesByCategoryId(
    categoryId: string
  ): Promise<ArticlesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ARTICLES.BY_CATEGORY(categoryId)}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch articles by category: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch articles by category: ${String(error)}`);
    }
  }

  async createArticle(formData: FormData): Promise<ApiArticle> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ARTICLES.CREATE}`,
        {
          method: "POST",
          body: formData,
          // Don't set Content-Type header - browser will set it with boundary for FormData
        }
      );

      if (!response.ok) {
        let errorMessage = `Failed to create article: ${response.status} ${response.statusText}`;
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
      throw new Error(`Failed to create article: ${String(error)}`);
    }
  }

  async updateArticle(id: string, formData: FormData): Promise<ApiArticle> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ARTICLES.UPDATE(id)}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        let errorMessage = `Failed to update article: ${response.status} ${response.statusText}`;
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
      throw new Error(`Failed to update article: ${String(error)}`);
    }
  }

  async deleteArticle(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_ENDPOINTS.ARTICLES.DELETE(id)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        let errorMessage = `Failed to delete article: ${response.status} ${response.statusText}`;
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
      throw new Error(`Failed to delete article: ${String(error)}`);
    }
  }
}

export const articleApi = new ArticleApi();

