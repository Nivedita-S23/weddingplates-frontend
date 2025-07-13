// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { SlArrowLeft } from "react-icons/sl";

const API = "https://weddingplates-backend.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      const { role, name, email: userEmail } = res.data;

      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("email", userEmail);

      alert(`Logged in as ${role}`);
      navigate("/");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <SlArrowLeft onClick={() => navigate(-1)} className="back-arrow" />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            minLength={6}
            maxLength={30}
            pattern="^[A-Za-z0-9@#$%^&+=!]{6,30}$"
            title="Password must be 6–30 characters. Allowed: letters, numbers, @#$%^&+=!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <p className="register-link">
            New user? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
