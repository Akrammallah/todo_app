# CLI Interface Contract: Phase I Todo Application

**Feature**: Phase I Todo Application
**Date**: 2025-12-28
**Contract**: Claude

## Overview
This document defines the contract for the command-line interface of the Todo Application. It specifies the expected user interactions, input formats, and output formats.

## Menu Interface

### Main Menu Options
The application presents a numbered menu with the following options:

```
1. Add Task
2. View Task List
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit
```

### Input Format
- User enters a number (1-6) to select a menu option
- Input is validated as integer within range
- Invalid input results in error message and re-prompt

## Operation Contracts

### 1. Add Task
**Input**:
- Menu selection: "1"
- Task description: non-empty string

**Process**:
- Validates description is not empty
- Generates unique ID
- Creates new task with completed=False
- Adds to task list

**Output**:
- Success: "Task added successfully with ID [id]"
- Error: "Error: Task description cannot be empty"

### 2. View Task List
**Input**:
- Menu selection: "2"

**Process**:
- Checks if task list is empty
- Formats and displays all tasks

**Output**:
- If tasks exist:
```
ID  Description        Status
1   Sample task        [ ] Incomplete
2   Another task       [x] Complete
```
- If no tasks: "No tasks in the list."

### 3. Update Task
**Input**:
- Menu selection: "3"
- Task ID: integer
- New description: non-empty string

**Process**:
- Validates task ID exists
- Validates new description is not empty
- Updates task description

**Output**:
- Success: "Task [id] updated successfully"
- Error: "Error: Task with ID [id] not found" or "Error: Task description cannot be empty"

### 4. Delete Task
**Input**:
- Menu selection: "4"
- Task ID: integer

**Process**:
- Validates task ID exists
- Removes task from list

**Output**:
- Success: "Task [id] deleted successfully"
- Error: "Error: Task with ID [id] not found"

### 5. Mark Complete/Incomplete
**Input**:
- Menu selection: "5"
- Task ID: integer
- Status selection: "complete" or "incomplete"

**Process**:
- Validates task ID exists
- Updates task completion status

**Output**:
- Success: "Task [id] marked as [complete/incomplete]"
- Error: "Error: Task with ID [id] not found"

### 6. Exit
**Input**:
- Menu selection: "6"

**Process**:
- Terminates application loop
- No data persistence

**Output**:
- "Goodbye!" message

## Error Handling Contract
- All errors display user-friendly messages starting with "Error:"
- Invalid menu selections show: "Invalid choice. Please enter a number between 1-6."
- Invalid task IDs show: "Error: Task with ID [id] not found"
- Empty inputs show: "Error: [specific error message]"
- Application continues running after errors (except Exit option)