# Data Model: Phase I Todo Application

**Feature**: Phase I Todo Application
**Date**: 2025-12-28
**Modeler**: Claude

## Task Entity

### Fields
- **id** (integer): Unique identifier for the task, auto-incrementing starting from 1
- **description** (string): Text description of the task, non-empty
- **completed** (boolean): Status indicating whether the task is completed (True) or not (False)

### Validation Rules
- **id**: Must be a positive integer, unique across all tasks
- **description**: Must not be empty or contain only whitespace
- **completed**: Must be a boolean value (True/False)

### State Transitions
- **Incomplete → Complete**: When user marks task as complete
- **Complete → Incomplete**: When user marks task as incomplete

### Relationships
- None (standalone entity in this phase)

### In-Memory Storage Structure
```python
# List of task dictionaries
tasks = [
    {
        "id": 1,
        "description": "Sample task description",
        "completed": False
    },
    {
        "id": 2,
        "description": "Another task",
        "completed": True
    }
]
```

### Constraints
- Task descriptions must be non-empty strings
- Task IDs must be unique within the application session
- Task IDs are immutable once assigned
- Tasks are stored only in memory (no persistence)