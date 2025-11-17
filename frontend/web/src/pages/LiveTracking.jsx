import "./../styles/tracking.css";
import { useNavigate } from "react-router-dom";

export default function LiveTracking() {
  const navigate = useNavigate();

  return (
    <div className="track-wrapper">
      <div className="track-container">
        
        <h2 className="track-title">Live Location Tracking</h2>

        {/* Map Preview Box */}
        <div className="map-box">
          <p className="map-placeholder">[ Map will be displayed here ]</p>
        </div>

        {/* Location Info */}
        <div className="location-info">
          <p><strong>Latitude:</strong> 18.5204</p>
          <p><strong>Longitude:</strong> 73.8567</p>
          <p className="note">*Tracking will show real location after backend connection</p>
        </div>

        {/* Start/Stop Buttons */}
        <div className="track-buttons">
          <button
            className="start-btn"
            onClick={() => alert("Tracking Started")}
          >
            Start Tracking
          </button>

          <button
            className="stop-btn"
            onClick={() => alert("Tracking Stopped")}
          >
            Stop Tracking
          </button>
        </div>

        {/* Back Button */}
        <button 
          className="back-btn"
          onClick={() => navigate("/user/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
