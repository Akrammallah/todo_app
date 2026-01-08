# API Contract: Phase II - Full-Stack Web Todo Application

**Feature**: Phase II - Full-Stack Web Todo Application
**Date**: 2025-12-29
**Base URL**: `http://localhost:8000` (development)
**API Version**: v1
**Content-Type**: `application/json`

## Overview

This document defines the RESTful API contract for Phase II of the Evolution of Todo project. All endpoints return JSON and use session-based authentication via HTTP-only cookies.

## Authentication

All todo-related endpoints require authentication. Session tokens are stored in HTTP-only cookies and automatically sent by the browser.

**Session Cookie**:
- Name: `session_id` (or Better Auth default)
- HttpOnly: `true`
- Secure: `true` (production)
- SameSite: `lax` or `strict`

## Common Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (successful delete) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not authenticated) |
| 404 | Not Found (resource doesn't exist or wrong user) |
| 409 | Conflict (duplicate email) |
| 500 | Internal Server Error |

## Common Error Response Format

```json
{
  "error": "Human-readable error message",
  "detail": "Optional additional details"
}
```

---

## Endpoints

### Authentication Endpoints

#### POST /api/auth/signup

Create a new user account.

**Request**:
```http
POST /api/auth/signup HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Request Validation**:
- `email`: Required, valid email format
- `password`: Required, minimum 8 characters

**Response (201 Created)**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "created_at": "2025-12-29T12:00:00Z"
}
```

**Error Responses**:
- `400`: Invalid email format or password too short
  ```json
  {
    "error": "Invalid input",
    "detail": [
      {"field": "email", "message": "Invalid email format"},
      {"field": "password", "message": "Password must be at least 8 characters"}
    ]
  }
  ```
- `409`: Email already exists
  ```json
  {
    "error": "Email already registered",
    "detail": "An account with this email already exists. Please sign in."
  }
  ```

---

#### POST /api/auth/signin

Authenticate an existing user and create a session.

**Request**:
```http
POST /api/auth/signin HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Request Validation**:
- `email`: Required
- `password`: Required

**Response (200 OK)**:
```json
{
  "id": 1,
  "email": "user@example.com"
}
```

**Response Headers**:
```
Set-Cookie: session_id=<token>; HttpOnly; Path=/; SameSite=Lax
```

**Error Responses**:
- `400`: Invalid credentials
  ```json
  {
    "error": "Invalid credentials",
    "detail": "Invalid email or password. Please try again."
  }
  ```
- `401`: Unauthorized
  ```json
  {
    "error": "Unauthorized",
    "detail": "Invalid email or password."
  }
  ```

---

#### POST /api/auth/signout

Invalidate the current user session.

**Request**:
```http
POST /api/auth/signout HTTP/1.1
Cookie: session_id=<token>
```

**Auth Required**: Yes (session cookie)

**Response (204 No Content)**: Empty response body

**Response Headers**:
```
Set-Cookie: session_id=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0
```

**Error Responses**:
- `401`: Not authenticated
  ```json
  {
    "error": "Unauthorized",
    "detail": "No active session found."
  }
  ```

---

### Todo Endpoints

All todo endpoints require authentication. The session cookie is used to identify the current user.

#### GET /api/todos

Retrieve all todos for the authenticated user.

**Request**:
```http
GET /api/todos HTTP/1.1
Cookie: session_id=<token>
```

**Auth Required**: Yes (session cookie)

**Query Parameters**:
None (future: pagination, sorting, filtering)

**Response (200 OK)**:
```json
{
  "todos": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "created_at": "2025-12-29T12:00:00Z",
      "updated_at": "2025-12-29T12:00:00Z"
    },
    {
      "id": 2,
      "title": "Read documentation",
      "description": null,
      "completed": true,
      "created_at": "2025-12-29T11:00:00Z",
      "updated_at": "2025-12-29T11:30:00Z"
    }
  ]
}
```

**Empty Response (200 OK)**:
```json
{
  "todos": []
}
```

**Error Responses**:
- `401`: Not authenticated
  ```json
  {
    "error": "Unauthorized",
    "detail": "Please sign in to access your todos."
  }
  ```

---

#### POST /api/todos

Create a new todo for the authenticated user.

**Request**:
```http
POST /api/todos HTTP/1.1
Content-Type: application/json
Cookie: session_id=<token>

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Auth Required**: Yes (session cookie)

**Request Validation**:
- `title`: Required, non-empty, max 500 characters
- `description`: Optional, any length

