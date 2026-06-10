import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div className="page">
      <div className="topbar">
        <div className="left-icons">
          <span>←</span>
          <span>⟳</span>
        </div>

        <h3>RKFL Quality System</h3>

        <div className="right-icons">
          <span>▣</span>
          <span>⋮</span>
        </div>
      </div>

      <main className="main-section">
        <div className="role-card">
          <h1>
            RKFL Quality
            <br />
            System
          </h1>

          <p>Select Your Role</p>

          <Link href="/admin-login" className="link-btn">
            <button className="btn admin-btn" type="button">
              Admin Login
            </button>
          </Link>

          <Link href="/operator-login" className="link-btn">
            <button className="btn operator-btn" type="button">
              Operator Login
            </button>
          </Link>

          <Link href="/dashboard-selection" className="link-btn">
            <button className="btn dashboard-btn" type="button">
              View Dashboard
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}