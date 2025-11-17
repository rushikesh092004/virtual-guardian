const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/mongoConnection.js");
const tripRoutes = require("./routes/tripRoutes.js");
const { startCron } = require("./cron/checkExpiredTrips.js");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server + Database running" });
});

// Use routes
app.use("/api/trips", tripRoutes);

// Start cron
startCron && startCron();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
