import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "https://weddingplates-backend.onrender.com"; // ✅ direct API URL

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
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
    <div className="container">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p style={{ fontSize: "1.0rem" }}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
