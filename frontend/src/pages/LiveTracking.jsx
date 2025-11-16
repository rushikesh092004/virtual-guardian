import "./../styles/tracking.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LiveTracking() {

  return (
    <div className="track-wrapper">
      <div className="track-container">
        <h2 className="track-title">Live Location Tracking</h2>

        {/* Map Box */}
        <div className="map-box">
          <p className="map-placeholder">[ Map will be displayed here ]</p>
        </div>

        {/* Location Details */}
        <div className="location-info">
          <p><strong>Latitude:</strong> 18.5204</p>
          <p><strong>Longitude:</strong> 73.8567</p>
          <p className="note">*Tracking enabled after backend connection</p>
        </div>

        {/* Buttons */}
        <div className="track-buttons">
          <button className="start-btn">Start Tracking</button>
          <button className="stop-btn">Stop Tracking</button>
        </div>

        <Link to="/user/dashboard" className="back-btn">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
