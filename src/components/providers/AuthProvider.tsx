"use client";
import { AuthProvider as AuthProviderComponent } from "@/src/contexts/AuthContext";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProviderComponent>{children}</AuthProviderComponent>;
}

