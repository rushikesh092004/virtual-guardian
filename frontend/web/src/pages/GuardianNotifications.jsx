import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/guardianNotifications.css";

export default function GuardianNotifications() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("guardian_notifications")) || [];

    // Mark all as read
    const updated = saved.map(n => ({ ...n, isRead: true }));

    setLogs(updated.reverse());

    localStorage.setItem("guardian_notifications", JSON.stringify(updated));
  }, []);

  // Clear all notifications
  const clearAll = () => {
    if (window.confirm("Clear all notifications?")) {
      localStorage.removeItem("guardian_notifications");
      setLogs([]);
    }
  };

  return (
    <>
      <Navbar />

      <div className="gn-wrapper">
        <div className="gn-card">
          <h2 className="gn-title">Notifications</h2>
          <p className="gn-sub">Alerts received from the user's journey</p>

          {logs.length === 0 ? (
            <p className="gn-empty">No notifications yet.</p>
          ) : (
            <>
              <button className="gn-clear" onClick={clearAll}>
                Clear All
              </button>

              <div className="gn-list">
                {logs.map((n) => (
                  <div
                    className={`gn-item ${n.message.includes("SOS") ? "sos" : ""}`}
                    key={n.id}
                  >
                    <h3>{n.message}</h3>
                    <p className="gn-time">{n.time}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
