import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/signup", form);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 relative overflow-hidden">

      {/* Decorative circles for background aesthetics */}
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full top-10 left-10 blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-pink-300 rounded-full bottom-10 right-10 blur-3xl opacity-30 animate-pulse"></div>

      {/* Signup Form Card */}
      <form
        onSubmit={submit}
        className="relative bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-5 border border-white/20"
      >
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Join us and manage your tasks efficiently 🚀
        </p>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm transition"
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm transition"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm transition"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:scale-105 transform transition shadow-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
