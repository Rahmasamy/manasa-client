"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string; email: string; isAdmin: boolean; name?: string } | null;
  isAdmin: boolean;
  login: (
    token: string,
    user: { id: string; email: string; isAdmin: boolean; name?: string }
  ) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    isAdmin: boolean;
    name?: string;
  } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for stored auth data on mount
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("auth_user");

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);
          // Ensure isAdmin is set correctly from userData
          const adminStatus = userData?.isAdmin === true;
          setIsAdmin(adminStatus);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          // Clear corrupted data
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
      }
    }
  }, []);

  // Sync isAdmin with user.isAdmin when user changes
  useEffect(() => {
    if (user) {
      const adminStatus = user.isAdmin === true;
      if (isAdmin !== adminStatus) {
        setIsAdmin(adminStatus);
      }
    } else if (isAdmin) {
      setIsAdmin(false);
    }
  }, [user, isAdmin]);

  const login = (
    newToken: string,
    userData: { id: string; email: string; isAdmin: boolean; name?: string }
  ) => {
    setToken(newToken);
    setUser(userData);
    setIsAdmin(userData.isAdmin || false);
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
      setIsAdmin(false);
      setIsAuthenticated(false);

      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, isAdmin, login, logout }}
    >
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
