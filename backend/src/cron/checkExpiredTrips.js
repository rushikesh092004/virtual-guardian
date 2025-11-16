const cron = require("node-cron");
const { sendAlert } = require("../services/alertService.js");

const startCron = () => {
  console.log("⏱ Cron job running...");

  cron.schedule("* * * * *", async () => {
    try {
      console.log("Cron running... checking for fake trips");

      // FAKE EXPIRED TRIP — ALWAYS TRIGGERED
      const expiredTrips = [
        {
          _id: "TEST123",
          title: "Fake Trip Test",
          lastLocation: { lat: 19.07, lon: 72.87 },
          contacts: [
            { type: "sms", value: "+911234567890" },
            { type: "email", value: "test@example.com" }
          ],
        }
      ];

      // Loop over fake expired trip
      for (let trip of expiredTrips) {
        console.log("Found expired test trip:", trip._id);

        await sendAlert(trip);
      }
    } catch (error) {
      console.log("Cron error:", error);
    }
  });
};

module.exports = { startCron };