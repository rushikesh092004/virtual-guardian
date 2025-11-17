import React, { useState } from "react";
import "../styles/sos.css";
import { useNavigate } from "react-router-dom";

export default function SOS() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="sos-wrapper">
      <div className="sos-card">

        <h2 className="sos-title">Emergency SOS</h2>
        <p className="sos-subtext">
          Press the button below to immediately notify your guardian.
        </p>

        {/* SOS BUTTON */}
        <button className="sos-button" onClick={() => setShowPopup(true)}>
          SEND SOS 🚨
        </button>

        <p className="sos-warning">
          ⚠️ This will send your real-time location to your assigned guardian.
        </p>

        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate("/user/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {/* POPUP BOX */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Confirm SOS Alert</h3>
            <p>Are you sure you want to send an SOS alert?</p>

            <div className="popup-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                className="btn-confirm"
                onClick={() => {
                  setShowPopup(false);
                  alert("🚨 SOS Alert Sent to Guardian!");
                }}
              >
                Yes, Send SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
