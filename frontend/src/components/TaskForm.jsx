import React, { useState } from "react";
import API from "../api";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    duedate: ""
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/task/create-Task", task);
    alert("Task added!");
  };

  return (
    <form onSubmit={submit}>
      <h2>Add Task</h2>
      <input name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={task.description} onChange={handleChange} />
      <input type="date" name="duedate" value={task.duedate} onChange={handleChange} required />
      <input name="id" placeholder="Id" value={task.id} onChange={handleChange} />
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        </select>

        <select
        name="Priority"
        value={task.status}
        onChange={handleChange}
        >
        <option value="low">Low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
        </select>
      <button type="submit">Save</button>
    </form>
  );
}
