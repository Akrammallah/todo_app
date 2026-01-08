/** @type {import("react").NextComponentType} */
import { useState } from "react";
import { Todo } from "@/lib/api";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      onDelete(todo.id);
    }
  };

  return (
    <li className="bg-white rounded-xl shadow-md p-5 sm:p-6 hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-4 flex-1 w-full">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="h-6 w-6 rounded-md border-2 border-gray-300 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all hover:border-blue-500"
              aria-label={`Toggle ${todo.title}`}
              aria-checked={todo.completed}
              role="checkbox"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <h3
              className={`text-base sm:text-lg font-semibold transition-all ${
                todo.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-sm text-gray-600 mt-2 break-words">
                {todo.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-2 sm:justify-end">
          <button
            onClick={() => onEdit(todo.id)}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all min-h-[44px] sm:min-h-0"
            aria-label={`Edit ${todo.title}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all min-h-[44px] sm:min-h-0"
            aria-label={`Delete ${todo.title}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
