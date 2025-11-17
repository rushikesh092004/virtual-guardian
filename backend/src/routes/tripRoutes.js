// src/routes/tripRoutes.js
const express = require("express");
const router = express.Router();

const tripController = require("../Controllers/tripController.js");

// Create a trip
router.post("/create", tripController.createTrip);

// Get all trips
router.get("/all", tripController.getTrips);

// Get single trip by id
router.get("/:id", tripController.getTripById);

// Get active trip
router.get("/active/latest", tripController.getActiveTrip);

// Mark trip safe
router.post("/:id/safe", tripController.markSafe);

// Update location during trip
router.post("/:id/update-location", tripController.updateLocation);

// Simple test route
router.get("/test/ping", (req, res) => {
  res.json({ message: "API working properly!" });
});

module.exports = router;
