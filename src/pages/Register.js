// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"; // ✅ import CSS

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
      await axios.post(`${API}/api/auth/register`, {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={form.name}
          required
          pattern="^[A-Za-z ]{3,}$"
          title="Name must contain only letters and spaces (min 3 characters)"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Enter a valid email address"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          required
          minLength={6}
          maxLength={30}
          pattern="^[A-Za-z0-9@#$%^&+=!]{6,30}$"
          title="Password must be 6–30 characters. Allowed: A-Z, a-z, 0-9, @#$%^&+=!"
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
