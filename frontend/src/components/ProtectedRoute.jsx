import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Optional: show a simple message before redirecting
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
        <p className="mb-6">You must be logged in to access this page.</p>
        <Navigate to="/login" replace />
      </div>
    );
  }

  return children;
}
