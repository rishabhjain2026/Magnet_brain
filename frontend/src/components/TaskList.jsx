import React, { useEffect, useState } from "react";
import API from "../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all"); // all, pending, completed

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

  return (
    <div>
      <h2>My Tasks</h2>

      {/* Dropdown for status filter */}
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
          <li key={task._id}>
            <b>{task.title}</b> | {task.status} | due:{" "}
            {new Date(task.duedate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
