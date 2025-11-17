import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/safety.css";

export default function SafetyCheck() {
  const navigate = useNavigate();
  const [sec, setSec] = useState(5);

  useEffect(() => {
    if (sec === 0) {
      // Fail → alert sent
      navigate("/alert-sent");
    }

    const t = setTimeout(() => setSec(sec - 1), 1000);
    return () => clearTimeout(t);
  }, [sec, navigate]);

  return (
    <div className="safety-wrapper">
      <div className="card">
        <div className="shield-icon">🛡</div>

        <h2>Safety Check</h2>
        <p>Please confirm within {sec} seconds</p>

        <div className="countdown">{sec}</div>

        <button
          className="safe-btn"
          onClick={() => navigate("/journey", { state: { continue: true } })}
        >
          ✔ I'm Safe
        </button>

        <p className="warn">⚠ No response will trigger an emergency alert</p>
      </div>
    </div>
  );
}
