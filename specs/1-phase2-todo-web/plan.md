# Implementation Plan: Phase II - Full-Stack Web Todo Application

**Branch**: `1-phase2-todo-web` | **Date**: 2025-12-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/1-phase2-todo-web/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Transform the Phase I console-based todo application into a full-stack web application using Python REST API backend, Next.js frontend, Better Auth authentication, and Neon PostgreSQL database. The implementation provides all 5 Basic Level Todo features with user authentication, persistent data storage, responsive UI, and secure data isolation between users.

## Technical Context

**Language/Version**: Python 3.11+ (backend), TypeScript 5+ (frontend)
**Primary Dependencies**: FastAPI (backend), Next.js 14+ (frontend), SQLModel (ORM), Better Auth
**Storage**: Neon Serverless PostgreSQL
**Testing**: pytest (backend), Jest/React Testing Library (frontend)
**Target Platform**: Web browsers (desktop, tablet, mobile)
**Project Type**: web
**Performance Goals**: <2s page load on 3G mobile, <1s todo operations, support 1,000+ todos per user
**Constraints**: No AI, no agents, no background workers, no real-time features, no Phase III+ infrastructure
**Scale/Scope**: Phase II only - single-user authentication with basic todo CRUD operations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Phase II Technology Compliance

- ✅ Backend: Python REST API (complies with Phase II requirement)
- ✅ Database: Neon Serverless PostgreSQL (complies with Phase II requirement)
- ✅ ORM/Data layer: SQLModel (complies with Phase II requirement)
- ✅ Frontend: Next.js (React, TypeScript) (complies with Phase II requirement)
- ✅ Authentication: Better Auth (signup/signin) (complies with Phase II requirement)
- ✅ Architecture: Full-stack web application (complies with Phase II requirement)

### Phase Isolation Principle

- ✅ No Phase I technologies leaking into Phase II (Phase I was console-only, Phase II is web)
- ✅ No Phase III+ features included (no AI, no agents, no advanced cloud infrastructure)
- ✅ Authentication is introduced in Phase II as specified
- ✅ Web frontend is introduced in Phase II as specified
- ✅ Neon PostgreSQL is introduced in Phase II as specified

### Core Principles Compliance

- ✅ Spec-driven development: Plan derived from spec.md and constitution
- ✅ Agent behavior: No feature invention beyond spec scope
- ✅ Quality principles: Clean architecture, stateless services, clear separation
- ✅ Implementation discipline: Smallest viable diff principle

### Constitution Gates

All gates PASSED. No violations detected. Planning can proceed.

## Project Structure

### Documentation (this feature)

```text
specs/1-phase2-todo-web/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
│   ├── api-contract.md
│   └── openapi.yaml
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── main.py           # FastAPI application entry point
│   ├── models/           # SQLModel data models
│   │   ├── __init__.py
│   │   ├── user.py       # User model
│   │   └── todo.py      # Todo model
│   ├── api/              # API routers/controllers
│   │   ├── __init__.py
│   │   ├── auth.py       # Authentication endpoints
│   │   └── todos.py      # Todo CRUD endpoints
│   ├── core/             # Core configuration and utilities
│   │   ├── __init__.py
│   │   ├── config.py     # Database and app configuration
│   │   ├── security.py   # Better Auth integration
│   │   └── deps.py      # Dependency injection
│   └── db.py            # Database connection management
├── requirements.txt      # Python dependencies
├── pyproject.toml       # Project metadata
└── tests/               # Backend tests
    ├── test_auth.py
    └── test_todos.py

frontend/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout with auth provider
│   │   ├── page.tsx       # Home page (redirects)
│   │   ├── (auth)/        # Auth routes group
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── signin/
│   │   │       └── page.tsx
│   │   ├── (todos)/       # Todo routes group
│   │   │   ├── page.tsx   # Todo list page
│   │   │   └── [id]/
│   │   │       ├── edit/    # Edit todo page
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx # View todo page
│   │   └── api/           # Next.js API routes (optional proxy)
│   ├── components/          # Reusable React components
│   │   ├── auth/
│   │   │   ├── SignUpForm.tsx
│   │   │   └── SignInForm.tsx
│   │   ├── todos/
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   └── EmptyState.tsx
│   │   └── ui/             # UI primitives
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Alert.tsx
│   ├── lib/
│   │   ├── api.ts           # API client functions
│   │   └── auth.ts         # Auth utilities
│   └── hooks/
│       ├── useAuth.ts        # Auth state hook
│       └── useTodos.ts      # Todo data hook
├── package.json
├── tsconfig.json
├── tailwind.config.ts      # Responsive design (optional)
└── tests/                  # Frontend tests
    └── components/
```

