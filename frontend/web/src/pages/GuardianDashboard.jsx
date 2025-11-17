import React from "react";
import Navbar from "../components/Navbar";
import "../styles/guardianDashboard.css";

export default function GuardianDashboard() {
  return (
    <>
      <Navbar />
      <div className="guardian-wrapper">
        <h2 className="guardian-title">Guardian Dashboard</h2>
        <div className="guardian-grid">
          <div className="guardian-map-card">
            <h3 className="card-title">📍 Live Location</h3>
            <div className="map-box">
              <p className="map-text">Map Preview Coming Soon</p>
            </div>
            <p className="location-info">
              Last location update: <b>Pune, Maharashtra</b>
            </p>
          </div>

          <div className="guardian-side">
            <div className="status-card">
              <h3 className="card-title">👤 Teen Status</h3>
              <p><strong>Name:</strong> Sanchita</p>
              <p><strong>Battery:</strong> 76%</p>
              <p><strong>Safety Status:</strong> <span className="safe">Safe</span></p>
            </div>

            <div className="alerts-card">
              <h3 className="card-title">🚨 Recent Alerts</h3>
              <div className="alert-item">
                <p><b>SOS Triggered</b></p>
                <p className="alert-time">10:24 AM • Today</p>
              </div>
              <div className="alert-item">
                <p><b>Location Shared</b></p>
                <p className="alert-time">Yesterday • 9:10 PM</p>
              </div>
              <div className="alert-item">
                <p><b>Tracking Started</b></p>
                <p className="alert-time">Yesterday • 8:43 PM</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
