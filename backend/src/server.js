const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/tripRoutes.js");
const { startCron } = require("./cron/checkExpiredTrips.js");

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// DB Config
// Temporary: Skip DB until real Mongo is ready
console.log("⚠ Skipping MongoDB Connection — Using Fake Data Mode");


// Routes
app.use("/api", routes);

// Start cron job
startCron();

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
