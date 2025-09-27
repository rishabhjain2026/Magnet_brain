import React, { useEffect, useState } from "react";
import API from "../api";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    duedate: "",
    status: "pending",
    priority: "low",
  });

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await API.get("/task/get_task");
      setTasks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

   // Navigate to Add Task page
  const goToAddTask = () => {
    navigate("/add");
  };

  // Dashboard stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesSearch =
      (task.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (task.description || "").toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Start editing a task
  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditForm({
      title: task.title || "",
      description: task.description || "",
      duedate: task.duedate ? task.duedate.split("T")[0] : "",
      status: task.status || "pending",
      priority: task.priority || "low",
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
      console.error("Failed to update task:", err);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/task/delete_task/${id}`);
        fetchTasks();
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    }
  };

  // Priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "low":
      default:
        return "bg-green-100 text-green-700 border border-green-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
  <h2 className="text-4xl font-bold text-gray-800">
    Task Manager
  </h2>

  <button
    onClick={goToAddTask} // Navigate to TaskForm
    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
  >
    <Plus size={18} />
    Add Task
  </button>
</div>


        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-gray-600 text-lg font-medium">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-600">{totalTasks}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-gray-600 text-lg font-medium">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500">{pendingTasks}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-gray-600 text-lg font-medium">Completed</h3>
            <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              {editingTaskId === task._id ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="date"
                    name="duedate"
                    value={editForm.duedate}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    name="priority"
                    value={editForm.priority}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
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
              ) : (
                <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {task.title || "Untitled Task"}
                    </h4>
                    <p className="text-sm text-gray-600">{task.description || "No description"}</p>
                    <div className="flex gap-3 mt-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityBadge(task.priority || "low")}`}>
                        {(task.priority || "low").charAt(0).toUpperCase() + (task.priority || "low").slice(1)}
                      </span>
                      <span className="text-gray-500 flex items-center gap-1">
                        📅 {task.duedate ? new Date(task.duedate).toLocaleDateString() : "No due date"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {(task.status || "pending").charAt(0).toUpperCase() + (task.status || "pending").slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 sm:mt-0">
                    <button
                      onClick={() => startEditing(task)}
                      className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
