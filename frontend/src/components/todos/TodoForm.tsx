/** @type {import("react").NextComponentType} */
import { useState } from "react";

interface TodoFormProps {
  title?: string;
  description?: string;
  onSubmit: (title: string, description?: string) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

export default function TodoForm({
  title = "",
  description = "",
  onSubmit,
  onCancel,
  isEdit = false,
}: TodoFormProps) {
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!todoTitle.trim()) {
      setError("Title is required");
      return;
    }

    if (todoTitle.length > 500) {
      setError("Title must be less than 500 characters");
      return;
    }

    onSubmit(todoTitle.trim(), todoDescription.trim() || undefined);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Enter todo title..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={500}
          required
        />
        <p className="text-sm text-gray-500">
          {todoTitle.length} / 500 characters
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="description"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          placeholder="Enter description..."
          rows={3}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
        >
          {isEdit ? "Save" : "Add Todo"}
        </button>
      </div>
    </div>
  );
}
