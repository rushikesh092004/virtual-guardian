import React from "react";
import Navbar from "../components/Navbar";
import "../styles/settings.css";

export default function Settings() {

  return (
    <>
      <Navbar />

      <div className="settings-wrapper">
        <div className="settings-card">
          <h2 className="settings-title">Account Settings</h2>

          {/* PROFILE SECTION */}
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

          {/* PASSWORD SECTION */}
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
            <button className="btn-save">Save Changes</button>
          </div>

          <div className="settings-footer">
            <p>
              Want to manage emergency contacts?{" "}
              <a href="/emergency">Click Here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
