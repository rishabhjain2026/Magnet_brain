import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    duedate: "",
    status: "pending",
    priority: "low"
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/task/create-Task", task);
      alert("Task added!");
      setTask({
        title: "",
        description: "",
        duedate: "",
        status: "pending",
        priority: "low"
      });
      navigate("/tasklist");
    } catch (err) {
      alert("Failed to add task");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl ring-1 ring-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Add New Task
        </h2>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 shadow-sm transition"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 shadow-sm transition resize-none"
            rows={4}
          />
          <input
            type="date"
            name="duedate"
            value={task.duedate}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 shadow-sm transition"
          />

          <div className="flex gap-4">
            {/* Status Dropdown */}
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 shadow-sm transition"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            {/* Priority Dropdown */}
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 shadow-sm transition"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:scale-105 transform transition shadow-lg"
          >
            Save Task
          </button>
        </form>
      </div>
    </div>
  );
}
