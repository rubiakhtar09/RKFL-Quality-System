"use client";

import { useState } from "react";

import "./admin-login.css";


export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = username.trim().toLowerCase();
    const pass = password.trim();

    if (user === "admin" && pass === "admin123") {
      window.location.href = "/admin-panel";
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="admin-page">
      <div className="topbar">
        <h3>RKFL Quality System - Admin Login</h3>
      </div>

      <button
        type="button"
        className="home-icon"
        onClick={() => (window.location.href = "/")}
      >
        🏠
      </button>

      <div className="login-box">
        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}