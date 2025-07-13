import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 🔁 Replace with full backend API URL
const API = "https://weddingplates-backend.onrender.com";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/auth/register`, form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
