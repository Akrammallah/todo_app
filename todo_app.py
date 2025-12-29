"""
Todo Application - Phase I
A simple in-memory console todo application
"""

# Task data model
class Task:
    """Represents a single todo task with id, description, and completion status"""
    def __init__(self, task_id, description, completed=False):
        self.id = task_id
        self.description = description
        self.completed = completed

# In-memory storage
tasks = []  # List to store Task objects
next_task_id = 1  # Counter for generating unique IDs

def get_next_task_id():
    """Generate and return the next unique task ID"""
    global next_task_id
    current_id = next_task_id
    next_task_id += 1
    return current_id


def add_task(description):
    """Add a new task with the given description if it's valid"""
    global tasks
    if not description or not description.strip():
        return False, "Error: Task description cannot be empty"

    task_id = get_next_task_id()
    new_task = Task(task_id, description.strip())
    tasks.append(new_task)
    return True, f"Task added successfully with ID {task_id}"


def view_tasks():
    """Display all tasks with their ID, description, and completion status"""
    if not tasks:
        return "No tasks in the list."

    result = "ID  Description        Status\n"
    result += "--  -----------        ------\n"
    for task in tasks:
        status = "[x]" if task.completed else "[ ]"
        status_text = "Complete" if task.completed else "Incomplete"
        result += f"{task.id:<3} {task.description:<18} {status} {status_text}\n"
    return result


def update_task(task_id, new_description):
    """Update the description of a task with the given ID if it exists and description is valid"""
    global tasks
    if not new_description or not new_description.strip():
        return False, "Error: Task description cannot be empty"

    for task in tasks:
        if task.id == task_id:
            task.description = new_description.strip()
            return True, f"Task {task_id} updated successfully"

    return False, f"Error: Task with ID {task_id} not found"


def delete_task(task_id):
    """Delete a task with the given ID if it exists"""
    global tasks
    for i, task in enumerate(tasks):
        if task.id == task_id:
            tasks.pop(i)
            return True, f"Task {task_id} deleted successfully"

    return False, f"Error: Task with ID {task_id} not found"


def mark_task(task_id, completed):
    """Mark a task with the given ID as complete or incomplete"""
    global tasks
    for task in tasks:
        if task.id == task_id:
            task.completed = completed
            status = "complete" if completed else "incomplete"
            return True, f"Task {task_id} marked as {status}"

    return False, f"Error: Task with ID {task_id} not found"


def is_valid_task_id(task_id):
    """Check if the given task ID is valid (exists in the task list)"""
    for task in tasks:
        if task.id == task_id:
            return True
    return False


def is_valid_description(description):
    """Check if the given description is valid (non-empty and not just whitespace)"""
    return description and description.strip()


def display_error(message):
    """Display an error message to the user"""
    print(f"Error: {message}")


def display_success(message):
    """Display a success message to the user"""
    print(message)


def display_menu():
    """Display the main menu options to the user"""
    print("\nWelcome to the Todo Application!")
    print("1. Add Task")
    print("2. View Task List")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Mark Complete/Incomplete")
    print("6. Exit")
    print("Choose an option (1-6):", end=" ")


def process_user_input(choice):
    """Process the user's menu selection and call appropriate functions"""
    global tasks

    if choice == "1":
        description = input("Enter task description: ").strip()
        success, message = add_task(description)
        if success:
            display_success(message)
        else:
            display_error(message)
        return True

    elif choice == "2":
        result = view_tasks()
        print(result)
        return True

    elif choice == "3":
        try:
            task_id = int(input("Enter task ID to update: "))
            new_description = input("Enter new description: ").strip()
            success, message = update_task(task_id, new_description)
            if success:
                display_success(message)
            else:
                display_error(message)
        except ValueError:
            display_error("Invalid task ID. Please enter a number.")
        return True

    elif choice == "4":
        try:
            task_id = int(input("Enter task ID to delete: "))
            success, message = delete_task(task_id)
            if success:
                display_success(message)
            else:
                display_error(message)
        except ValueError:
            display_error("Invalid task ID. Please enter a number.")
        return True

    elif choice == "5":
        try:
            task_id = int(input("Enter task ID to mark: "))
            print("Choose status: 1. Complete  2. Incomplete")
            status_choice = input("Enter choice (1 or 2): ").strip()

            if status_choice == "1":
                completed = True
            elif status_choice == "2":
                completed = False
            else:
                display_error("Invalid choice. Please enter 1 for Complete or 2 for Incomplete.")
                return True

            success, message = mark_task(task_id, completed)
            if success:
                display_success(message)
            else:
                display_error(message)
        except ValueError:
            display_error("Invalid task ID. Please enter a number.")
        return True

    elif choice == "6":
        return False  # Signal to exit the application

    else:
        display_error("Invalid choice. Please enter a number between 1-6.")
        return True


def main_loop():
    """Main application loop that displays menu, processes input, and continues until exit"""
    print("Welcome to the Todo Application!")
    while True:
        display_menu()
        user_choice = input().strip()
        should_continue = process_user_input(user_choice)
        if not should_continue:
            break
    print("Goodbye!")


# Only run the main loop if this file is executed directly
if __name__ == "__main__":
    main_loop()