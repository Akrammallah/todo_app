# Fixing Vercel 404 Error - Complete Deployment Guide

## Problem
Your full-stack Todo application is showing 404 errors when deployed to Vercel because the backend and frontend need to be deployed separately, and CORS settings need to be properly configured.

## Solution Overview
You need to deploy:
1. **Backend (Python/FastAPI)** - to a service like Render, Railway, or Heroku
2. **Frontend (Next.js)** - to Vercel (already configured)

## Step-by-Step Solution

### Part 1: Deploy Backend API

Choose one of these services to deploy your Python FastAPI backend:

#### Option A: Deploy to Render.com
1. Go to [https://render.com](https://render.com) and create an account
2. Click "New +" → "Web Service"
3. Connect to your GitHub repository
4. Choose your backend folder
5. Set build command: `pip install -r requirements.txt`
6. Set start command: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
7. In Environment Variables, add:
   - `ALLOWED_ORIGINS`: `["https://your-frontend-domain.vercel.app", "https://your-frontend-git-main-your-username.vercel.app"]`
   - `DATABASE_URL`: Use SQLite for simplicity: `sqlite:///./todo.db`
   - `SECRET_KEY`: Generate a strong secret key

#### Option B: Deploy to Railway.app
1. Go to [https://railway.app](https://railway.app) and create an account
2. Import your GitHub repository
3. Set the deploy command: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables:
   - `ALLOWED_ORIGINS`: `["https://your-frontend-domain.vercel.app", "https://your-frontend-git-main-your-username.vercel.app"]`
   - `DATABASE_URL`: `sqlite:///./todo.db`
   - `SECRET_KEY`: Your secret key

### Part 2: Update Frontend Environment Variables

After deploying your backend, update your frontend's environment variables:

1. Get your deployed backend URL (e.g., `https://your-app-name.onrender.com`)
2. Go to your Vercel dashboard: [https://vercel.com/dashboard](https://vercel.com/dashboard)
3. Select your frontend project
4. Go to Settings → Environment Variables
5. Add/update the variable:
   - Key: `NEXT_PUBLIC_BACKEND_URL`
   - Value: Your deployed backend URL (e.g., `https://your-app-name.onrender.com`)

### Part 3: Redeploy Frontend

After updating the environment variable:
1. Go to your project in the Vercel dashboard
2. Trigger a new deployment (click "Deploy" or make a small change to your code and push to GitHub)

### Part 4: Verify CORS Configuration

Make sure your backend's CORS settings allow requests from your Vercel frontend. In your backend's environment variables, ensure `ALLOWED_ORIGINS` includes your Vercel domain:

```json
["https://your-frontend-domain.vercel.app", "https://your-frontend-git-main-your-username.vercel.app", "http://localhost:3000"]
```

## Testing the Connection

1. Visit your deployed frontend URL
2. Open browser developer tools (F12)
3. Go to the Network tab
4. Try to use your application (login, create a todo, etc.)
5. Check that API calls to your backend are successful

## Expected Response

When your backend is working correctly, visiting your backend URL directly should return:
```json
{
  "app": "Evolution of Todo",
  "status": "healthy",
  "version": "0.1.0"
}
```

## Common Issues and Solutions

### Issue: CORS Error
**Symptoms**: Messages like "Access to fetch from origin has been blocked by CORS policy"
**Solution**: Ensure your backend's `ALLOWED_ORIGINS` includes your Vercel domain

### Issue: Network Error
**Symptoms**: Cannot connect to backend
**Solution**: Verify that your `NEXT_PUBLIC_BACKEND_URL` is set correctly and the backend is accessible

### Issue: 404 Error
**Symptoms**: Pages return 404
**Solution**: Make sure you've deployed both frontend and backend, and environment variables are correctly set

## Backend Configuration Example

**Backend Environment Variables**:
```
ALLOWED_ORIGINS=["https://your-todo-app.vercel.app", "https://your-todo-app-git-main-your-username.vercel.app"]
DATABASE_URL=sqlite:///./todo.db
SECRET_KEY=your-generated-secret-key
```

**Vercel Environment Variable**:
- `NEXT_PUBLIC_BACKEND_URL`: `https://your-backend-app.onrender.com`

## Troubleshooting Tips

1. **Check Network Tab**: Look for failed API requests in browser dev tools
2. **Verify URLs**: Ensure your backend URL is accessible independently
3. **CORS Headers**: Confirm your backend sends proper CORS headers
4. **Environment Sync**: Make sure both deployments have consistent environment configurations

After following these steps, your full-stack application should work correctly with no 404 errors.