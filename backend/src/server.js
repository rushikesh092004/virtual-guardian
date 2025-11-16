// src/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { startCron } = require("./cron/checkExpiredTrips.js");
const tripRoutes = require("./routes/tripRoutes.js");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Use routes
app.use("/api/trips", tripRoutes);

// Start cron (it will just log using fake DB for now)
startCron && startCron();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
