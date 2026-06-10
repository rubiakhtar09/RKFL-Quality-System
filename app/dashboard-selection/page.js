"use client";

import { useRouter } from "next/navigation";

import "./dashboard-selection.css";


export default function DashboardSelection() {

  const router = useRouter();

  return (
    <div className="dashboard-selection-page">

      {/* 🔵 Top Header */}
      <div className="topbar">
        <h2>RKFL Dashboard Panel</h2>
      </div>

      {/* 🔹 Main Content */}
      <div className="dashboard-content">

        <h1>Select Dashboard</h1>
        <p>Please choose the dashboard you want to open</p>

        <div className="dashboard-cards">

          {/* Card 1 */}
          <div
            className="dashboard-card"
            onClick={() =>
              router.push("/inhouse-dashboard")
            }
          >
            <div className="card-icon">🏭</div>
            <h3>IN-HOUSE REJECTION</h3>
            <p>
              Open inhouse rejection dashboard and see rejection related details.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="dashboard-card"
            onClick={() =>
              router.push("/Machining-dashboard")
            }
          >
            <div className="card-icon">👥</div>
            <h3>MACHINING REJECTION</h3>
            <p>
              Open the Machining Rejection dashboard to view related data and analysis.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="dashboard-card"
            onClick={() =>
              router.push("/total-dashboard")
            }
          >
            <div className="card-icon">📊</div>
            <h3>TOTAL REJECTION</h3>
            <p>
              Open total rejection and view combined production and rejection summary.
            </p>
          </div>

        </div>

        {/* 🔙 Back Button */}
        <button
          className="back-btn"
          onClick={() =>
            router.push("/")
          }
        >
          Back
        </button>

      </div>

    </div>
  );
}