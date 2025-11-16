import "./../styles/landing.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Landing() {


  

  return (
    <div className="landing-wrapper">
      <div className="landing-card">

        <h1 className="landing-title">Virtual Guardian</h1>
        <p className="landing-subtitle">Your Personal Safety Companion</p>

        <div className="landing-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/register" className="btn-secondary">Register</Link>
        </div>

      </div>
    </div>
  );
}
