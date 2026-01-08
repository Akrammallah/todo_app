"""Todo CRUD API endpoints."""
from fastapi import APIRouter, HTTPException, status, Depends
from sqlmodel import Session, select
from pydantic import BaseModel, constr
from typing import List, Optional
from src.models.todo import Todo
from src.core.deps import SessionDep, get_current_user_id


router = APIRouter(prefix="/api/todos", tags=["Todos"])


class TodoCreate(BaseModel):
    """Todo creation request model."""
    title: constr(min_length=1, max_length=500)
    description: Optional[str] = None


class TodoUpdate(BaseModel):
    """Todo update request model."""
    title: Optional[constr(min_length=1, max_length=500)] = None
    description: Optional[str] = None


class TodoResponse(BaseModel):
    """Todo response model."""
    id: int
    title: str
    description: Optional[str] = None
    completed: bool
    created_at: str
    updated_at: str


class TodosListResponse(BaseModel):
    """Todos list response model."""
    todos: List[TodoResponse]


@router.get("", response_model=TodosListResponse)
async def get_todos(session: SessionDep, user_id: int = Depends(get_current_user_id)):
    """Get all todos for authenticated user."""
    statement = select(Todo).where(Todo.user_id == user_id)
    todos = session.exec(statement).all()
    return TodosListResponse(
        todos=[
            TodoResponse(
                id=todo.id,
                title=todo.title,
                description=todo.description,
                completed=todo.completed,
                created_at=todo.created_at.isoformat(),
                updated_at=todo.updated_at.isoformat(),
            )
            for todo in todos
        ]
    )


@router.post("", status_code=status.HTTP_201_CREATED, response_model=TodoResponse)
async def create_todo(
    todo_data: TodoCreate,
    session: SessionDep,
    user_id: int = Depends(get_current_user_id)
):
    """Create a new todo for authenticated user."""
    db_todo = Todo(**todo_data.model_dump(), user_id=user_id)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)

    return TodoResponse(
        id=db_todo.id,
        title=db_todo.title,
        description=db_todo.description,
        completed=db_todo.completed,
        created_at=db_todo.created_at.isoformat(),
        updated_at=db_todo.updated_at.isoformat(),
    )


@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo(
    todo_id: int,
    session: SessionDep,
    user_id: int = Depends(get_current_user_id)
):
    """Get a specific todo by ID."""
    statement = select(Todo).where(Todo.id == todo_id)
    todo = session.exec(statement).first()
    if not todo or todo.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found. It may have been deleted or you don't have permission to view it.",
        )

    return TodoResponse(
        id=todo.id,
        title=todo.title,
        description=todo.description,
        completed=todo.completed,
        created_at=todo.created_at.isoformat(),
        updated_at=todo.updated_at.isoformat(),
    )


@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo(
    todo_id: int,
    todo_data: TodoUpdate,
    session: SessionDep,
    user_id: int = Depends(get_current_user_id)
):
    """Update a specific todo by ID."""
    statement = select(Todo).where(Todo.id == todo_id)
    todo = session.exec(statement).first()
    if not todo or todo.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found. It may have been deleted or you don't have permission to update it.",
        )

    update_data = todo_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(todo, field, value)

    session.commit()
    session.refresh(todo)

    return TodoResponse(
        id=todo.id,
        title=todo.title,
        description=todo.description,
        completed=todo.completed,
        created_at=todo.created_at.isoformat(),
        updated_at=todo.updated_at.isoformat(),
    )


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(
    todo_id: int,
    session: SessionDep,
    user_id: int = Depends(get_current_user_id)
):
    """Delete a specific todo by ID."""
    statement = select(Todo).where(Todo.id == todo_id)
    todo = session.exec(statement).first()
    if not todo or todo.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found. It may have been deleted or you don't have permission to delete it.",
        )

    session.delete(todo)
    session.commit()

    return None


@router.patch("/{todo_id}/toggle", response_model=TodoResponse)
async def toggle_todo(
    todo_id: int,
    session: SessionDep,
    user_id: int = Depends(get_current_user_id)
):
    """Toggle completion status of a specific todo."""
    statement = select(Todo).where(Todo.id == todo_id)
    todo = session.exec(statement).first()
    if not todo or todo.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found. It may have been deleted or you don't have permission to update it.",
        )

    todo.completed = not todo.completed
    session.commit()
    session.refresh(todo)

    return TodoResponse(
        id=todo.id,
        title=todo.title,
        description=todo.description,
        completed=todo.completed,
        created_at=todo.created_at.isoformat(),
        updated_at=todo.updated_at.isoformat(),
    )
