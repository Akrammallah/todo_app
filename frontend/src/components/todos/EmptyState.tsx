/** @type {import("react").NextComponentType} */

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "You don't have any todos yet",
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl font-bold text-gray-300 mb-4">📝</div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        {message}
      </h2>
      <p className="text-gray-500">
        Create your first todo to get started!
      </p>
    </div>
  );
}
