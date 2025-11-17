import React, { useEffect } from "react";
import "../styles/alert.css";

export default function AlertSent() {

  useEffect(() => {
    console.log("🚨 SOS Triggered! Sending alert to guardian...");
  }, []);

  return (
    <div className="alert-wrapper">
      <h2>Alert Sent</h2>

      <div className="alert-box">
        <h3>🚨 Emergency Alert Triggered</h3>
        <p>No response received to safety check</p>
        <p>📍 Last Known Location: Your current location</p>
      </div>

      <h3>Emergency Contacts Notified</h3>

      <div className="contact-box">
        <p>Name: Guardian</p>
        <p>Status: ✔ Delivered</p>
      </div>

      <button className="view-btn">👁 View Guardian's View</button>

      <p className="footer">
        Your emergency contacts have been notified with your location & status.
      </p>
    </div>
  );
}
