"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string; email: string; name?: string } | null;
  login: (token: string, user: { id: string; email: string; name?: string }) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);

  useEffect(() => {
    // Check for stored auth data on mount
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("auth_user");
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (newToken: string, userData: { id: string; email: string; name?: string }) => {
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
    
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", newToken);
      localStorage.setItem("auth_user", JSON.stringify(userData));
    }
  };

  const logout = async () => {
    const currentToken = token;
    try {
      // Call logout API with current token
      const { authApi } = await import("@/src/infrastructure/api/authApi");
      await authApi.logout(currentToken || undefined);
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with local logout even if API call fails
    } finally {
      // Always clear local state and storage
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

