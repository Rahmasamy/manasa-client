import { API_BASE_URL, API_ENDPOINTS } from "@/src/lib/config/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
}

export class AuthApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      // Log response for debugging
      console.log("API Response:", data);
      console.log("Response Status:", response.status);

      if (!response.ok) {
        const errorMessage = data.message || data.error || "فشل تسجيل الدخول";
        throw new Error(errorMessage);
      }

      // Return the data as-is, let the component handle different structures
      return data;
    } catch (error) {
      console.error("Auth API Error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("حدث خطأ أثناء تسجيل الدخول");
    }
  }

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.SIGNUP}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "فشل إنشاء الحساب" }));
        throw new Error(errorData.message || "فشل إنشاء الحساب");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("حدث خطأ أثناء إنشاء الحساب");
    }
  }
}

export const authApi = new AuthApi();

