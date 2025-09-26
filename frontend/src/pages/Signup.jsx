import React, { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




export default function Signup() {
    const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/signup", form);
      alert("Signup successful!");
      navigate("/add");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>
      <input
        name="name"
        type="name"
        placeholder="name"
        value={form.name}
        onChange={handleChange}
        required
      />
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
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
        </p>
    </form>
    
  );
}
