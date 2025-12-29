"""
Test script for the todo application
"""
import sys
import importlib.util

# Import our functions from the todo_app
spec = importlib.util.spec_from_file_location("todo_app", "./todo_app.py")
todo_app = importlib.util.module_from_spec(spec)
spec.loader.exec_module(todo_app)

def test_basic_functionality():
    """Test basic functionality of the todo application"""
    # Reset for clean test
    todo_app.tasks = []
    todo_app.next_task_id = 1

    print("Testing basic functionality...")

    # Test adding tasks
    success, msg = todo_app.add_task("Test task 1")
    print(f"Add task result: {success}, {msg}")

    success, msg = todo_app.add_task("Test task 2")
    print(f"Add task result: {success}, {msg}")

    # Test viewing tasks
    result = todo_app.view_tasks()
    print(f"View tasks result:\n{result}")

    # Test updating a task
    success, msg = todo_app.update_task(1, "Updated test task 1")
    print(f"Update task result: {success}, {msg}")

    # Test marking as complete
    success, msg = todo_app.mark_task(1, True)
    print(f"Mark task result: {success}, {msg}")

    # Test viewing tasks again
    result = todo_app.view_tasks()
    print(f"View tasks after updates:\n{result}")

    # Test deleting a task
    success, msg = todo_app.delete_task(2)
    print(f"Delete task result: {success}, {msg}")

    # Test viewing tasks final
    result = todo_app.view_tasks()
    print(f"Final view tasks:\n{result}")

    print("All tests completed successfully!")

if __name__ == "__main__":
    test_basic_functionality()