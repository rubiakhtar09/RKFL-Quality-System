"use client";

import { useRouter } from "next/navigation";

import "./admin-pannel.css";


export default function AdminPanel() {
  const router = useRouter();

  const users = [
    { id: 8, username: "Soumya", role: "operator" },
    { id: 7, username: "shubham1", role: "admin" },
    { id: 6, username: "shubham", role: "operator" },
    { id: 4, username: "rubina", role: "operator" },
    { id: 3, username: "operator1", role: "operator" },
    { id: 1, username: "admin", role: "admin" },
  ];

  return (
    <div className="admin-panel-page">
      <div className="panel-topbar">
        <div className="home-icon-small" onClick={() => router.push("/")}>
          🏠
        </div>

        <h2>RKFL Quality System - Admin Panel</h2>

        <button className="logout-btn" onClick={() => router.push("/")}>
          Logout
        </button>
      </div>

      <div className="panel-container">
        <div className="panel-card">
          <h3>Create User</h3>

          <input className="panel-input" placeholder="Enter Username" />
          <input className="panel-input" placeholder="Enter Password" />

          <select className="panel-input">
            <option>Operator</option>
            <option>Admin</option>
          </select>

          <button className="create-btn">Create User</button>
        </div>

        <div className="panel-card">
          <h3>Users List</h3>

          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}