# Deploying to Vercel

Your Next.js frontend application is ready for deployment to Vercel. Follow these steps to complete the deployment:

## Prerequisites
- Node.js installed on your system
- Vercel CLI installed (already done: `npm install -g vercel`)

## Step-by-Step Deployment

1. **Open your terminal/command prompt**

2. **Navigate to the frontend directory:**
   ```bash
   cd C:\Users\M S Computer\OneDrive\Desktop\todo_app\frontend
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```
   - This will open a browser window
   - Sign in with your GitHub, GitLab, or Google account
   - Copy the token shown and paste it in the terminal when prompted

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

   Or for the first time deployment, just run:
   ```bash
   vercel
   ```

5. **During the deployment setup:**
   - When prompted for the project name, you can press Enter to accept the default
   - For the root directory, press Enter to accept the default (.)
   - For build command, press Enter to accept the default (Next.js will auto-detect)
   - For output directory, press Enter to accept the default (Next.js will auto-detect)
   - For development settings, press Enter to accept the default

6. **Set Environment Variables:**
   When prompted, set:
   - `NEXT_PUBLIC_BACKEND_URL`: Set this to your backend API URL (e.g., if your backend is deployed, use that URL; if running locally, you'll need a service like ngrok to expose it publicly)

7. **Wait for deployment to complete**
   - Vercel will build your application
   - You'll receive a unique deployment URL when complete

## Alternative Method Using GitHub Integration

Instead of CLI deployment, you can also:

1. Push your code to GitHub (already done)
2. Go to https://vercel.com
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Next.js project
6. Set the environment variable `NEXT_PUBLIC_BACKEND_URL`
7. Click "Deploy"

## Important Notes

- Your backend must be accessible via a public URL for the frontend to connect to it
- If you're running the backend locally, use a service like ngrok to expose it publicly
- The deployment will be accessible at a URL like `https://your-project-name.vercel.app`

## Your Application is Ready!

The build has been verified to work correctly. All configuration files are in place. You just need to complete the authentication step to deploy.

After deployment, you'll have a fully functioning todo application hosted on Vercel!