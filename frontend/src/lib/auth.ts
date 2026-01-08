// Auth utility functions (signup, signin, signout).
import { signup as apiSignup, signin as apiSignin, signout as apiSignout } from "./api";

// Store auth token in localStorage
const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export interface AuthData {
  id: number;
  email: string;
  created_at: string;
}

// Get stored auth token
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// Get stored user data
export function getUserData(): AuthData | null {
  if (typeof window === "undefined") return null;
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
}

// Set auth data
export function setAuthData(token: string, user: AuthData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
}

// Clear auth data
export function clearAuthData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
}

// Wrapper functions that store auth data
export async function signup(email: string, password: string) {
  const user = await apiSignup(email, password);
  // In a real implementation, the backend would return a token
  // For now, we'll simulate it
  const token = `simulated_token_${user.id}`;
  setAuthData(token, user);
  return user;
}

export async function signin(email: string, password: string) {
  const user = await apiSignin(email, password);
  // In a real implementation, the backend would return a token
  // For now, we'll simulate it
  const token = `simulated_token_${user.id}`;
  setAuthData(token, user);
  return user;
}

export async function signout() {
  await apiSignout();
  clearAuthData();
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  const userData = getUserData();
  return token !== null && userData !== null;
}
