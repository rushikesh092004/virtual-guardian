import React from "react";
import Navbar from "../components/Navbar";
import "../styles/notifications.css";

export default function Notifications() {
  const notifications = [
    { title: "SOS Alert Triggered", time: "Just now", desc: "Teen user sent an emergency SOS.", type: "danger" },
    { title: "Location Shared", time: "5 minutes ago", desc: "Live location updated.", type: "info" }
  ];

  return (
    <>
      <Navbar />
      <div className="notify-wrapper">
        <div className="notify-card">
          <h2 className="notify-title">Notifications</h2>
          {notifications.map((n,i) => (
            <div key={i} className={`notify-item ${n.type}`}>
              <div>
                <h3 className="notify-header">{n.title}</h3>
                <p className="notify-desc">{n.desc}</p>
                <p className="notify-time">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
