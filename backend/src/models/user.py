"""User data model."""
from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String, Boolean, DateTime


class User(SQLModel, table=True):
    """User model representing application users."""

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=255)
    hashed_password: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to todos
    todos: list["Todo"] = Relationship(back_populates="user")

    class Config:
        arbitrary_types_allowed = True
