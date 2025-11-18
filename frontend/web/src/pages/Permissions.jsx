import React, { useState } from "react";
import "../styles/permissions.css";
import { useNavigate } from "react-router-dom";

export default function Permissions() {
  const navigate = useNavigate();

  const [location, setLocation] = useState(false);
  const [motion, setMotion] = useState(false);
  const [notify, setNotify] = useState(false);

  const allGranted = location && motion && notify;

  const handleContinue = () => {
    // store permission status
    localStorage.setItem("permissionsDone", "true");

    // Go to Emergency Contacts page next
    navigate("/emergency");
  };

  return (
    <div className="permission-wrapper">
      <div className="permission-card">
        <h2 className="perm-title">Permissions Required</h2>
        <p className="perm-sub">
          These permissions help us keep you safe<br />
          during your travels.
        </p>

        {/* LOCATION */}
        <div className="perm-box blue-box">
          <div className="perm-icon">📍</div>
          <div className="perm-info">
            <h3>Location Access</h3>
            <p>Share your location with emergency contacts when needed.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={location}
              onChange={() => setLocation(!location)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* MOTION */}
        <div className="perm-box green-box">
          <div className="perm-icon">📈</div>
          <div className="perm-info">
            <h3>Motion Sensors</h3>
            <p>Detect if you're unable to respond to safety prompts.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={motion}
              onChange={() => setMotion(!motion)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* NOTIFICATIONS */}
        <div className="perm-box blue-box">
          <div className="perm-icon">🔔</div>
          <div className="perm-info">
            <h3>Notifications</h3>
            <p>Receive safety prompts and important alerts.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={notify}
              onChange={() => setNotify(!notify)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* STATUS MESSAGE */}
        {allGranted && (
          <div className="granted">✔ All permissions granted!</div>
        )}

        {/* CONTINUE BUTTON */}
        <button
          className={`continue-btn ${allGranted ? "active" : ""}`}
          disabled={!allGranted}
          onClick={handleContinue}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
