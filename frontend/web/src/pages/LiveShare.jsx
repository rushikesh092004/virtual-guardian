import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import notifyGuardian from "../utils/notifyGuardian.js";
import "../styles/liveShare.css";

export default function LiveShare() {
  const [location, setLocation] = useState({ lat: 18.5204, lng: 73.8567 });
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    notifyGuardian("📍 User started sharing live location");

    const interval = setInterval(() => {
      const newLat = location.lat + (Math.random() - 0.5) * 0.001;
      const newLng = location.lng + (Math.random() - 0.5) * 0.001;

      setLocation({ lat: newLat, lng: newLng });
      setLastUpdate(new Date().toLocaleTimeString());
    }, 10000);

    return () => {
      notifyGuardian("❌ User stopped sharing live location");
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="share-wrapper">
        <div className="share-card">
          <h2>🔵 Live Location Sharing</h2>
          <p className="sub">Guardian is seeing your location in real-time.</p>

          <div className="map-box">
            <iframe
              title="live-share-map"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"
              src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
            ></iframe>
          </div>

          <p className="time">Last updated: {lastUpdate || "Just now"}</p>
        </div>
      </div>
    </>
  );
}