**Structure Decision**: Monorepo with separate backend and frontend directories. Backend uses Python/FastAPI with clean layered architecture. Frontend uses Next.js App Router with route groups for logical separation. Components organized by feature (auth, todos) with shared UI primitives.

## Complexity Tracking

No constitution violations requiring justification. Complexity is minimal and aligned with Phase II scope.

---

## Phase 0: Research Decisions

### Backend Framework Decision

**Decision**: Use FastAPI for Python REST API backend

**Rationale**:
- FastAPI is modern, fast, and provides automatic OpenAPI documentation
- Built-in data validation with Pydantic models aligns well with SQLModel
- Excellent TypeScript support for type safety
- Lightweight and easy to set up for Phase II scope
- Well-documented and widely adopted in the Python ecosystem

**Alternatives Considered**:
- Flask: Simpler but lacks built-in validation and async support
- Django: Too heavy for Phase II scope, includes many unnecessary features
- Express: Node.js framework, would violate Phase II Python backend requirement

### Authentication Integration Strategy

**Decision**: Integrate Better Auth as the authentication middleware

**Rationale**:
- Better Auth is specified in Phase II constitution as required technology
- Provides session-based authentication with secure token management
- Easy integration with FastAPI via middleware
- Built-in signup/signin flows reduce implementation time
- Supports secure password hashing out-of-the-box

**Implementation Approach**:
- Better Auth will handle session token generation and validation
- FastAPI dependency injection will provide current user to endpoints
- Session tokens stored in HTTP-only cookies for security
- Password hashing handled by Better Auth using bcrypt or similar

**Alternatives Considered**:
- Manual auth implementation: Re-inventing the wheel, security risks
- OAuth2 with third-party providers: Out of scope for Phase II (advanced auth)
- JWT tokens: Stateless but adds complexity for simple Phase II requirements

### Database Schema Management

**Decision**: Use Alembic for database migrations with SQLModel

**Rationale**:
- Alembic is the standard Python migration tool
- Works seamlessly with SQLModel
- Provides version control for database schema
- Easy to roll back migrations if needed
- Aligns with industry best practices for PostgreSQL

**Implementation Approach**:
- Each schema change generates a new migration file
- Migrations run automatically in development, manually in production
- Initial migration creates users and todos tables with foreign key relationship
- Migration files tracked in repository for reproducibility

**Alternatives Considered**:
- Manual SQL scripts: Error-prone, no version control
- SQLModel auto-create: No migration history, difficult to roll back

### Frontend State Management

**Decision**: Use React Context API + custom hooks for auth and todo state

**Rationale**:
- React Context is built-in and sufficient for Phase II scope
- No external state management library needed (no Redux, Zustand)
- Custom hooks provide clean separation of concerns
- Next.js Server Components reduce need for client-side state
- Keeps bundle size minimal

**Implementation Approach**:
- `AuthContext` provides authentication state to all components
- `useAuth()` hook wraps Context for easy access
- `useTodos()` hook encapsulates API calls for todo data
- React Query or SWR not needed for simple Phase II operations

**Alternatives Considered**:
- Redux: Overkill for Phase II, adds boilerplate
- Zustand: Good but unnecessary for simple auth/todo state
- Server Actions (Next.js): Could work but adds complexity for learning

### Responsive UI Strategy

**Decision**: Use CSS Grid and Flexbox with Tailwind CSS (optional) or plain CSS

**Rationale**:
- Native CSS Grid/Flexbox provide responsive capabilities
- Tailwind CSS speeds up development with utility classes
- Mobile-first approach: design for mobile, enhance for larger screens
- Media queries for breakpoint handling
- Touch-friendly tap targets (minimum 44x44px) for mobile

**Breakpoints**:
- Mobile: 375px - 768px
- Tablet: 769px - 1024px
- Desktop: 1025px+

**Alternatives Considered**:
- Bootstrap: Heavy framework, not aligned with modern React practices
- Material UI: More complex than needed for Phase II

### API Communication Strategy

**Decision**: Direct REST API calls from frontend to backend with fetch-based client

**Rationale**:
- Simple and straightforward for Phase II requirements
- No need for GraphQL (single resource types, complex queries not required)
- Fetch API is native to browsers
- Custom error handling wrapper provides consistent error messages
- Session-based auth means no token management in client code

**Implementation Approach**:
- `api.ts` module contains typed functions for each endpoint
- Each function returns typed data using TypeScript interfaces
- Error handling wrapper throws descriptive errors for UI display
- Session cookies automatically sent by browser (HTTP-only)

