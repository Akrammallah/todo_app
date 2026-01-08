// API client wrapper for all endpoints.
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

const AUTH_TOKEN_KEY = "auth_token";

interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  email: string;
  created_at: string;
  access_token: string;
}

interface ErrorResponse {
  error?: string;
  detail?: string | any;
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// Auth API
export async function signup(email: string, password: string): Promise<User> {
  const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || error.error || "Signup failed");
  }

  return response.json();
}

export async function signin(email: string, password: string): Promise<User> {
  const response = await fetch(`${BACKEND_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || error.error || "Signin failed");
  }

  return response.json();
}

export async function signout(): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/api/auth/signout`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || error.error || "Signout failed");
  }
}

// Todos API
export async function getTodos(): Promise<{ todos: Todo[] }> {
  const response = await fetch(`${BACKEND_URL}/api/todos`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || error.error || "Failed to fetch todos");
  }

  return response.json();
}

export async function createTodo(title: string, description?: string): Promise<Todo> {
  const response = await fetch(`${BACKEND_URL}/api/todos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || error.error || "Failed to create todo");
  }

  return response.json();
}

export async function getTodo(id: number): Promise<Todo> {
  const response = await fetch(`${BACKEND_URL}/api/todos/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || error.error || "Failed to fetch todo");
  }

  return response.json();
}

export async function updateTodo(id: number, title: string, description?: string): Promise<Todo> {
  const response = await fetch(`${BACKEND_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || error.error || "Failed to update todo");
  }

  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/api/todos/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || error.error || "Failed to delete todo");
  }
}

export async function toggleTodo(id: number): Promise<Todo> {
  const response = await fetch(`${BACKEND_URL}/api/todos/${id}/toggle`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || error.error || "Failed to toggle todo");
  }

  return response.json();
}

export type { Todo, User, ErrorResponse };
