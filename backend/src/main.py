"""FastAPI application entry point."""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from src.api import auth, todos
from src.core.config import settings
from src.db import engine
from src.models.user import User
from src.models.todo import Todo

# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    description="Phase II Full-Stack Web Todo Application",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(todos.router)


# Global exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Global HTTP exception handler."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail},
    )


# Health check endpoint
@app.get("/")
async def root():
    """Root endpoint for health check."""
    return {
        "app": settings.app_name,
        "status": "healthy",
        "version": "0.1.0",
    }


# Startup event
@app.on_event("startup")
async def startup():
    """Create database tables on startup."""
    from sqlmodel import SQLModel

    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
