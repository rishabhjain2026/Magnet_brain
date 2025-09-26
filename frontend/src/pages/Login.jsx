import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/signin", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/add");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Log In</button>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
    </form>
  );
}
