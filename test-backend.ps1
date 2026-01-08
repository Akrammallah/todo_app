# PowerShell script to test backend API connectivity
Write-Host "Testing Backend API Connectivity" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Test if backend is running locally
Write-Host "`n1. Testing local backend (http://localhost:8000)..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8000/" -Method GET
    Write-Host "   ✓ Local backend is accessible" -ForegroundColor Green
    Write-Host "   App: $($response.app)" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Green
    Write-Host "   Version: $($response.version)" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Local backend is not accessible at http://localhost:8000" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Instructions for testing deployed backend
Write-Host "`n2. To test your deployed backend:" -ForegroundColor Yellow
Write-Host "   Replace 'YOUR_BACKEND_URL' below with your actual deployed backend URL" -ForegroundColor White
Write-Host "   Example: https://your-app-name.onrender.com" -ForegroundColor White

Write-Host "`n3. Common deployment platforms for Python FastAPI:" -ForegroundColor Yellow
Write-Host "   - Render.com (recommended)" -ForegroundColor White
Write-Host "   - Railway.app" -ForegroundColor White
Write-Host "   - Heroku" -ForegroundColor White
Write-Host "   - Google Cloud Run" -ForegroundColor White
Write-Host "   - AWS Elastic Beanstalk" -ForegroundColor White

Write-Host "`n4. After deploying your backend, test it with:" -ForegroundColor Yellow
Write-Host "   curl YOUR_BACKEND_URL/" -ForegroundColor White
Write-Host "   Or in PowerShell:" -ForegroundColor White
Write-Host "   Invoke-RestMethod -Uri 'YOUR_BACKEND_URL/' -Method GET" -ForegroundColor White

Write-Host "`n5. Remember to update your Vercel environment variable:" -ForegroundColor Yellow
Write-Host "   NEXT_PUBLIC_BACKEND_URL = YOUR_DEPLOYED_BACKEND_URL" -ForegroundColor White

Write-Host "`nDone!" -ForegroundColor Cyan