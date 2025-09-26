import React, { useEffect, useState } from "react";
import API from "../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    duedate: "",
    status: "pending",
  });

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

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      duedate: task.duedate.split("T")[0], // format yyyy-mm-dd
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
      fetchTasks(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/task/delete_task/${id}`);
        fetchTasks(); // refresh list
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: "10px" }}>
            {editingTaskId === task._id ? (
              <div>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                />
                <input
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
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
