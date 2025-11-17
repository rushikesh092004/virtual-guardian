import React from "react";
import "../styles/settings.css";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const handleSave = () => {
    alert("Profile Updated Successfully!");
    navigate("/user/dashboard"); // go back to dashboard after saving
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-card">

        <h2 className="settings-title">Account Settings</h2>

        {/* PROFILE INFORMATION */}
        <div className="settings-section">
          <h3>👤 Profile Information</h3>

          <label>Full Name</label>
          <input type="text" placeholder="Sanchita Sapkal" />

          <label>Email Address</label>
          <input type="email" placeholder="sanchita@gmail.com" />

          <label>Phone Number</label>
          <input type="text" placeholder="+91 98765 43210" />

          <label>Role</label>
          <select>
            <option>User</option>
            <option>Guardian</option>
          </select>
        </div>

        {/* PASSWORD CHANGE */}
        <div className="settings-section">
          <h3>🔐 Change Password</h3>

          <label>Current Password</label>
          <input type="password" placeholder="Enter current password" />

          <label>New Password</label>
          <input type="password" placeholder="New password" />

          <label>Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" />
        </div>

        {/* BUTTONS */}
        <div className="settings-buttons">
          <button className="btn-cancel">Cancel</button>

          <button className="btn-save" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        {/* Link to Emergency Contacts */}
        <div className="settings-footer">
          <p>
            Want to manage emergency contacts?{" "}
            <span 
              className="click-here" 
              onClick={() => navigate("/emergency")}
            >
              Click Here
            </span>
          </p>
        </div>

        {/* Back to Dashboard */}
        <button
          className="back-btn"
          onClick={() => navigate("/user/dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>
    </div>
  );
}
