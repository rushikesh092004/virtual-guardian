import React, { useEffect } from "react";
import "../styles/splash.css";

export default function Splash() {
  useEffect(() => {
  const timer = setTimeout(() => {
    window.location.href = "/home";
  }, 2000);
  return () => clearTimeout(timer);
}, []);


  return (
    <div className="splash-container">
      <div className="splash-content">
        
        {/* App Logo */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
          alt="App Logo"
          className="splash-logo"
        />

        {/* App Name */}
        <h1 className="splash-title">Virtual Guardian</h1>

        {/* Loading Animation */}
        <div className="loader"></div>

      </div>
    </div>
  );
}
