import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import notifyGuardian from "../utils/notifyGuardian"; 
import "../styles/safety.css";

export default function SafetyCheck() {
  const navigate = useNavigate();
  const location = useLocation();

  const warnings = location.state?.warnings ?? 0;
  const [sec, setSec] = useState(5);

  useEffect(() => {
    if (sec === 0) {
      if (warnings + 1 >= 3) {
        notifyGuardian("🚨 User unresponsive — SOS triggered");
        navigate("/alert-sent", { state: { finalSOS: true } });
      } else {
        notifyGuardian("⚠ User missed safety check");
        navigate("/journey", { 
  state: { 
    continue: true, 
    warnings: warnings + 1,
    resumeTimer: true    // <-- also here!
  } 
});

      }
      return;
    }

    const t = setTimeout(() => setSec(sec - 1), 1000);
    return () => clearTimeout(t);
  }, [sec]);

  const confirmSafe = () => {
  notifyGuardian("✔ User confirmed they are safe");

  navigate("/journey", { 
    state: { 
      continue: true,
      warnings: 0,
      resumeTimer: true
    } 
  });
};


  return (
    <div className="safety-wrapper">
      <div className="card">
        <div className="shield-icon">🛡</div>

        <h2>Safety Check</h2>
        <p>Please confirm within {sec} seconds</p>

        <div className="countdown">{sec}</div>

        <button className="safe-btn" onClick={confirmSafe}>
          ✔ Yes, I'm Safe
        </button>

        <p className="warn">⚠ Warning {warnings + 1} of 3</p>
      </div>
    </div>
  );
}
