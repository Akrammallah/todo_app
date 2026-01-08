"""Dependency injection for database sessions and current user."""
from typing import Annotated, Optional
from fastapi import Depends, Header, HTTPException, status
from sqlmodel import Session
from jose import JWTError, jwt
from src.db import get_session
from src.core.config import settings

# Database session dependency
SessionDep = Annotated[Session, Depends(get_session)]


def get_current_user_id(
    session: SessionDep,
    authorization: Optional[str] = Header(None)
) -> int:
    """Get current user ID from session token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    if not authorization or not authorization.startswith("Bearer "):
        raise credentials_exception

    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, settings.session_secret, algorithms=["HS256"])
        user_id_str = payload.get("sub")
        if user_id_str is None:
            raise credentials_exception
        return int(user_id_str)
    except (JWTError, ValueError):
        raise credentials_exception
