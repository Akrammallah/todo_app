/** @type {import("react").ReactComponentType} */
import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  type: "success" | "error" | "warning" | "info";
}

export function Alert({ children, type }: AlertProps) {
  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div className={`p-4 mb-4 rounded-md border ${colors[type]}`}>
      {children}
    </div>
  );
}
