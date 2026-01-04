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
}

export const articleApi = new ArticleApi();

