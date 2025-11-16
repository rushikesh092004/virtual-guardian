import "./../styles/dashboard.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function UserDashboard() {

  return (
    <div className="dash-wrapper">
      <div className="dash-container">

        <h2 className="dash-title">Welcome, User 👋</h2>

        {/* Dashboard Cards */}
        <div className="dash-grid">

          {/* Location */}
          <div className="dash-card">
            <h3>📍 Current Location</h3>
            <p>Pune, Maharashtra</p>
            <Link to="/track" className="dash-btn">Live Tracking</Link>
          </div>

          {/* SOS */}
          <div className="dash-card danger">
            <h3>🚨 Emergency SOS</h3>
            <p>Send alert to your guardian</p>
            <Link to="/sos" className="dash-btn danger-btn">Send SOS</Link>
          </div>

          {/* Guardian */}
          <div className="dash-card">
            <h3>👤 Assigned Guardian</h3>
            <p>Name: Rahul Patel</p>
            <p>📞 +91 98765 43210</p>
          </div>
        </div>

        {/* Footer Nav */}
        <div className="dash-footer">
          <Link to="/settings" className="footer-btn">Settings</Link>
          <Link to="/" className="footer-btn logout">Logout</Link>
        </div>

      </div>
    </div>
  );
}