**Alternatives Considered**:
- Axios: Popular but adds dependency, fetch is sufficient
- GraphQL: Overkill for simple CRUD operations
- Next.js API routes proxy: Unnecessary indirection

### Error Handling and Validation Strategy

**Backend**:
- Use Pydantic models for request validation (built into FastAPI/SQLModel)
- Return 400 with validation error details on invalid input
- Return 401 on unauthorized access
- Return 404 on not found (wrong user or deleted)
- Return 500 with generic message on server errors (log details)

**Frontend**:
- Inline validation on form inputs (email regex, password length, title presence)
- Display error messages from API responses
- Network error handling with retry UI
- User-friendly error messages (not technical stack traces)

### Local Development Setup

**Decision**: Docker Compose for backend services, dev servers for frontend

**Rationale**:
- Docker Compose simplifies Neon PostgreSQL local setup
- Backend runs in Docker with hot reload for development
- Frontend runs with `npm run dev` for HMR (Hot Module Replacement)
- Separate processes but easy to start together with single command
- Neon can be swapped with local Postgres in Docker for offline dev

**Implementation Approach**:
- `docker-compose.yml` defines backend service
- `.env` files for configuration (not committed)
- Script to start both backend and frontend
- CORS enabled for local development only

**Alternatives Considered**:
- Everything in Docker: Slower frontend HMR
- No Docker: Harder to run local Postgres

---

## Phase 1: Data Model

### User Entity

```python
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    todos: List["Todo"] = Relationship(back_populates="user")
```

**Fields**:
- `id`: Primary key, auto-generated
- `email`: Unique identifier, indexed for fast lookup
- `hashed_password`: Securely hashed password (bcrypt/argon2)
- `created_at`: Account creation timestamp
- `todos`: One-to-many relationship to Todo entity

**Validation Rules**:
- Email format: standard regex pattern
- Password: minimum 8 characters (enforced before hashing)
- Email uniqueness: enforced at database level

### Todo Entity

```python
class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=500)
    description: Optional[str] = None
    completed: bool = Field(default=False)
    user_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user: User = Relationship(back_populates="todos")
```

**Fields**:
- `id`: Primary key, auto-generated
- `title`: Required, max 500 characters
- `description`: Optional text field
- `completed`: Boolean, default False
- `user_id`: Foreign key to User entity
- `created_at`: Todo creation timestamp
- `updated_at`: Last modification timestamp
- `user`: Many-to-one relationship to User entity

**Validation Rules**:
- Title: required, non-empty, max 500 characters
- Description: optional, no length limit (Postgres handles large text)

### Relationships

**User → Todo**: One-to-Many
- One user can have many todos
- Each todo belongs to exactly one user
- Cascade delete: When user is deleted, their todos are deleted
- Foreign key constraint ensures referential integrity

---

## Phase 1: API Contracts

### Endpoints Overview

#### Authentication Endpoints

| Method | Path | Purpose | Auth Required |
|--------|------|---------|---------------|
| POST | `/api/auth/signup` | Create user account | No |
| POST | `/api/auth/signin` | Authenticate user | No |
| POST | `/api/auth/signout` | Invalidate session | Yes |

#### Todo Endpoints

| Method | Path | Purpose | Auth Required |
|--------|------|---------|---------------|
| GET | `/api/todos` | List all todos for user | Yes |
| POST | `/api/todos` | Create new todo | Yes |
| GET | `/api/todos/{id}` | Get specific todo | Yes |
| PUT | `/api/todos/{id}` | Update specific todo | Yes |
| DELETE | `/api/todos/{id}` | Delete specific todo | Yes |
| PATCH | `/api/todos/{id}/toggle` | Toggle completion status | Yes |

### Request/Response Schemas

#### POST /api/auth/signup

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (201)**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "created_at": "2025-12-29T12:00:00Z"
}
```

**Error Responses**:
- 400: Invalid email format or password too short
- 409: Email already exists

#### POST /api/auth/signin

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200)**:
```json
{
  "id": 1,
  "email": "user@example.com"
}
```

**Error Responses**:
- 400: Invalid credentials
- 401: Unauthorized (wrong email/password)

#### GET /api/todos

**Request**: None (uses session cookie)

**Response (200)**:
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
    }
  ]
}
```

#### POST /api/todos

**Request**:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response (201)**:
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
- 400: Invalid input (empty title, title too long)

#### PUT /api/todos/{id}

**Request**:
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

