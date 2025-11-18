import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/journey.css";

export default function StartJourney() {

  // ✅ MUST COME FIRST — before useEffect
  const navigate = useNavigate();
  const location = useLocation();

  const [duration, setDuration] = useState(60);
  const [remaining, setRemaining] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [warnings, setWarnings] = useState(0);

  console.log("Journey Render State:", {
    duration,
    remaining,
    isRunning,
    warnings,
    location: location.state
  });

  // ✅ RESUME TIMER WHEN USER RETURNS FROM SAFETY CHECK
  useEffect(() => {
    if (location.state?.resumeTimer) {
      console.log("⏳ Resuming timer...");
      setIsRunning(true);
    }
  }, [location]);

  // Resume journey after "I'm Safe"
  useEffect(() => {
    if (location.state?.continue) {
      setIsRunning(true);
      setWarnings(location.state?.warnings ?? warnings);
      console.log("Resuming Journey with warnings:", location.state?.warnings);
    }
  }, [location]);

  // If SOS triggered → stop everything
  useEffect(() => {
    if (location.state?.finalSOS) {
      console.log("❗ Final SOS detected — stopping journey");
      setIsRunning(false);
      setRemaining(null);
      setWarnings(0);
    }
  }, [location]);

  const startJourney = () => {
    setRemaining(duration * 60);
    setIsRunning(true);
    setWarnings(0);
    console.log("Journey Started");
  };

  // TIMER WORKFLOW
  useEffect(() => {
    if (!isRunning || remaining === null) return;

    // Timer ended → safety check
    if (remaining === 0) {
      navigate("/safety-check", { state: { warnings } });
      return;
    }

    // Safety check every 30 sec
    if (remaining % 30 === 0 && remaining !== duration * 60) {
      console.log("⏳ Triggering safety check due to interval");
      navigate("/safety-check", { state: { resumeTimer: true, warnings } });
    }

    const timer = setTimeout(() => setRemaining(remaining - 1), 1000);
    return () => clearTimeout(timer);

  }, [remaining, isRunning, warnings, duration, navigate]);

  return (
    <div className="journey-wrapper">
      <h2 className="trip-title">Virtual Guardian - Trip Monitor</h2>

      {!isRunning && (
        <div className="start-container">
          <div className="start-circle" onClick={startJourney}>
            Start Journey
          </div>

          <label className="duration-label">Trip Duration (minutes)</label>
          <input
            className="duration-input"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      )}

      {isRunning && remaining !== null && (
        <div className="timer-box">
          <h3>Journey Active</h3>

          <div className="circular">
            {Math.floor(remaining / 60)}:
            {("0" + (remaining % 60)).slice(-2)}
          </div>

          <p className="warning-text">Warnings: {warnings} / 3</p>

          <button className="stop-btn" onClick={() => setIsRunning(false)}>
            Stop Journey
          </button>
        </div>
      )}
    </div>
  );
}
