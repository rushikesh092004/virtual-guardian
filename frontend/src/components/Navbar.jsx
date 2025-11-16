import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          <h3 className="nav-logo">Virtual Guardian</h3>
        </div>

        {/* Desktop Menu */}
        <div className="nav-right desktop-menu">
          <Link to="/user/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/profile" className="nav-item">Profile</Link>
          <Link to="/settings" className="nav-item">Settings</Link>
          <Link to="/history" className="nav-item">History</Link>
          <Link to="/notifications" className="nav-item">Notifications</Link>
        </div>

        {/* Mobile Icon */}
        <div className="hamburger" onClick={() => setOpen(true)}>
          ☰
        </div>
      </div>

      {/* Drawer Menu */}
      <div className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Menu</h3>
          <span className="close-btn" onClick={() => setOpen(false)}>✖</span>
        </div>

        <Link to="/user/dashboard" className="drawer-item">Dashboard</Link>
        <Link to="/profile" className="drawer-item">Profile</Link>
        <Link to="/settings" className="drawer-item">Settings</Link>
        <Link to="/history" className="drawer-item">Alert History</Link>
        <Link to="/notifications" className="drawer-item">Notifications</Link>
        <Link to="/sos" className="drawer-item">SOS</Link>

        <button className="drawer-logout">Logout</button>
      </div>

      {/* Overlay */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
