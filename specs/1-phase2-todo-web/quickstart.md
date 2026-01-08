# Quickstart Guide: Phase II - Full-Stack Web Todo Application

**Feature**: Phase II - Full-Stack Web Todo Application
**Date**: 2025-12-29

## Overview

This guide provides step-by-step instructions to set up and run the Phase II full-stack web todo application locally.

## Prerequisites

Before you begin, ensure you have:

- **Python 3.11+** installed ([Download Python](https://python.org/downloads/))
- **Node.js 18+** and npm installed ([Download Node.js](https://nodejs.org/))
- **Git** installed ([Download Git](https://git-scm.com/downloads))
- **Neon PostgreSQL account** ([Sign up for free](https://neon.tech/))
  - Or local PostgreSQL for offline development
- **Code editor**: VS Code, PyCharm, or similar

## Project Structure

```text
todo_app/
├── backend/          # Python FastAPI backend
├── frontend/          # Next.js React frontend
└── specs/            # Specification and planning documents
```

---

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Create Python Virtual Environment

**Windows**:
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux**:
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- FastAPI (web framework)
- SQLModel (ORM)
- Better Auth (authentication)
- uvicorn (ASGI server)
- alembic (database migrations)
- psycopg2 (PostgreSQL adapter)
- And other dependencies

### 4. Configure Environment Variables

Create `.env` file in the `backend/` directory:

```bash
# Copy example file (if exists)
cp .env.example .env

# Or create manually
```

**Example `.env` file**:
```env
# Database URL (replace with your Neon connection string)
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Application Settings
APP_NAME=Evolution of Todo
APP_ENV=development
SECRET_KEY=your-secret-key-here-change-in-production

# CORS Settings (local development)
ALLOWED_ORIGINS=http://localhost:3000

# Session Settings (Better Auth)
SESSION_SECRET=your-session-secret-here
SESSION_EXPIRE_HOURS=24
```

**To get Neon Database URL**:
1. Log in to [Neon Console](https://console.neon.tech/)
2. Create a new project or select existing one
3. Copy the connection string from "Connection Details"
4. Replace `user` and `password` with your credentials

### 5. Run Database Migrations

```bash
alembic upgrade head
```

This creates the `users` and `todos` tables in your Neon database.

### 6. Start Backend Server

```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output**:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Backend is now running at **http://localhost:8000**

**Test API**:
```bash
# Check health (if endpoint exists)
curl http://localhost:8000/

# View API documentation
open http://localhost:8000/docs
```

---

## Frontend Setup

### 1. Navigate to Frontend Directory (in new terminal)

```bash
cd frontend
```

### 2. Install Node.js Dependencies

```bash
npm install
```

This installs:
- Next.js 14+ (React framework)
- React 18+ (UI library)
- TypeScript (type safety)
- And other dependencies

### 3. Configure Environment Variables

Create `.env.local` file in the `frontend/` directory:

```bash
# Copy example file (if exists)
cp .env.example .env.local

# Or create manually
```

**Example `.env.local` file**:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 4. Start Frontend Development Server

```bash
npm run dev
```

**Expected Output**:
```
 ▲ Next.js 14.x.x
 - Local:        http://localhost:3000
 - Network:      http://192.168.x.x:3000
 ✓ Ready in x seconds
```

Frontend is now running at **http://localhost:3000**

---

## Quick Test Flow

Now that both servers are running, test the application:

### 1. Open the Application

Visit: **http://localhost:3000**

You should be redirected to the sign-in page.

### 2. Create Account

1. Click "Sign Up" link or navigate to `/signup`
2. Enter email: `test@example.com`
3. Enter password: `secure123` (at least 8 characters)
4. Click "Sign Up"

**Expected**: Redirected to todos page with empty state message.

### 3. Create Your First Todo

1. Click "Add Todo" button
2. Enter title: "Buy groceries"
3. Enter description: "Milk, eggs, bread" (optional)
4. Click "Save"

**Expected**: Todo appears in list, empty state message gone.

### 4. Toggle Completion

1. Click checkbox next to your todo
2. Todo should show strikethrough or color change indicating completion

### 5. Edit Todo

1. Click "Edit" button on your todo
2. Modify title or description
3. Click "Save"

**Expected**: Todo is updated with new values.

### 6. Delete Todo

1. Click "Delete" button on your todo
2. Click "Confirm" in dialog

**Expected**: Todo is removed from list, empty state message appears.

### 7. Sign Out

1. Click "Sign Out" button (usually in header/nav)
2. Should be redirected to sign-in page

**Expected**: Cannot access todos page without signing in again.

---

## Docker Setup (Alternative)

If you prefer using Docker for the backend:

### 1. Create Docker Compose File

**docker-compose.yml** (in repository root):
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - SECRET_KEY=${SECRET_KEY}
    volumes:
      - ./backend:/app
    command: uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=tododb
    ports:
      - "5432:5432"
```

### 2. Start Backend with Docker

```bash
docker-compose up -d backend
```

### 3. Run Migrations

```bash
docker-compose exec backend alembic upgrade head
```

### 4. Frontend (Still Runs Locally)

Follow frontend setup steps above.

---

## Troubleshooting

### Database Connection Errors

**Problem**: `psycopg2.OperationalError: could not connect to server`

**Solutions**:
1. Verify `DATABASE_URL` in `.env` is correct
2. Check Neon console - database might be paused
3. Ensure firewall allows outbound PostgreSQL connections
4. Try local Postgres with Docker Compose (see above)

### CORS Errors

**Problem**: Browser shows CORS error in console

**Solutions**:
1. Check backend CORS settings in `src/core/config.py`
2. Ensure `ALLOWED_ORIGINS` includes `http://localhost:3000`
3. Restart backend server after changing CORS settings

**Example CORS configuration**:
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

### Authentication Not Persisting

**Problem**: Keep getting redirected to sign-in page

**Solutions**:
1. Check browser's Application > Cookies tab for session cookie
2. Ensure backend sets `HttpOnly` cookie correctly
3. Verify `SESSION_SECRET` is set in backend `.env`
4. Check browser console for authentication errors

### Port Already in Use

**Problem**: `Address already in use` error

**Solutions**:
1. Find process using port:
   ```bash
   # Windows
   netstat -ano | findstr :8000

   # macOS/Linux
   lsof -i :8000
   ```
2. Kill the process or use different port:
   ```bash
   uvicorn src.main:app --port 8001
   ```
3. Update `NEXT_PUBLIC_BACKEND_URL` in frontend `.env.local`

### Module Not Found Errors

**Problem**: `ModuleNotFoundError: No module named 'fastapi'`

**Solutions**:
1. Ensure virtual environment is activated
2. Install dependencies: `pip install -r requirements.txt`
3. Check Python version: `python --version` (must be 3.11+)

### Frontend Build Errors

**Problem**: TypeScript or build errors

**Solutions**:
1. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```
2. Ensure Node.js version is 18+: `node --version`
3. Install dependencies: `npm install`

---

## Development Workflow

### Backend Development

1. Make changes to backend code
2. uvicorn auto-reloads (watch mode enabled)
3. Test via API: `http://localhost:8000/docs`
4. Run tests: `pytest tests/` (if configured)

### Frontend Development

1. Make changes to frontend code
2. Next.js hot-reloads automatically
3. Test in browser: `http://localhost:3000`
4. Check browser console for errors

### Running Both Together

**Windows**:
```bash
# Terminal 1: Backend
cd backend
venv\Scripts\activate
uvicorn src.main:app --reload

# Terminal 2: Frontend
cd frontend
npm run dev
```

**macOS/Linux**:
```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
uvicorn src.main:app --reload

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## Next Steps

After completing this quickstart:

1. **Review the API documentation**: Visit `http://localhost:8000/docs`
2. **Explore the codebase**: Look at `backend/src/` and `frontend/src/`
3. **Read the specification**: `specs/1-phase2-todo-web/spec.md`
4. **Review the implementation plan**: `specs/1-phase2-todo-web/plan.md`
5. **Check data model**: `specs/1-phase2-todo-web/data-model.md`
6. **Review API contracts**: `specs/1-phase2-todo-web/contracts/api-contract.md`

---

## Production Deployment

This quickstart is for local development only. For production deployment, you will need:

- Environment-specific configuration (no `.env` files in production)
- HTTPS for both frontend and backend
- Production database (Neon PostgreSQL works for production too)
- Reverse proxy (nginx) or managed hosting (Vercel + Railway/etc.)
- Secure secrets management
- Rate limiting and monitoring

Production deployment is **out of scope for Phase II** but can be added in future phases.

---

## Support

If you encounter issues:

1. Check browser console (F12) for frontend errors
2. Check backend terminal for server errors
3. Review the specification and plan documents
4. Ensure all prerequisites are installed
5. Verify environment variables are set correctly

Good luck with your Phase II development!
