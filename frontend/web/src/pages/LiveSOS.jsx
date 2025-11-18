import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/liveSOS.css";

export default function LiveSOS() {
  const [location, setLocation] = useState({ lat: 18.5204, lng: 73.8567 }); // Pune default
  const [lastUpdate, setLastUpdate] = useState("");

  // Auto-refresh every 10 seconds (mock live updates)
  useEffect(() => {
    const interval = setInterval(() => {
      // Mock movement simulation
      const newLat = location.lat + (Math.random() - 0.5) * 0.001;
      const newLng = location.lng + (Math.random() - 0.5) * 0.001;

      setLocation({ lat: newLat, lng: newLng });
      setLastUpdate(new Date().toLocaleTimeString());
    }, 10000);

    return () => clearInterval(interval);
  }, [location]);

  return (
    <>
      <Navbar />

      <div className="sos-wrapper">
        <div className="sos-card">
          <h2>🚨 Live SOS Tracking</h2>
          <p className="sub">Monitoring user's location in real time...</p>

          <div className="map-box">
            <iframe
              title="live-map"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
            ></iframe>
          </div>

          <p className="time">Last updated: {lastUpdate || "Just now"}</p>
        </div>
      </div>
    </>
  );
}
