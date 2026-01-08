/** @type {import("react").NextPage} */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { TodoList } from "@/components/todos/TodoList";
import { getTodos, createTodo, toggleTodo, deleteTodo } from "@/lib/api";
import { type Todo } from "@/lib/api";

export default function TodosPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }
  }, [isAuthenticated, router]);

  // Fetch todos on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  const fetchTodos = async () => {
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data.todos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newTodoTitle.trim()) {
      setError("Title is required");
      return;
    }

    if (newTodoTitle.length > 500) {
      setError("Title must be less than 500 characters");
      return;
    }

    try {
      await createTodo(newTodoTitle, newTodoDescription || undefined);
      setNewTodoTitle("");
      setNewTodoDescription("");
      setShowCreateForm(false);
      // Refresh todos
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      await toggleTodo(id);
      // Refresh todos
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle todo");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this todo?")) {
      return;
    }
    try {
      await deleteTodo(id);
      // Remove from local state
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Todos</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium">
                {user?.email}
              </span>
              <Button variant="secondary" onClick={() => router.push("/auth/signin")}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {showCreateForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Todo
            </h2>
            <form onSubmit={handleCreateTodo} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  placeholder="Enter todo title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  maxLength={500}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {newTodoTitle.length} / 500 characters
                </p>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  id="description"
                  value={newTodoDescription}
                  onChange={(e) => setNewTodoDescription(e.target.value)}
                  placeholder="Enter description..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 resize-none transition-all"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setNewTodoTitle("");
                    setNewTodoDescription("");
                    setShowCreateForm(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Todo</Button>
              </div>
            </form>
          </div>
        )}

        {!showCreateForm && (
          <div className="mb-6">
            <Button onClick={() => setShowCreateForm(true)} className="shadow-lg">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Todo
              </span>
            </Button>
          </div>
        )}

        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onEdit={(id) => router.push(`/todos/${id}/edit`)}
          onDelete={handleDeleteTodo}
        />
      </main>
    </div>
  );
}
