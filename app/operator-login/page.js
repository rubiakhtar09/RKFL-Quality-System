"use client";

import { useState } from "react";

import "./operator-login.css";


export default function OperatorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Temporary frontend login
    window.location.replace("/operator-panel");
  };

  return (
    <div className="operator-page">

      <div className="topbar">
        <h3>RKFL Quality System - Operator Login</h3>
      </div>

      <button
        type="button"
        className="home-icon"
        onClick={() => window.location.replace("/")}
      >
        🏠
      </button>

      <div className="operator-box">
        <h1>Operator Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="operator-input"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="operator-input"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="operator-button"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>

    </div>
  );
}