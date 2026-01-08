"""Application configuration and environment variables."""
from dotenv import load_dotenv
from typing import List
import os
import json

load_dotenv()


class Settings:
    """Application settings."""

    # App info
    app_name: str = os.getenv("APP_NAME", "Evolution of Todo")
    app_env: str = os.getenv("APP_ENV", "development")

    # Database
    database_url: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/tododb")

    # Security
    secret_key: str = os.getenv("SECRET_KEY", "dev-secret-key")
    session_secret: str = os.getenv("SESSION_SECRET", "dev-session-secret")
    session_expire_hours: int = int(os.getenv("SESSION_EXPIRE_HOURS", "24"))

    # CORS
    allowed_origins: List[str] = json.loads(os.getenv("ALLOWED_ORIGINS", '["http://localhost:3000"]'))


# Global settings instance
settings = Settings()
