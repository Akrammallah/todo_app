# Test Signup
Write-Host "=== Testing Signup ===" -ForegroundColor Cyan
$signupBody = @{
    email = "testuser@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $signupResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/auth/signup" -Method POST -Body $signupBody -ContentType "application/json"
    Write-Host "Signup Success!" -ForegroundColor Green
    Write-Host "User ID: $($signupResponse.id)"
    Write-Host "Email: $($signupResponse.email)"
    Write-Host "Token: $($signupResponse.access_token)"
    $token = $signupResponse.access_token
} catch {
    Write-Host "Signup Error: $_" -ForegroundColor Red
    # Try signin instead if user exists
    Write-Host "`n=== Trying Signin ===" -ForegroundColor Cyan
    $signinBody = @{
        email = "testuser@example.com"
        password = "password123"
    } | ConvertTo-Json

    try {
        $signinResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/auth/signin" -Method POST -Body $signinBody -ContentType "application/json"
        Write-Host "Signin Success!" -ForegroundColor Green
        Write-Host "User ID: $($signinResponse.id)"
        Write-Host "Email: $($signinResponse.email)"
        Write-Host "Token: $($signinResponse.access_token)"
        $token = $signinResponse.access_token
    } catch {
        Write-Host "Signin Error: $_" -ForegroundColor Red
        exit 1
    }
}

# Test Get Todos
Write-Host "`n=== Testing Get Todos ===" -ForegroundColor Cyan
$headers = @{
    "Authorization" = "Bearer $token"
}

try {
    $todos = Invoke-RestMethod -Uri "http://localhost:8000/api/todos" -Headers $headers
    Write-Host "Get Todos Success!" -ForegroundColor Green
    Write-Host "Number of todos: $($todos.todos.Count)"
} catch {
    Write-Host "Get Todos Error: $_" -ForegroundColor Red
}

# Test Create Todo
Write-Host "`n=== Testing Create Todo ===" -ForegroundColor Cyan
$todoBody = @{
    title = "Test Todo from PowerShell"
    description = "This is a test todo"
} | ConvertTo-Json

try {
    $newTodo = Invoke-RestMethod -Uri "http://localhost:8000/api/todos" -Method POST -Body $todoBody -ContentType "application/json" -Headers $headers
    Write-Host "Create Todo Success!" -ForegroundColor Green
    Write-Host "Todo ID: $($newTodo.id)"
    Write-Host "Title: $($newTodo.title)"
    Write-Host "Description: $($newTodo.description)"
    $todoId = $newTodo.id
} catch {
    Write-Host "Create Todo Error: $_" -ForegroundColor Red
}

# Test Update Todo
if ($todoId) {
    Write-Host "`n=== Testing Update Todo ===" -ForegroundColor Cyan
    $updateBody = @{
        title = "Updated Todo Title"
        description = "Updated description"
    } | ConvertTo-Json

    try {
        $updatedTodo = Invoke-RestMethod -Uri "http://localhost:8000/api/todos/$todoId" -Method PUT -Body $updateBody -ContentType "application/json" -Headers $headers
        Write-Host "Update Todo Success!" -ForegroundColor Green
        Write-Host "Title: $($updatedTodo.title)"
    } catch {
        Write-Host "Update Todo Error: $_" -ForegroundColor Red
    }

    # Test Toggle Todo
    Write-Host "`n=== Testing Toggle Todo ===" -ForegroundColor Cyan
    try {
        $toggledTodo = Invoke-RestMethod -Uri "http://localhost:8000/api/todos/$todoId/toggle" -Method PATCH -Headers $headers
        Write-Host "Toggle Todo Success!" -ForegroundColor Green
        Write-Host "Completed: $($toggledTodo.completed)"
    } catch {
        Write-Host "Toggle Todo Error: $_" -ForegroundColor Red
    }

    # Test Delete Todo
    Write-Host "`n=== Testing Delete Todo ===" -ForegroundColor Cyan
    try {
        Invoke-RestMethod -Uri "http://localhost:8000/api/todos/$todoId" -Method DELETE -Headers $headers
        Write-Host "Delete Todo Success!" -ForegroundColor Green
    } catch {
        Write-Host "Delete Todo Error: $_" -ForegroundColor Red
    }
}

Write-Host "`n=== All Tests Complete ===" -ForegroundColor Cyan
