import "../styles/history.css";
import { useNavigate } from "react-router-dom";

export default function AlertHistory() {
  const navigate = useNavigate();

  const alerts = [
    {
      title: "🚨 SOS Alert Sent",
      time: "Today • 10:24 AM",
    },
    {
      title: "📍 Location Shared",
      time: "Yesterday • 9:10 PM",
    },
    {
      title: "🛰 Tracking Started",
      time: "Yesterday • 8:43 PM",
    },
    {
      title: "📍 Location Updated",
      time: "Yesterday • 7:30 PM",
    }
  ];

  return (
    <div className="history-wrapper">
      <div className="history-card">

        <h2 className="history-title">Alert History</h2>

        {/* ALERT LIST */}
        <div className="history-list">
          {alerts.map((item, index) => (
            <div className="history-item" key={index}>
              <h3>{item.title}</h3>
              <p className="history-time">{item.time}</p>
            </div>
          ))}
        </div>

        {/* BACK BUTTON */}
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
