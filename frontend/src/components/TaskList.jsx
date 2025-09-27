import React, { useEffect, useState } from "react";
import API from "../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    duedate: "",
    status: "pending",
  });

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await API.get("/task/get_task");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on status
  const filteredTasks =
    statusFilter === "all"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  // Start editing a task
  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      duedate: task.duedate.split("T")[0],
      status: task.status,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/task/update_task/${id}`, editForm);
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/task/delete_task/${id}`);
        fetchTasks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Helper for priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border-red-500";
      case "medium":
        return "bg-yellow-100 border-yellow-500";
      case "low":
      default:
        return "bg-green-100 border-green-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">My Tasks</h2>

      {/* Status Filter */}
      <div className="mb-6 flex justify-end">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)} flex flex-col sm:flex-row sm:justify-between sm:items-center`}
          >
            {editingTaskId === task._id ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                  className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="date"
                  name="duedate"
                  value={editForm.duedate}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => saveEdit(task._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                <div className="flex flex-col sm:flex-row gap-2">
                  <b className="text-lg">{task.title}</b>
                  <span className="text-gray-600">{task.status}</span>
                  <span className="text-gray-500">Due: {new Date(task.duedate).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => startEditing(task)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
