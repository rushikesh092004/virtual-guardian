import React from "react";
import Navbar from "../components/Navbar";
import "../styles/notifications.css";
import { useEffect } from "react";

export default function Notifications() {
    useEffect(() => {
  const timer = setTimeout(() => {
    window.location.href = "/user/dashboard";
  }, 2000);
  return () => clearTimeout(timer);
}, []);

  const notifications = [
    {
      title: "SOS Alert Triggered",
      time: "Just now",
      desc: "Teen user sent an emergency SOS.",
      type: "danger",
    },
    {
      title: "Location Shared",
      time: "5 minutes ago",
      desc: "Live location updated.",
      type: "info",
    },
    {
      title: "Tracking Started",
      time: "Yesterday • 9:15 PM",
      desc: "Guardian started live tracking.",
      type: "success",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="notify-wrapper">
        <div className="notify-card">
          <h2 className="notify-title">Notifications</h2>

          {notifications.map((n, i) => (
            <div className={`notify-item ${n.type}`} key={i}>
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
