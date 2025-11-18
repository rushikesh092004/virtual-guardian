import "./../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="page-content">
        <h2 className="dash-title">Welcome, User 👋</h2>

        {/* Dashboard Cards */}
        <div className="dash-grid">

          {/* LOCATION CARD */}
          <div className="dash-card">
            <h3>📍 Current Location</h3>
            <p>Pune, Maharashtra</p>
            <button 
              className="dash-btn" 
              onClick={() => navigate("/track")}
            >
              Live Tracking
            </button>
          </div>

          {/* SOS CARD */}
          <div className="dash-card danger">
            <h3>🚨 Emergency SOS</h3>
            <p>Send alert to your guardian</p>
            <button 
              className="dash-btn danger-btn"
              onClick={() => navigate("/sos")}
            >
              Send SOS
            </button>
          </div>

          {/* LIVE LOCATION SHARING CARD — ⭐ NEW ⭐ */}
          <div className="dash-card">
            <h3>🔵 Live Location Sharing</h3>
            <p>Share your live location with your guardian</p>
            <button 
              className="dash-btn" 
              onClick={() => navigate("/live-share")}
            >
              Share Live Location
            </button>
          </div>

          {/* GUARDIAN CARD */}
          <div className="dash-card">
            <h3>👤 Assigned Guardian</h3>
            <p>Name: Rahul Patel</p>
            <p>📞 +91 98765 43210</p>
          </div>

        </div>
      </div>
    </div>
  );
}
