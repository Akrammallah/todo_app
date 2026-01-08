# Data Model: Phase II - Full-Stack Web Todo Application

**Feature**: Phase II - Full-Stack Web Todo Application
**Date**: 2025-12-29
**Database**: Neon Serverless PostgreSQL
**ORM**: SQLModel

## Overview

This document defines the data model for Phase II of the Evolution of Todo project. The model supports user authentication and todo CRUD operations with proper data isolation between users.

## Entities

### User

Represents a registered user of the application. Each user owns a collection of todos.

**Table Name**: `users`

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | Primary Key, Auto-increment | Unique identifier for user |
| email | String(255) | Unique, Indexed, Not Null | User's email address (login identifier) |
| hashed_password | String(255) | Not Null | Securely hashed password (bcrypt/argon2) |
| created_at | Timestamp | Default: current timestamp | Account creation timestamp |

**Relationships**:
- One-to-Many with Todo (`todos`)

**Validation Rules**:
- Email must match standard email regex pattern
- Email must be unique across all users
- Password must be at least 8 characters (enforced before hashing)
- Email is indexed for fast lookups during authentication

**SQLModel Definition**:

```python
from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from pydantic import EmailStr

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    hashed_password: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    todos: list["Todo"] = Relationship(back_populates="user")
```

---

### Todo

Represents a task or item to be tracked. Each todo is owned by exactly one user.

**Table Name**: `todos`

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | Primary Key, Auto-increment | Unique identifier for todo |
| title | String(500) | Not Null | Todo title (required) |
| description | Text | Nullable | Optional detailed description |
| completed | Boolean | Default: False | Completion status |
| user_id | Integer | Foreign Key → users.id, Not Null | Owner of this todo |
| created_at | Timestamp | Default: current timestamp | Todo creation timestamp |
| updated_at | Timestamp | Default: current timestamp, Update on change | Last modification timestamp |

**Relationships**:
- Many-to-One with User (`user`)

**Validation Rules**:
- Title is required (cannot be null or empty)
- Title maximum length: 500 characters
- Description is optional and can be arbitrarily long
- `user_id` must reference an existing user (foreign key constraint)
- `completed` defaults to False for new todos

**SQLModel Definition**:

```python
from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=500)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    user_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow, sa_column_kwargs={"onupdate": datetime.utcnow})
    user: User = Relationship(back_populates="todos")
```

---

## Relationships

### User → Todo (One-to-Many)

**Definition**: One user can have many todos. Each todo belongs to exactly one user.

**Foreign Key**: `todos.user_id` references `users.id`

**Cascade Rules**:
- **Cascade Delete**: When a user is deleted, all associated todos are automatically deleted
- **Restrict**: Cannot delete a user without explicitly handling their todos (alternative)

**Data Isolation**:
- All queries for todos must include `WHERE todos.user_id = ?` clause
- Foreign key constraint ensures referential integrity
- Database-level enforcement prevents orphaned todos

**Indexing Strategy**:
- `user_id` on todos table should be indexed for fast user-todo lookups
- `email` on users table is indexed for authentication lookups

---

## Schema Diagram

```
┌─────────────────────────────┐
│          users             │
├─────────────────────────────┤
│ id (PK)                 │
│ email (unique, indexed)    │
│ hashed_password           │
│ created_at               │
└──────────┬──────────────┘
           │ 1
           │
           │ N
┌──────────┴──────────────┐
│          todos            │
├─────────────────────────────┤
│ id (PK)                 │
│ title                    │
│ description              │
│ completed                │
│ user_id (FK) ───────────┼───► users.id
│ created_at               │
│ updated_at               │
└─────────────────────────────┘
```

---

## Database Constraints

### Primary Keys

- `users.id`: Auto-incrementing integer
- `todos.id`: Auto-incrementing integer

### Foreign Keys

- `todos.user_id` → `users.id`

### Unique Constraints

- `users.email`: Ensures no duplicate emails

### Indexes

- `users.email`: Speeds up authentication lookups
- `todos.user_id`: Speeds up user-todo queries

### Default Values

- `users.created_at`: Current timestamp
- `todos.created_at`: Current timestamp
- `todos.updated_at`: Current timestamp (updates on modification)
- `todos.completed`: False

### Not Null Constraints

- `users.email`
- `users.hashed_password`
- `todos.title`
- `todos.user_id`

---

## Migration Strategy

**Migration Tool**: Alembic

**Initial Migration**:
- Create `users` table with all fields and constraints
- Create `todos` table with all fields and constraints
- Add foreign key relationship between tables
- Add indexes for `users.email` and `todos.user_id`

**Future Migrations**:
- All schema changes must be done via Alembic migrations
- Migrations are version-controlled and reversible
- Run `alembic upgrade head` to apply migrations
- Run `alembic downgrade -1` to revert last migration

---

## Security Considerations

### Password Storage

- Passwords are never stored in plain text
- Use bcrypt or argon2 for hashing (Better Auth default)
- Hashing is done before inserting into database
- `hashed_password` field contains only the hash, not the plain password

### Data Isolation

- Every todo query must include user_id filter
- Application layer enforces ownership checks
- Database foreign keys prevent invalid references
- Users can never access todos belonging to other users

### SQL Injection Prevention

- SQLModel uses parameterized queries
- No raw SQL string concatenation
- All user input is sanitized through Pydantic models

---

## Performance Considerations

### Query Optimization

- Use indexed columns (email, user_id) in WHERE clauses
- Consider pagination for large todo lists (limit/offset)
- Use `select_related` or `joinedload` to optimize User joins if needed

### Scaling

- Initial design supports 1,000+ todos per user (Phase II requirement)
- Indexes on `user_id` and `email` enable efficient queries at scale
- Consider adding composite indexes if query patterns evolve

---

## Summary

The Phase II data model is simple yet complete for the specified requirements:
- Two entities: User and Todo
- One-to-Many relationship with cascade delete
- Proper constraints and indexes for performance
- Security-first approach with password hashing
- Data isolation enforced at database level

This model aligns with Phase II scope and provides a solid foundation for future phases if additional features are added (categories, tags, etc.).