**Response (201 Created)**:
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2025-12-29T12:00:00Z",
  "updated_at": "2025-12-29T12:00:00Z"
}
```

**Error Responses**:
- `400`: Invalid input
  ```json
  {
    "error": "Invalid input",
    "detail": [
      {"field": "title", "message": "Title is required"},
      {"field": "title", "message": "Title must be less than 500 characters"}
    ]
  }
  ```
- `401`: Not authenticated
  ```json
  {
    "error": "Unauthorized",
    "detail": "Please sign in to create todos."
  }
  ```

---

#### GET /api/todos/{id}

Retrieve a specific todo by ID. User must be the owner of the todo.

**Request**:
```http
GET /api/todos/123 HTTP/1.1
Cookie: session_id=<token>
```

**Auth Required**: Yes (session cookie)

**Path Parameters**:
- `id`: Todo ID (integer)

**Response (200 OK)**:
```json
{
  "id": 123,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2025-12-29T12:00:00Z",
  "updated_at": "2025-12-29T12:00:00Z"
}
```

**Error Responses**:
- `401`: Not authenticated
  ```json
  {
    "error": "Unauthorized",
    "detail": "Please sign in to access this todo."
  }
  ```
- `404`: Not found or not owner
  ```json
  {
    "error": "Not Found",
    "detail": "Todo not found. It may have been deleted or you don't have permission to view it."
  }
  ```

---

#### PUT /api/todos/{id}

Update a specific todo by ID. User must be the owner of the todo.

**Request**:
```http
PUT /api/todos/123 HTTP/1.1
Content-Type: application/json
Cookie: session_id=<token>

{
  "title": "Updated title",
  "description": "Updated description"
}
```

**Auth Required**: Yes (session cookie)

**Path Parameters**:
- `id`: Todo ID (integer)

**Request Validation**:
- `title`: Required, non-empty, max 500 characters
- `description`: Optional, any length

**Response (200 OK)**:
```json
{
  "id": 123,
  "title": "Updated title",
  "description": "Updated description",
  "completed": false,
  "created_at": "2025-12-29T12:00:00Z",
  "updated_at": "2025-12-29T12:05:00Z"
}
```

**Error Responses**:
- `400`: Invalid input
  ```json
  {
    "error": "Invalid input",
    "detail": [
      {"field": "title", "message": "Title is required"}
    ]
  }
  ```
- `401`: Not authenticated
  ```json
  {
    "error": "Unauthorized",
    "detail": "Please sign in to update this todo."
  }
  ```
- `404`: Not found or not owner
  ```json
  {
    "error": "Not Found",
    "detail": "Todo not found. It may have been deleted or you don't have permission to update it."
  }
  ```

---

#### DELETE /api/todos/{id}

Delete a specific todo by ID. User must be the owner of the todo.

**Request**:
```http
DELETE /api/todos/123 HTTP/1.1
Cookie: session_id=<token>
```

**Auth Required**: Yes (session cookie)

**Path Parameters**:
- `id`: Todo ID (integer)

**Response (204 No Content)**: Empty response body

**Error Responses**:
- `401`: Not authenticated
  ```json
  {
    "error": "Unauthorized",
    "detail": "Please sign in to delete todos."
  }
  ```
- `404`: Not found or not owner
  ```json
  {
    "error": "Not Found",
    "detail": "Todo not found. It may have been deleted or you don't have permission to delete it."
  }
  ```

---

#### PATCH /api/todos/{id}/toggle

Toggle the completion status of a specific todo. User must be the owner of the todo.

**Request**:
```http
PATCH /api/todos/123/toggle HTTP/1.1
Cookie: session_id=<token>
```

**Auth Required**: Yes (session cookie)

**Path Parameters**:
- `id`: Todo ID (integer)

**Request Body**: None

**Response (200 OK)**:
```json
{
  "id": 123,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": true,
  "created_at": "2025-12-29T12:00:00Z",
  "updated_at": "2025-12-29T12:05:00Z"
}
```

**Error Responses**:
- `401`: Not authenticated
  ```json
  {
    "error": "Unauthorized",
    "detail": "Please sign in to update todos."
  }
  ```
- `404`: Not found or not owner
  ```json
  {
    "error": "Not Found",
    "detail": "Todo not found. It may have been deleted or you don't have permission to update it."
  }
  ```

---

## Endpoint Summary

| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| POST | /api/auth/signup | No | Create user account |
| POST | /api/auth/signin | No | Authenticate user |
| POST | /api/auth/signout | Yes | Sign out user |
| GET | /api/todos | Yes | Get all user's todos |
| POST | /api/todos | Yes | Create new todo |
| GET | /api/todos/{id} | Yes | Get specific todo |
| PUT | /api/todos/{id} | Yes | Update specific todo |
| DELETE | /api/todos/{id} | Yes | Delete specific todo |
| PATCH | /api/todos/{id}/toggle | Yes | Toggle todo completion |

---

## CORS Configuration

For local development, the backend must allow CORS requests from `http://localhost:3000`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Note**: CORS should be configured more restrictively in production.

---

## Rate Limiting (Future)

Not implemented in Phase II, but recommended for production:
- Rate limit authentication endpoints (signup, signin) to prevent brute force
- Rate limit todo endpoints to prevent abuse

---

## Versioning

This is API v1. Future versions will use:
- URL versioning: `/api/v2/todos`
- Or header versioning: `Accept: application/vnd.api.v2+json`

Backward compatibility will be maintained for at least one major version.
