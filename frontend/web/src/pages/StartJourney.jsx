import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/journey.css";

export default function StartJourney() {
    // TIMER WORKFLOW (NO immediate safety alert)
useEffect(() => {
  if (!isRunning || remaining === null) return;

  // Timer ends → Force safety check
  if (remaining === 0) {
    navigate("/safety-check", { state: { resume: true } });
    return;
  }

  // Safety check ONLY after some time has passed (not immediately)
  if (remaining < duration * 60 && remaining % 10 === 0)
{
    navigate("/safety-check", { state: { resume: true } });
  }

  const t = setTimeout(() => setRemaining(remaining - 1), 1000);
  return () => clearTimeout(t);
}, [remaining, isRunning]);

  const navigate = useNavigate();
  const location = useLocation();

  const [duration, setDuration] = useState(60);       // minutes
  const [remaining, setRemaining] = useState(null);   // timer seconds
  const [isRunning, setIsRunning] = useState(false);

  // If user clicked “I’m Safe”, resume journey timer
  useEffect(() => {
    if (location.state?.continue === true) {
      setIsRunning(true);
    }
  }, [location]);

  const startJourney = () => {
    setRemaining(duration * 60); 
    setIsRunning(true);
  };

  // TIMER WORKFLOW
  useEffect(() => {
    if (!isRunning || remaining === null) return;

    if (remaining === 0) {
      navigate("/safety-check", { state: { resume: true } });
      return;
    }

    // Safety check every 60 sec (you can increase later)
    if (remaining % 60 === 0) {
      navigate("/safety-check", { state: { resume: true } });
    }

    const t = setTimeout(() => setRemaining(remaining - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, isRunning, navigate]);

  return (
    <div className="journey-wrapper">
      <h2>Virtual Guardian - Trip Monitor</h2>

      {!isRunning && (
        <>
          <div className="start-circle" onClick={startJourney}>
            <p>Start Journey</p>
          </div>

          <label>Trip Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </>
      )}

      {isRunning && (
        <div className="timer-box">
          <h3>Journey Active</h3>
          <div className="circular">
            <p>{Math.floor(remaining / 60)}:{("0" + (remaining % 60)).slice(-2)}</p>
          </div>

          <p>You are being monitored</p>

          <button className="stop-btn" onClick={() => setIsRunning(false)}>
            Stop Journey
          </button>
        </div>
      )}
    </div>
  );
}
