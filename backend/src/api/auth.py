"""Authentication API endpoints."""
from fastapi import APIRouter, HTTPException, status
from sqlmodel import Session, select
from pydantic import BaseModel, EmailStr, constr
from typing import Optional, Annotated
from src.models.user import User
from src.models.todo import Todo
from src.core.security import hash_password, verify_password, create_access_token
from src.core.config import settings
from src.core.deps import SessionDep

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


class UserSignUp(BaseModel):
    """User signup request model."""
    email: EmailStr
    password: constr(min_length=8, max_length=100)


class UserSignIn(BaseModel):
    """User signin request model."""
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """User response model."""
    id: int
    email: str
    created_at: str
    access_token: str


@router.post("/signup", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def signup(user_data: UserSignUp, session: SessionDep):
    """Create a new user account."""
    # Check if email already exists
    existing_user = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists. Please sign in.",
        )

    # Create new user
    hashed_password = hash_password(user_data.password)
    db_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    # Create access token
    access_token = create_access_token(db_user.id)

    return UserResponse(
        id=db_user.id,
        email=db_user.email,
        created_at=db_user.created_at.isoformat(),
        access_token=access_token,
    )


@router.post("/signin", response_model=UserResponse)
async def signin(user_data: UserSignIn, session: SessionDep):
    """Authenticate an existing user."""
    # Find user by email
    user = session.exec(select(User).where(User.email == user_data.email)).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    # Create access token
    access_token = create_access_token(user.id)

    return UserResponse(
        id=user.id,
        email=user.email,
        created_at=user.created_at.isoformat(),
        access_token=access_token,
    )


@router.post("/signout", status_code=status.HTTP_204_NO_CONTENT)
async def signout():
    """Invalidate the user session."""
    # In a real implementation, you would add the token to a blacklist
    # For now, the client simply removes the token
    return None
