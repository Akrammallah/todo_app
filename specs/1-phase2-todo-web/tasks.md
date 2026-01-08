# Tasks: Phase II - Full-Stack Web Todo Application

**Input**: Design documents from `/specs/1-phase2-todo-web/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT included in Phase II tasks (not explicitly requested in specification)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths follow the plan.md structure
- All tasks reference specific file paths for implementation

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for both backend and frontend

- [ ] T001 Create backend directory structure: backend/src/{models,api,core}, backend/tests
- [ ] T002 Create frontend directory structure: frontend/src/{app,components,lib,hooks}, frontend/tests
- [ ] T003 [P] Initialize Python project in backend/ with pyproject.toml
- [ ] T004 [P] Create backend/requirements.txt with FastAPI, SQLModel, Better Auth, uvicorn, alembic, psycopg2
- [ ] T005 [P] Initialize Next.js project in frontend/ with TypeScript
- [ ] T006 [P] Create frontend/package.json with Next.js 14+, React 18+, TypeScript dependencies
- [ ] T007 [P] Configure Python virtual environment in .venv (backend/)
- [ ] T008 [P] Configure Node.js environment with node_modules (frontend/)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 [P] Create backend/src/db.py with Neon PostgreSQL connection management
- [ ] T010 [P] Create backend/src/core/config.py with DATABASE_URL, SECRET_KEY, ALLOWED_ORIGINS environment variables
- [ ] T011 Setup Alembic in backend/ for database migrations
- [ ] T012 Create initial Alembic migration for users and todos tables
- [ ] T013 [P] Create backend/src/core/security.py with Better Auth integration and session management
- [ ] T014 [P] Create backend/src/core/deps.py with dependency injection for database sessions and current user
- [ ] T015 [P] Create backend/src/models/__init__.py for model exports
- [ ] T016 [P] Create backend/src/models/user.py with User SQLModel (id, email, hashed_password, created_at)
- [ ] T017 [P] Create backend/src/models/todo.py with Todo SQLModel (id, title, description, completed, user_id, created_at, updated_at)
- [ ] T018 [P] Create backend/src/api/__init__.py for router exports
- [ ] T019 Create backend/src/api/auth.py with FastAPI router for authentication endpoints
- [ ] T020 Create backend/src/api/todos.py with FastAPI router for todo CRUD endpoints
- [ ] T021 Create backend/src/core/__init__.py for core module exports
- [ ] T022 Create backend/src/main.py with FastAPI app initialization, CORS middleware, and router inclusion
- [ ] T023 [P] Create frontend/src/lib/api.ts with fetch-based API client wrapper for all endpoints
- [ ] T024 [P] Create frontend/src/lib/auth.ts with auth utility functions (signup, signin, signout)
- [ ] T025 [P] Create frontend/src/hooks/useAuth.ts with React Context for authentication state management
- [ ] T026 [P] Create frontend/src/app/layout.tsx with AuthProvider for global auth state
- [ ] T027 Create frontend/src/app/page.tsx with home page redirecting authenticated users to /todos, unauthenticated to /signin
- [ ] T028 [P] Create backend/.env.example with DATABASE_URL, SECRET_KEY, ALLOWED_ORIGINS, SESSION_SECRET
- [ ] T029 [P] Create frontend/.env.example with NEXT_PUBLIC_BACKEND_URL
- [ ] T030 [P] Create backend/.gitignore for Python (venv/, __pycache__/, .env)
- [ ] T031 [P] Create frontend/.gitignore for Next.js (node_modules/, .next/, .env.local)
- [ ] T032 Create backend/error handling middleware in backend/src/core/security.py for consistent error responses (400, 401, 404, 500)
- [ ] T033 [P] Create frontend/src/components/ui/Alert.tsx component for displaying error messages
- [ ] T034 [P] Create frontend/src/components/ui/Button.tsx component for buttons
- [ ] T035 [P] Create frontend/src/components/ui/Input.tsx component for form inputs

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Sign Up (Priority: P1) 🎯 MVP

**Goal**: Enable new users to create accounts and automatically sign in

**Independent Test**: A new user can successfully create an account by providing valid credentials and immediately access the application (redirected to todos page)

### Implementation for User Story 1

- [ ] T036 [US1] Implement POST /api/auth/signup endpoint in backend/src/api/auth.py with email validation (regex) and password validation (min 8 chars)
- [ ] T037 [US1] Implement password hashing in POST /api/auth/signup using bcrypt before storing in database
- [ ] T038 [US1] Implement email uniqueness check in POST /api/auth/signup to prevent duplicate emails
- [ ] T039 [US1] Implement session creation in POST /api/auth/signup to automatically authenticate new user
- [ ] T040 [US1] Implement response model for signup returning user id, email, created_at (status 201)
- [ ] T041 [US1] Implement error responses in POST /api/auth/signup for invalid email (400), short password (400), duplicate email (409)
- [ ] T042 [US1] Create frontend/src/app/(auth)/signup/page.tsx page with sign-up form
- [ ] T043 [US1] Create frontend/src/components/auth/SignUpForm.tsx component with email and password inputs
- [ ] T044 [US1] Implement inline email validation in frontend/src/components/auth/SignUpForm.tsx (regex pattern check before submit)
- [ ] T045 [US1] Implement inline password validation in frontend/src/components/auth/SignUpForm.tsx (min 8 chars check before submit)
- [ ] T046 [US1] Implement signup API call in frontend/src/components/auth/SignUpForm.tsx using lib/api.ts
- [ ] T047 [US1] Implement successful signup redirect in frontend/src/components/auth/SignUpForm.tsx to /todos page
- [ ] T048 [US1] Implement duplicate email error display in frontend/src/components/auth/SignUpForm.tsx with sign-in suggestion
- [ ] T049 [US1] Implement validation error display in frontend/src/components/auth/SignUpForm.tsx for invalid email/password
- [ ] T050 [US1] Update frontend/src/hooks/useAuth.ts to set auth state on successful signup

**Checkpoint**: At this point, User Story 1 should be fully functional - new users can sign up, create accounts, and automatically sign in

---

## Phase 4: User Story 2 - User Sign In (Priority: P1) 🎯 MVP

**Goal**: Enable registered users to sign in and access their personal todos

**Independent Test**: A registered user can successfully sign in with valid credentials and immediately see their todos (if any exist)

### Implementation for User Story 2

- [ ] T051 [US2] Implement POST /api/auth/signin endpoint in backend/src/api/auth.py with credential validation
- [ ] T052 [US2] Implement password verification in POST /api/auth/signin using bcrypt hash comparison
- [ ] T053 [US2] Implement session creation in POST /api/auth/signin to authenticate user
- [ ] T054 [US2] Implement response model for signin returning user id, email (status 200)
- [ ] T055 [US2] Implement error responses in POST /api/auth/signin for invalid credentials (401)
- [ ] T056 [US2] Create frontend/src/app/(auth)/signin/page.tsx page with sign-in form
- [ ] T057 [US2] Create frontend/src/components/auth/SignInForm.tsx component with email and password inputs
- [ ] T058 [US2] Implement signin API call in frontend/src/components/auth/SignInForm.tsx using lib/api.ts
- [ ] T059 [US2] Implement successful signin redirect in frontend/src/components/auth/SignInForm.tsx to /todos page
- [ ] T060 [US2] Implement invalid credentials error display in frontend/src/components/auth/SignInForm.tsx
- [ ] T061 [US2] Update frontend/src/hooks/useAuth.ts to set auth state on successful signin
- [ ] T062 [US2] Implement authentication middleware in backend/src/main.py to protect todo endpoints (check session)
- [ ] T063 [US2] Implement redirect to /signin in frontend/src/app/page.tsx for unauthenticated users
- [ ] T064 [US2] Implement redirect to /todos in frontend/src/app/(auth)/signin/page.tsx for authenticated users

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - users can sign up, sign in, and be redirected to todos page

---

## Phase 5: User Story 9 - Sign Out (Priority: P3)

**Goal**: Enable authenticated users to securely sign out and terminate their session

**Independent Test**: A signed-in user can click sign out button, session is terminated, and they are redirected to sign-in page

### Implementation for User Story 9

- [ ] T065 [US9] Implement POST /api/auth/signout endpoint in backend/src/api/auth.py to invalidate session
- [ ] T066 [US9] Implement response for POST /api/auth/signout returning 204 No Content
- [ ] T067 [US9] Implement error response for POST /api/auth/signout when not authenticated (401)
- [ ] T068 [US9] Add sign out button to frontend/src/app/layout.tsx header/navigation
- [ ] T069 [US9] Implement signout API call in frontend/src/app/layout.tsx using lib/auth.ts
- [ ] T070 [US9] Implement successful signout redirect in frontend/src/app/layout.tsx to /signin page
- [ ] T071 [US9] Update frontend/src/hooks/useAuth.ts to clear auth state on signout

**Checkpoint**: At this point, Users 1, 2, AND 9 should work - full auth flow: sign up, sign in, access todos, sign out

---

## Phase 6: User Story 3 - View All Todos (Priority: P2) 🎯 MVP

**Goal**: Enable authenticated users to view all their todos in a list with empty state handling

**Independent Test**: A signed-in user can see a complete list of their todos with title, status, and metadata, or a friendly empty state message when no todos exist

### Implementation for User Story 3

- [ ] T072 [US3] Implement GET /api/todos endpoint in backend/src/api/todos.py to fetch all todos for authenticated user
- [ ] T073 [US3] Implement user-scoped query in GET /api/todos using session user_id (WHERE user_id = current_user.id)
- [ ] T074 [US3] Implement response model for GET /api/todos returning array of todos with id, title, description, completed, created_at, updated_at (status 200)
- [ ] T075 [US3] Implement empty array response in GET /api/todos when user has no todos
- [ ] T076 [US3] Implement error response in GET /api/todos when not authenticated (401)
- [ ] T077 [US3] Create frontend/src/app/(todos)/page.tsx todo list page
- [ ] T078 [US3] Create frontend/src/components/todos/TodoList.tsx component to display todo array
- [ ] T079 [US3] Implement GET /api/todos API call in frontend/src/app/(todos)/page.tsx using lib/api.ts
- [ ] T080 [US3] Implement todo list rendering in frontend/src/components/todos/TodoList.tsx showing title, description, completed status
- [ ] T081 [US3] Implement empty state display in frontend/src/components/todos/TodoList.tsx with friendly message when todos array is empty
- [ ] T082 [US3] Implement visual distinction in frontend/src/components/todos/TodoList.tsx between completed and incomplete todos (strikethrough, color)
- [ ] T083 [US3] Update frontend/src/hooks/useTodos.ts to fetch todos on mount and return todos array
- [ ] T084 [US3] Integrate useTodos hook in frontend/src/app/(todos)/page.tsx

**Checkpoint**: At this point, Users 1, 2, 9, AND 3 work - users can auth and view their todo list (empty or populated)

---

## Phase 7: User Story 4 - Create Todo (Priority: P2) 🎯 MVP

**Goal**: Enable authenticated users to create new todos with title and optional description

**Independent Test**: A signed-in user can create a new todo through a form, which immediately appears in their todo list

### Implementation for User Story 4

- [ ] T085 [US4] Implement POST /api/todos endpoint in backend/src/api/todos.py to create new todo
- [ ] T086 [US4] Implement user association in POST /api/todos setting user_id from session to current user
- [ ] T087 [US4] Implement title validation in POST /api/todos (required, max 500 chars)
- [ ] T088 [US4] Implement description handling in POST /api/todos (optional, no length limit)
- [ ] T089 [US4] Implement default completed=False in POST /api/todos for new todos
- [ ] T090 [US4] Implement response model for POST /api/todos returning created todo with id, title, description, completed, created_at, updated_at (status 201)
- [ ] T091 [US4] Implement error responses in POST /api/todos for invalid input (400), not authenticated (401)
- [ ] T092 [US4] Create frontend/src/components/todos/TodoForm.tsx component with title and description inputs
- [ ] T093 [US4] Implement inline title validation in frontend/src/components/todos/TodoForm.tsx (required, max 500 chars)
- [ ] T094 [US4] Implement POST /api/todos API call in frontend/src/components/todos/TodoForm.tsx using lib/api.ts
- [ ] T095 [US4] Implement successful todo creation in frontend/src/components/todos/TodoForm.tsx with redirect to /todos page
- [ ] T096 [US4] Implement validation error display in frontend/src/components/todos/TodoForm.tsx for empty title or too long title
- [ ] T097 [US4] Integrate TodoForm component in frontend/src/app/(todos)/page.tsx (add button to open form)
- [ ] T098 [US4] Update frontend/src/hooks/useTodos.ts to refresh todos after successful creation

**Checkpoint**: At this point, Users 1, 2, 3, 4, AND 9 work - full MVP: auth, view todos, create todos

---

## Phase 8: User Story 7 - Toggle Todo Completion (Priority: P2)

**Goal**: Enable authenticated users to toggle todo completion status with a single action

**Independent Test**: A signed-in user can toggle a todo's completion status by clicking checkbox, and the change is immediately reflected in the UI

### Implementation for User Story 7

- [ ] T099 [US7] Implement PATCH /api/todos/{id}/toggle endpoint in backend/src/api/todos.py to toggle completed status
- [ ] T100 [US7] Implement user ownership check in PATCH /api/todos/{id}/toggle (WHERE id = ? AND user_id = current_user.id)
- [ ] T101 [US7] Implement toggle logic in PATCH /api/todos/{id}/toggle (completed = NOT completed)
- [ ] T102 [US7] Implement updated_at timestamp update in PATCH /api/todos/{id}/toggle
- [ ] T103 [US7] Implement response model for PATCH /api/todos/{id}/toggle returning updated todo with id, title, description, completed, created_at, updated_at (status 200)
- [ ] T104 [US7] Implement error responses in PATCH /api/todos/{id}/toggle for not found (404), not authorized (401)
- [ ] T105 [US7] Create frontend/src/components/todos/TodoItem.tsx component to display single todo
- [ ] T106 [US7] Implement checkbox/button in frontend/src/components/todos/TodoItem.tsx to toggle completion
- [ ] T107 [US7] Implement PATCH /api/todos/{id}/toggle API call in frontend/src/components/todos/TodoItem.tsx using lib/api.ts
- [ ] T108 [US7] Implement visual update in frontend/src/components/todos/TodoItem.tsx after successful toggle (strikethrough/color change)
- [ ] T109 [US7] Implement error display in frontend/src/components/todos/TodoItem.tsx for not found or unauthorized
- [ ] T110 [US7] Replace frontend/src/components/todos/TodoList.tsx to use TodoItem component for each todo
- [ ] T111 [US7] Update frontend/src/hooks/useTodos.ts to update single todo after successful toggle (optimistic update)

**Checkpoint**: At this point, Users 1, 2, 3, 4, 7, AND 9 work - users can auth, view, create, and toggle todos

---

## Phase 9: User Story 5 - Edit Todo (Priority: P2)

**Goal**: Enable authenticated users to modify existing todo titles and descriptions

**Independent Test**: A signed-in user can edit an existing todo, save changes, and see the updated information reflected in their todo list

### Implementation for User Story 5

- [ ] T112 [US5] Implement PUT /api/todos/{id} endpoint in backend/src/api/todos.py to update existing todo
- [ ] T113 [US5] Implement user ownership check in PUT /api/todos/{id} (WHERE id = ? AND user_id = current_user.id)
- [ ] T114 [US5] Implement title validation in PUT /api/todos/{id} (required, max 500 chars)
- [ ] T115 [US5] Implement description update in PUT /api/todos/{id} (optional, no length limit)
- [ ] T116 [US5] Implement updated_at timestamp update in PUT /api/todos/{id}
- [ ] T117 [US5] Implement completion status preservation in PUT /api/todos/{id} (don't change completed field)
- [ ] T118 [US5] Implement response model for PUT /api/todos/{id} returning updated todo with id, title, description, completed, created_at, updated_at (status 200)
- [ ] T119 [US5] Implement error responses in PUT /api/todos/{id} for invalid input (400), not found (404), not authorized (401)
- [ ] T120 [US5] Create frontend/src/app/(todos)/[id]/edit/page.tsx edit todo page
- [ ] T121 [US5] Implement GET /api/todos/{id} endpoint in backend/src/api/todos.py to fetch single todo
- [ ] T122 [US5] Implement user ownership check in GET /api/todos/{id} (WHERE id = ? AND user_id = current_user.id)
- [ ] T123 [US5] Implement response model for GET /api/todos/{id} returning todo with id, title, description, completed, created_at, updated_at (status 200)
- [ ] T124 [US5] Implement error response for GET /api/todos/{id} for not found (404), not authorized (401)
- [ ] T125 [US5] Implement GET /api/todos/{id} API call in frontend/src/app/(todos)/[id]/edit/page.tsx to fetch existing todo
- [ ] T126 [US5] Reuse frontend/src/components/todos/TodoForm.tsx component with title and description inputs (pre-filled from fetched todo)
- [ ] T127 [US5] Implement PUT /api/todos/{id} API call in frontend/src/app/(todos)/[id]/edit/page.tsx using lib/api.ts
- [ ] T128 [US5] Implement successful edit redirect in frontend/src/app/(todos)/[id]/edit/page.tsx to /todos page
- [ ] T129 [US5] Implement validation error display in frontend/src/app/(todos)/[id]/edit/page.tsx for empty title
- [ ] T130 [US5] Implement cancel edit functionality in frontend/src/app/(todos)/[id]/edit/page.tsx (redirect to /todos without saving)
- [ ] T131 [US5] Update frontend/src/hooks/useTodos.ts to refresh todos after successful edit

**Checkpoint**: At this point, Users 1, 2, 3, 4, 5, 7, AND 9 work - users can auth, view, create, edit, and toggle todos

---

## Phase 10: User Story 6 - Delete Todo (Priority: P2)

**Goal**: Enable authenticated users to permanently remove todos with confirmation

**Independent Test**: A signed-in user can delete an existing todo after confirming the action, and the item is permanently removed from their list

### Implementation for User Story 6

- [ ] T132 [US6] Implement DELETE /api/todos/{id} endpoint in backend/src/api/todos.py to delete existing todo
- [ ] T133 [US6] Implement user ownership check in DELETE /api/todos/{id} (WHERE id = ? AND user_id = current_user.id)
- [ ] T134 [US6] Implement response for DELETE /api/todos/{id} returning 204 No Content
- [ ] T135 [US6] Implement error response for DELETE /api/todos/{id} for not found (404), not authorized (401)
- [ ] T136 [US6] Add delete button to frontend/src/components/todos/TodoItem.tsx component
- [ ] T137 [US6] Implement confirmation dialog in frontend/src/components/todos/TodoItem.tsx before delete (use browser confirm() or custom modal)
- [ ] T138 [US6] Implement DELETE /api/todos/{id} API call in frontend/src/components/todos/TodoItem.tsx using lib/api.ts
- [ ] T139 [US6] Implement successful delete in frontend/src/components/todos/TodoItem.tsx with immediate removal from UI
- [ ] T140 [US6] Implement cancel delete functionality in frontend/src/components/todos/TodoItem.tsx (no action taken)
- [ ] T141 [US6] Implement error display in frontend/src/components/todos/TodoItem.tsx for not found or unauthorized
- [ ] T142 [US6] Update frontend/src/hooks/useTodos.ts to refresh todos after successful delete

**Checkpoint**: At this point, all CRUD operations work - Users 1, 2, 3, 4, 5, 6, 7, AND 9 complete

---

## Phase 11: User Story 8 - Responsive Design (Priority: P3)

**Goal**: Enable the application to display and function correctly on desktop, tablet, and mobile screen sizes

**Independent Test**: The application displays and functions correctly on desktop (1920x1080), tablet (768x1024), and mobile (375x667) screen sizes

### Implementation for User Story 8

- [ ] T143 [US8] Implement CSS Grid layout in frontend/src/app/(todos)/page.tsx for desktop view
- [ ] T144 [US8] Implement CSS Flexbox layout in frontend/src/app/(todos)/page.tsx for mobile view
- [ ] T145 [US8] Implement media queries in frontend/src/app/(todos)/page.tsx with breakpoints: mobile (375-768px), tablet (769-1024px), desktop (1025px+)
- [ ] T146 [US8] Implement touch-friendly tap targets (min 44x44px) in frontend/src/components/todos/TodoItem.tsx for mobile
- [ ] T147 [US8] Implement touch-friendly tap targets (min 44x44px) in frontend/src/components/ui/Button.tsx for mobile
- [ ] T148 [US8] Implement stacked content layout in frontend/src/components/todos/TodoList.tsx for mobile screens
- [ ] T149 [US8] Implement horizontal layout in frontend/src/components/todos/TodoList.tsx for desktop/tablet screens
- [ ] T150 [US8] Implement responsive navigation in frontend/src/app/layout.tsx adapting to mobile (hamburger menu or simplified nav)
- [ ] T151 [US8] Apply responsive design to frontend/src/app/(auth)/signup/page.tsx
- [ ] T152 [US8] Apply responsive design to frontend/src/app/(auth)/signin/page.tsx
- [ ] T153 [US8] Apply responsive design to frontend/src/app/(todos)/[id]/edit/page.tsx
- [ ] T154 [US8] Implement orientation change handling in frontend/src/app/(todos)/page.tsx (graceful adjustment on device rotate)
- [ ] T155 [US8] Test responsive behavior on all three breakpoints (mobile, tablet, desktop)

**Checkpoint**: All Phase II user stories complete - Users 1, 2, 3, 4, 5, 6, 7, 8, AND 9 work

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T156 [P] Update backend/.env.example with detailed comments for each environment variable
- [ ] T157 [P] Update frontend/.env.example with detailed comments for each environment variable
- [ ] T158 [P] Add comprehensive error messages in backend error handling middleware for all error scenarios (network, server, validation)
- [ ] T159 [P] Add loading states in frontend/src/hooks/useAuth.ts during auth operations
- [ ] T160 [P] Add loading states in frontend/src/hooks/useTodos.ts during API calls
- [ ] T161 [P] Implement network error handling in frontend/src/lib/api.ts with retry UI
- [ ] T162 [P] Implement session expiration handling in frontend/src/hooks/useAuth.ts (redirect to signin on 401)
- [ ] T163 [P] Add accessibility attributes (aria-labels, roles) to frontend/src/components/todos/TodoItem.tsx
- [ ] T164 [P] Add accessibility attributes (aria-labels, roles) to frontend/src/components/todos/TodoForm.tsx
- [ ] T165 [P] Add accessibility attributes (aria-labels, roles) to frontend/src/components/auth/SignUpForm.tsx
- [ ] T166 [P] Add accessibility attributes (aria-labels, roles) to frontend/src/components/auth/SignInForm.tsx
- [ ] T167 [P] Improve visual distinction of completed todos in frontend/src/components/todos/TodoItem.tsx (color badge, strikethrough)
- [ ] T168 Update backend/README.md with setup and development instructions
- [ ] T169 Update frontend/README.md with setup and development instructions
- [ ] T170 Create DEVELOPMENT.md in repository root with local development setup guide
- [ ] T171 Validate quickstart.md steps work correctly with current implementation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-11)**: All depend on Foundational phase completion
  - User stories can then proceed in priority order: P1 → P2 → P3
  - P1 Stories (US1, US2) are MVP - complete these first for basic functionality
  - P2 Stories (US3-US7) complete the todo CRUD experience
  - P3 Stories (US8, US9) polish the experience
- **Polish (Phase 12)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Sign Up)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1 - Sign In)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 9 (P3 - Sign Out)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2 - View Todos)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P2 - Create Todo)**: Can start after Foundational (Phase 2) - Integrates with US3 list view
- **User Story 7 (P2 - Toggle)**: Can start after Foundational (Phase 2) - Integrates with US3 list view and US4 todo items
- **User Story 5 (P2 - Edit)**: Can start after Foundational (Phase 2) - Integrates with US3 list view
- **User Story 6 (P2 - Delete)**: Can start after Foundational (Phase 2) - Integrates with US3 list view
- **User Story 8 (P3 - Responsive)**: Can start after Foundational (Phase 2) - Applies to all existing UI
  - US8 is cross-cutting: applies responsive design to all components created in previous stories

### Within Each User Story

- All backend endpoint tasks before frontend component tasks
- API implementation before UI implementation
- Error handling and validation integrated with each task
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T001-T008) can run in parallel
- All Foundational backend tasks (T009-T022) can run in parallel
- All Foundational frontend tasks (T023-T035) can run in parallel
- Within a user story, backend endpoint tasks and frontend component tasks can proceed in parallel
- Polish phase tasks (T156-T171) can run in parallel
- US8 (Responsive) tasks can run in parallel after all UI components exist

---

## Parallel Example: Foundational Phase

```bash
# Launch all backend foundational tasks together:
Task: "Create backend/src/db.py with Neon PostgreSQL connection management"
Task: "Create backend/src/core/config.py with DATABASE_URL, SECRET_KEY, ALLOWED_ORIGINS"
Task: "Setup Alembic in backend/ for database migrations"
Task: "Create backend/src/core/security.py with Better Auth integration"

