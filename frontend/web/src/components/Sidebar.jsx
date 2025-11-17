import { Link, useNavigate } from "react-router-dom";
import "./../styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Virtual Guardian</h2>

      <ul className="sidebar-menu">
        
        {/* MAIN MENU */}
        <li><Link to="/user/dashboard">📊 Dashboard</Link></li>
        <li><Link to="/track">📍 Live Tracking</Link></li>
        <li><Link to="/sos">🚨 SOS</Link></li>

        {/* SECTION */}
        <li className="sidebar-section">User</li>

        <li><Link to="/profile">👤 Profile</Link></li>
        <li><Link to="/settings">⚙️ Settings</Link></li>
        <li><Link to="/emergency">📞 Emergency Contacts</Link></li>
        <li><Link to="/history">🕘 History</Link></li>
        <li><Link to="/notifications">🔔 Notifications</Link></li>

        {/* LOGOUT */}
        <li className="logout-btn">
          <button 
            onClick={() => navigate("/home")}
            className="logout-button"
          >
            🚪 Logout
          </button>
        </li>

      </ul>
    </div>
  );
}
