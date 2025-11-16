// TEMP MODE ALERT SERVICE (No Twilio, No SendGrid)

const sendAlert = async (trip) => {
  console.log("📩 [TEST MODE] Sending alert for trip:", trip._id);

  const locationLink = trip.lastLocation
    ? `https://www.google.com/maps/search/?api=1&query=${trip.lastLocation.lat},${trip.lastLocation.lon}`
    : "Location Not Available";

  const smsBody = `ALERT!\nTrip: ${trip.title}\nLast Location: ${locationLink}`;

  for (let contact of trip.contacts) {
    if (contact.type === "sms") {
      console.log(`📱 [TEST SMS] To: ${contact.value}`);
      console.log(`Message: ${smsBody}`);
    }

    if (contact.type === "email") {
      console.log(`📧 [TEST EMAIL] To: ${contact.value}`);
      console.log(`Message: ${smsBody}`);
    }
  }

  console.log("✔ [TEST MODE] Alerts simulated for:", trip._id);
};

module.exports = { sendAlert };
