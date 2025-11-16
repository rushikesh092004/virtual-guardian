import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/sos.css";

export default function SOS() {

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Navbar />

      <div className="sos-wrapper">
        <div className="sos-card">

          <h2 className="sos-title">Emergency SOS</h2>
          <p className="sos-subtext">
            Press the button below to immediately notify your guardian.
          </p>

          <button className="sos-button" onClick={() => setShowPopup(true)}>
            SEND SOS 
          </button>

          <p className="sos-warning">
             This action will send your live location to your assigned guardian.
          </p>
        </div>

        {/* POPUP CONFIRMATION */}
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
                    alert(" SOS alert sent to guardian!");
                  }}
                >
                  Yes, Send SOS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
