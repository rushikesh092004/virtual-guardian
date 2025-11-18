import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-bar">

      <div className="nav-left">
        <h2 className="nav-logo">Virtual Guardian</h2>
      </div>

      <div className="nav-right">

        {/* Common Links (User + Guardian) */}
        <Link to="/user/dashboard">Dashboard</Link>
        <Link to="/track">Tracking</Link>
        <Link to="/sos">SOS</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/emergency">Emergency Contacts</Link>
        <Link to="/history">History</Link>
        <Link to="/profile">Profile</Link>

        {/* ✔ Updated Notifications link */}
        <Link to="/guardian/notifications" className="nav-noti">
  Notifications
  <span className="badge">
    {JSON.parse(localStorage.getItem("guardian_notifications") || "[]")
      .filter(n => !n.isRead).length}
  </span>
</Link>


        {/* Journey */}
        <Link to="/journey" className="nav-item">Journey</Link>

        {/* Logout */}
        <Link to="/" className="logout-btn">Logout</Link>
      </div>

    </nav>
  );
}
