"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signup, signin, signout } from "@/lib/api";

interface AuthContextType {
  user: {
    id: number;
    email: string;
    created_at: string;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth data from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        // Invalid user data, clear it
        clearAuthData();
      }
    }
    setIsLoading(false);
  }, []);

  const handleSignup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await signup(email, password);
      // Store auth token from response
      localStorage.setItem(AUTH_TOKEN_KEY, response.access_token);
      const userData = { id: response.id, email: response.email, created_at: response.created_at };
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await signin(email, password);
      // Store auth token from response
      localStorage.setItem(AUTH_TOKEN_KEY, response.access_token);
      const userData = { id: response.id, email: response.email, created_at: response.created_at };
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      await signout();
      clearAuthData();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signup: handleSignup,
        signin: handleSignin,
        signout: handleSignout,
      }}
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
