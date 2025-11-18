import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/alert.css";

export default function AlertSent() {
  const location = useLocation();
  const isFinal = location.state?.finalSOS;

  useEffect(() => {
    console.log("🚨 FINAL SOS TRIGGERED");

    // TODO: send SMS/email/WhatsApp alert here

  }, []);

  return (
    <div className="alert-wrapper">
      <h2>{isFinal ? "Emergency Alert Sent" : "Alert Sent"}</h2>

      <div className="alert-box">
        <h3>🚨 {isFinal ? "User Unresponsive — SOS Triggered" : "Alert Triggered"}</h3>
        <p>No response received after 3 warnings.</p>
        <p>📍 Last known location will be sent to guardian.</p>
      </div>

      <p className="footer">
        Emergency contacts have been notified.
      </p>
    </div>
  );
}
