import React from "react";
import { Link } from "react-router-dom";
import { CheckSquare, CalendarDays, FolderOpen, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-blue-600" />
          PlanUp
        </h1>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
          Organize Your Tasks <br />
          <span className="text-blue-600">Get Things Done</span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl">
          A powerful task management application to help you stay organized,
          track your progress, and achieve your goals efficiently.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full max-w-5xl">
          {/* Task Management */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
            <CheckSquare className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Task Management</h3>
            <p className="text-gray-600 text-sm mt-2">
              Create, edit, and organize your tasks with ease.
            </p>
          </div>

          {/* Due Dates */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
            <CalendarDays className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Due Dates</h3>
            <p className="text-gray-600 text-sm mt-2">
              Set deadlines and never miss important tasks.
            </p>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
            <FolderOpen className="w-10 h-10 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Categories</h3>
            <p className="text-gray-600 text-sm mt-2">
              Organize tasks by projects and priorities.
            </p>
          </div>

          {/* Smart Search */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
            <Search className="w-10 h-10 text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Smart Search</h3>
            <p className="text-gray-600 text-sm mt-2">
              Find any task quickly with powerful search.
            </p>
          </div>
        </div>

        {/* Bottom Call To Action */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            Ready to Get Organized?
          </h3>
          <p className="text-gray-600 mt-2">
            Join thousands of users who have already transformed their productivity with{" "}
            <span className="font-semibold text-blue-600">PlanUp</span>.
          </p>
          <Link
            to="/signup"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Managing Tasks Today
          </Link>
        </div>
      </main>
    </div>
  );
}
