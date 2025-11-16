import React from "react";
import Navbar from "../components/Navbar";
import "../styles/alertHistory.css";
import { useEffect } from "react";

export default function AlertHistory() {
    useEffect(() => {
  const timer = setTimeout(() => {
    window.location.href = "/profile";
  }, 2000);
  return () => clearTimeout(timer);
}, []);

  const alerts = [
    {
      type: "SOS Alert",
      time: "Today • 10:24 AM",
      location: "Pune Station Road",
      status: "Resolved",
    },
    {
      type: "SOS Alert",
      time: "Yesterday • 8:43 PM",
      location: "Kharadi, Pune",
      status: "Pending",
    },
    {
      type: "Location Shared",
      time: "Yesterday • 5:30 PM",
      location: "Viman Nagar, Pune",
      status: "Resolved",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="history-wrapper">
        <div className="history-card">
          <h2 className="history-title">Alert History</h2>

          {alerts.map((a, index) => (
            <div className="history-item" key={index}>
              <div>
                <h3 className="alert-type">{a.type}</h3>
                <p className="alert-time">{a.time}</p>
                <p className="alert-location">📍 {a.location}</p>
              </div>

              <span
                className={`status-badge ${
                  a.status === "Resolved" ? "resolved" : "pending"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
