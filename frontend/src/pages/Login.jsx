import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

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
      navigate("/tasklist");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Top-right button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transform transition"
      >
        Return to Home
      </button>

      {/* Login Form */}
      <form
        onSubmit={submit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-4">
          Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:scale-105 transform transition"
        >
          Log In
        </button>

        <p className="text-center text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}
