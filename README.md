# Full-Stack Todo Application

This is a full-stack todo application consisting of:
- **Backend**: Python FastAPI application running on port 8000
- **Frontend**: Next.js application running on port 3000

## Project Structure
- `backend/` - Python FastAPI backend with authentication and todo CRUD operations
- `frontend/` - Next.js frontend with React components for todo management

## Local Development

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `pip install -r requirements.txt` (or use rye/uv as specified in pyproject.toml)
3. Start the backend: `python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create `.env.local` with: `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000`
4. Start the frontend: `npm run dev`

## Deploying to Vercel

Your application is ready for deployment to Vercel! Follow these steps:

1. **Prerequisites**: Ensure you have Node.js installed
2. **Install Vercel CLI**: `npm install -g vercel`
3. **Navigate to frontend**: `cd frontend`
4. **Login to Vercel**: `vercel login` (follow browser authentication)
5. **Deploy**: `vercel --prod` (for production deployment)

Detailed instructions are available in the [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) file.

The application has been tested and builds successfully. All configuration files are ready for deployment.

## Environment Variables

The application requires the following environment variables:

For the frontend (`frontend/.env.local` during development, or Vercel environment variables for production):
- `NEXT_PUBLIC_BACKEND_URL`: URL of the backend API (e.g., http://localhost:8000 for local development or your deployed backend URL)

## Troubleshooting Vercel Deployment

If you encounter a 404 error after deploying to Vercel:
1. Make sure your backend API is also deployed and accessible at a public URL
2. Verify that the `NEXT_PUBLIC_BACKEND_URL` environment variable is set correctly in your Vercel project settings
3. Check that your backend allows CORS from your Vercel frontend domain
4. Ensure your backend's `ALLOWED_ORIGINS` environment variable includes your Vercel domain

More troubleshooting details are available in the [TROUBLESHOOTING_VERCEL.md](./TROUBLESHOOTING_VERCEL.md) file.

## Deploying the Backend API

For the frontend to work properly, you must also deploy the backend API. See [FIXING_VERCEL_404.md](./FIXING_VERCEL_404.md) for detailed instructions on deploying the Python FastAPI backend and configuring CORS settings properly.

## Features

- User authentication (signup/signin)
- Todo creation, reading, updating, and deletion (CRUD operations)
- Toggle todo completion status
- Responsive design using Tailwind CSS
- Modern UI with gradients and animations

## Technologies Used

- Backend: Python, FastAPI, SQLModel, PostgreSQL (via psycopg2)
- Frontend: Next.js 14, React, TypeScript, Tailwind CSS
- Database: SQLite (with Alembic for migrations)
