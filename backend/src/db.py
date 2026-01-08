"""Database connection management for SQLite (local development)."""
from sqlmodel import create_engine, Session
from dotenv import load_dotenv
import os

load_dotenv()

# Create database engine - use SQLite for local development
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo.db")
engine = create_engine(DATABASE_URL, echo=False, pool_pre_ping=True, connect_args={"check_same_thread": False})

def get_session():
    """Dependency injection function to get database session."""
    with Session(engine) as session:
        yield session