# Launch all frontend foundational tasks together:
Task: "Create frontend/src/lib/api.ts with fetch-based API client wrapper"
Task: "Create frontend/src/lib/auth.ts with auth utility functions"
Task: "Create frontend/src/hooks/useAuth.ts with React Context for authentication"
Task: "Create frontend/src/app/layout.tsx with AuthProvider for global auth state"
```

---

## Implementation Strategy

### MVP First (P1 Stories Only - User Sign Up & Sign In)

1. Complete Phase 1: Setup (T001-T008)
2. Complete Phase 2: Foundational (T009-T035) - **CRITICAL - blocks all stories**
3. Complete Phase 3: User Story 1 - Sign Up (T036-T050)
4. Complete Phase 4: User Story 2 - Sign In (T051-T064)
5. **STOP and VALIDATE**: Test signup and signin flows independently
6. Deploy/demo basic authentication if ready

### MVP Extended (Add P2 Stories - View, Create, Toggle)

1. Complete Phase 5: User Story 9 - Sign Out (T065-T071)
2. Complete Phase 6: User Story 3 - View Todos (T072-T084)
3. Complete Phase 7: User Story 4 - Create Todo (T085-T098)
4. Complete Phase 8: User Story 7 - Toggle (T099-T111)
5. **STOP and VALIDATE**: Full todo CRUD workflow (auth + view + create + toggle)
6. Deploy/demo extended MVP with basic todo operations

### Complete Phase II (Add P2 Edit/Delete + P3 Polish)

1. Complete Phase 9: User Story 5 - Edit (T112-T131)
2. Complete Phase 10: User Story 6 - Delete (T132-T142)
3. Complete Phase 11: User Story 8 - Responsive (T143-T155)
4. Complete Phase 12: Polish & Cross-Cutting Concerns (T156-T171)
5. **FINAL VALIDATION**: All 9 user stories work independently and together
6. Final deployment/demo of complete Phase II application

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 + US2 (P1) → Test independently → Demo auth flows
3. Add US9 (P3) → Test independently → Demo full auth lifecycle
4. Add US3 + US4 + US7 (P2) → Test independently → Demo basic todo CRUD
5. Add US5 + US6 (P2) → Test independently → Demo complete todo CRUD
6. Add US8 (P3) → Test independently → Demo responsive design
7. Polish & Cross-Cutting → Final production-ready application

Each phase adds value without breaking previous functionality.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T035)
2. Once Foundational is done:
   - Developer A: User Stories 1 & 2 (P1 - Auth: T036-T064)
   - Developer B: User Stories 9 & 3 (P3+P2 - Sign Out + View: T065-T084)
   - Developer C: User Stories 4 & 7 (P2 - Create + Toggle: T085-T111)
3. After P1 and partial P2 complete:
   - Developer A: User Stories 5 & 6 (P2 - Edit + Delete: T112-T142)
   - Developer B: User Story 8 (P3 - Responsive: T143-T155)
   - Developer C: Polish & Cross-Cutting (T156-T171)
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability (US1-US9)
- Each user story should be independently completable and testable
- Tests are NOT included (not explicitly requested in Phase II specification)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Total tasks: 171 (T001-T171)
- Total phases: 12 (Setup + Foundational + 9 User Story Phases + Polish)
- MVP scope: Phases 1-4 (Setup + Foundational + US1 + US2) - 64 tasks
