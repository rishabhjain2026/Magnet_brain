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
      duedate: task.duedate.split("T")[0], // format yyyy-mm-dd
      status: task.status,
    });
  };

  // Handle input changes while editing
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save edited task
  const saveEdit = async (id) => {
    try {
      await API.put(`/task/update_task/${id}`, editForm);
      setEditingTaskId(null);
      fetchTasks(); // Refresh task list
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/task/delete_task/${id}`);
        fetchTasks(); // Refresh task list
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id} style={{ marginBottom: "10px" }}>
            {editingTaskId === task._id ? (
              <div>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                />
                <input
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                />
                <input
                  type="date"
                  name="duedate"
                  value={editForm.duedate}
                  onChange={handleEditChange}
                />
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <button onClick={() => saveEdit(task._id)}>Save</button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <b>{task.title}</b> | {task.status} | due:{" "}
                {new Date(task.duedate).toLocaleDateString()}
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
