"use client";

import Link from "next/link";

import "./operator-pannel.css";


export default function OperatorPanel() {
  return (
    <div className="operator-panel-page">
      <div className="operator-navbar">
        <h1>RKFL Operator Panel</h1>
      </div>

      <div className="operator-main">
        <h2>Select Form</h2>
        <p>Choose which form you want to fill</p>

        <div className="form-cards">
          <Link href="/inhouse-form" className="form-card">
            <div className="card-icon">🏭</div>
            <h3>Inhouse Rejection Form</h3>
            <p>Fill inhouse rejection details and submit data</p>
          </Link>

          <Link href="/machining-form" className="form-card">
            <div className="card-icon">👥</div>
            <h3>Machining Rejection Form</h3>
            <p>Fill machining rejection details and submit data</p>
          </Link>

          <Link href="/production-form" className="form-card">
            <div className="card-icon">📦</div>
            <h3>Production Data Form</h3>
            <p>Fill production data details and submit data</p>
          </Link>
        </div>

        <Link href="/operator-login">
          <button className="logout-btn-op" type="button">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}