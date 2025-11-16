// src/routes/tripRoutes.js
const express = require("express");
const router = express.Router();

const tripController = require("../Controllers/tripController.js");

// Create a trip
router.post("/create", tripController.createTrip);

// Get all trips
router.get("/all", tripController.getTrips);

// Mark trip safe
router.post("/:id/safe", tripController.markSafe);

module.exports = router;
