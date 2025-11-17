import React from "react";
import Navbar from "../components/Navbar";
import "../styles/teenProfile.css";

export default function TeenProfile() {
  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="profile-image-box">
            <img src="https://cdn-icons-png.flaticon.com/512/219/219970.png" alt="Profile" className="profile-image" />
          </div>
          <h2 className="profile-name">Sanchita Sapkal</h2>
          <p className="profile-email">sanchita@gmail.com</p>
          <p className="profile-phone">📞 +91 98765 43210</p>
          <div className="profile-info-box">
            <p><strong>Age:</strong> 21</p>
            <p><strong>Location:</strong> Pune, Maharashtra</p>
            <p><strong>Role:</strong> Teen User</p>
          </div>
          <div className="status-box"><h3>Safety Status</h3><p className="status safe">SAFE</p></div>
          <div className="stats-container">
            <div className="stat-item"><h4>5</h4><p>SOS Alerts</p></div>
            <div className="stat-item"><h4>23</h4><p>Location Updates</p></div>
            <div className="stat-item"><h4>1</h4><p>Guardian</p></div>
          </div>
        </div>
      </div>
    </>
  );
}
