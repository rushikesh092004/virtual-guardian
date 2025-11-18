export default function notifyGuardian(message) {
  const logs = JSON.parse(localStorage.getItem("guardian_notifications")) || [];

  logs.push({
    id: Date.now(),
    message,
    time: new Date().toLocaleString(),
    isRead: false
  });

  localStorage.setItem("guardian_notifications", JSON.stringify(logs));
}
