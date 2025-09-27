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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Add Task</h2>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          name="duedate"
          value={task.duedate}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Status Dropdown */}
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority Dropdown */}
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save Task
        
        </button>
      </form>
    </div>
  );
}
