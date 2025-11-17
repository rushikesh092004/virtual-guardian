import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      
      <div className="nav-left">
        <h2 className="nav-logo">Virtual Guardian</h2>
      </div>

      <div className="nav-right">
        <Link to="/user/dashboard">Dashboard</Link>
        <Link to="/track">Tracking</Link>
        <Link to="/sos">SOS</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/emergency">Emergency Contacts</Link>
        <Link to="/history">History</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/" className="logout-btn">Logout</Link>
        <Link to="/journey" className="nav-item">Journey</Link>
        <Link to="/journey" className="nav-item">Journey</Link>


      </div>

    </nav>
  );
}
