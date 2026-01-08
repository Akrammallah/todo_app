# Backend Configuration for Vercel Frontend Integration

## Issue
The frontend deployed on Vercel is showing 404 errors because it cannot connect to the backend API.

## Root Cause
The backend API needs to be configured to allow requests from your Vercel frontend domain.

## Solution Steps

### 1. Deploy Your Backend API
First, you need to deploy your Python FastAPI backend to a hosting service:

#### Option A: Deploy to Render.com
1. Create an account at https://render.com
2. Create a new Web Service
3. Connect to your GitHub repository
4. Choose Python runtime
5. Set build command: `pip install -r requirements.txt`
6. Set start command: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
7. In Environment Variables, add:
   - `ALLOWED_ORIGINS`: `["https://your-frontend-domain.vercel.app", "https://your-frontend-git-main-your-username.vercel.app"]`

#### Option B: Deploy to Railway.app
1. Create an account at https://railway.app
2. Import your GitHub repository
3. Set the deploy command: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variable:
   - `ALLOWED_ORIGINS`: `["https://your-frontend-domain.vercel.app", "https://your-frontend-git-main-your-username.vercel.app"]`

### 2. Update Environment Variables
Once your backend is deployed:

1. Take note of your backend API URL (e.g., `https://your-app-name.onrender.com`)

2. Go to your Vercel dashboard and update the frontend environment variable:
   - Key: `NEXT_PUBLIC_BACKEND_URL`
   - Value: Your deployed backend URL

### 3. Backend Configuration
Make sure your backend's `.env` file contains the proper CORS configuration:

```
ALLOWED_ORIGINS=["https://your-frontend-domain.vercel.app", "https://your-frontend-git-main-your-username.vercel.app"]
```

### 4. Re-deploy
After updating the environment variables:
1. Redeploy your backend with the new CORS settings
2. Redeploy your frontend to ensure it picks up the new backend URL

### 5. Verification
Test the connection by:
1. Opening your Vercel frontend URL
2. Checking browser developer tools for any CORS or network errors
3. Verifying that API calls to your backend are successful

## Common Issues and Fixes

### Issue: CORS Error
**Symptom**: Messages like "Access to fetch from origin has been blocked by CORS policy"
**Fix**: Ensure your backend's `ALLOWED_ORIGINS` includes your Vercel domain

### Issue: Network Error
**Symptom**: Cannot connect to backend
**Fix**: Verify that your `NEXT_PUBLIC_BACKEND_URL` is set correctly and the backend is accessible

### Issue: Authentication Failure
**Symptom**: Signin/signup doesn't work
**Fix**: Ensure both frontend and backend are properly configured and communicating

## Example Working Configuration

**Backend `.env` file:**
```
ALLOWED_ORIGINS=["https://your-todo-app.vercel.app", "https://your-todo-app-git-main-your-username.vercel.app"]
DATABASE_URL=sqlite:///./todo.db
SECRET_KEY=your-secret-key
```

**Vercel Environment Variable:**
- `NEXT_PUBLIC_BACKEND_URL`: `https://your-backend-app.onrender.com`

After following these steps, your frontend should be able to communicate with your backend and the 404 errors should be resolved.