**Response (200)**:
```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "completed": false,
  "created_at": "2025-12-29T12:00:00Z",
  "updated_at": "2025-12-29T12:05:00Z"
}
```

**Error Responses**:
- 400: Invalid input (empty title)
- 404: Todo not found or belongs to different user

#### DELETE /api/todos/{id}

**Request**: None

**Response (204)**: No content

**Error Responses**:
- 404: Todo not found or belongs to different user

#### PATCH /api/todos/{id}/toggle

**Request**: None

**Response (200)**:
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": true,
  "created_at": "2025-12-29T12:00:00Z",
  "updated_at": "2025-12-29T12:05:00Z"
}
```

**Error Responses**:
- 404: Todo not found or belongs to different user

---

## Phase 1: Quickstart Guide

### Prerequisites

- Python 3.11+
- Node.js 18+
- Neon PostgreSQL account (or local Postgres for dev)
- Git

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your DATABASE_URL
   ```

5. **Run database migrations**:
   ```bash
   alembic upgrade head
   ```

6. **Start backend server**:
   ```bash
   uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
   ```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with BACKEND_URL=http://localhost:8000
   ```

4. **Start frontend server**:
   ```bash
   npm run dev
   ```

Frontend will be available at `http://localhost:3000`

### Quick Test

1. Open `http://localhost:3000/signup` in browser
2. Create account with email and password (min 8 chars)
3. Sign in with created credentials
4. Create a todo by clicking "Add Todo"
5. Toggle completion by clicking checkbox
6. Edit todo by clicking "Edit" button
7. Delete todo by clicking "Delete" button
8. Sign out and verify session is terminated

### Using Docker (Alternative Backend)

If using Docker Compose for backend:

1. **Start backend with Docker**:
   ```bash
   docker-compose up -d
   ```

2. **Run migrations**:
   ```bash
   docker-compose exec backend alembic upgrade head
   ```

### Troubleshooting

**Database connection errors**:
- Verify `DATABASE_URL` in `.env` is correct
- Check Neon console for connection string
- Ensure firewall allows outbound PostgreSQL connections

**CORS errors in browser**:
- Backend CORS settings should allow `http://localhost:3000`
- Check backend logs for CORS configuration errors

**Authentication not persisting**:
- Ensure HTTP-only cookies are enabled in backend
- Verify frontend is not using credentials: 'omit' in fetch calls
- Check browser's Application > Cookies tab for session cookie

---

## Constitution Check - Post Design

*Re-evaluating gates after Phase 1 design*

### Phase II Technology Compliance - VERIFIED ✅

- ✅ Backend: Python REST API with FastAPI - COMPLIES
- ✅ Database: Neon Serverless PostgreSQL - COMPLIES
- ✅ ORM/Data layer: SQLModel with Alembic migrations - COMPLIES
- ✅ Frontend: Next.js (React, TypeScript) - COMPLIES
- ✅ Authentication: Better Auth integration - COMPLIES
- ✅ Architecture: Full-stack web application with separate backend/frontend - COMPLIES

### Phase Isolation Principle - VERIFIED ✅

- ✅ No Phase I technologies (console-only) present
- ✅ No Phase III+ features (AI, agents, advanced cloud) present
- ✅ Authentication introduced exactly as specified in Phase II
- ✅ Web frontend introduced exactly as specified in Phase II
- ✅ Neon PostgreSQL introduced exactly as specified in Phase II

### Architecture Review - VERIFIED ✅

- ✅ Clean separation: API layer, business logic (models), data layer
- ✅ Stateless REST API with session-based auth
- ✅ Data isolation: User-todo relationship enforced at database level
- ✅ No unnecessary abstractions for Phase II scope

### Final Gates Status

**ALL GATES PASSED** ✅

No violations detected. Design is ready for task generation (`/sp.tasks`).

---

## Architectural Decision Recommendations

Based on this plan, the following Architectural Decision Records (ADRs) are recommended:

**📋 Architectural decision detected: Full-stack separation with Python backend and Next.js frontend**
Document reasoning and tradeoffs? Run `/sp.adr full-stack-architecture`

**📋 Architectural decision detected: Session-based authentication with Better Auth**
Document reasoning and tradeoffs? Run `/sp.adr better-auth-integration`

**📋 Architectural decision detected: SQLModel ORM with Alembic migrations for Neon PostgreSQL**
Document reasoning and tradeoffs? Run `/sp.adr orm-migration-strategy`

These decisions have significant long-term implications for the application architecture, authentication patterns, and data management. Creating ADRs is optional but recommended for future reference and team onboarding.
