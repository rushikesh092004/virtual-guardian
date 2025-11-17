import React, { useEffect } from "react";
import "../styles/splash.css";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");   // Smooth React navigation
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
          alt="logo"
          className="splash-logo"
        />
        <h1 className="splash-title">Virtual Guardian</h1>
        <div className="loader"></div>
      </div>
    </div>
  );
}
