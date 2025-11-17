// src/Controllers/tripController.js
const Trip = require("../database/models/trip");


// -------------------------------
// CREATE TRIP
// -------------------------------
exports.createTrip = async (req, res) => {
  try {
    const { title, durationMinutes, contacts, initialLocation } = req.body;

    if (!title || !durationMinutes) {
      return res.status(400).json({
        message: "title and durationMinutes are required",
      });
    }

    const now = Date.now();
    const expiresAt = now + durationMinutes * 60 * 1000;

    const trip = await Trip.create({
      title,
      status: "started",
      startedAt: now,
      expiresAt,
      contacts: contacts || [],
      lastLocation: initialLocation || null,
    });

    return res.status(201).json({
      message: "Trip created (MongoDB)",
      trip,
    });
  } catch (err) {
    console.error("Error in createTrip:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// -------------------------------
// GET ALL TRIPS
// -------------------------------
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ startedAt: -1 });
    return res.json({
      message: "Trips fetched (MongoDB)",
      trips,
    });
  } catch (err) {
    console.error("Error in getTrips:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// -------------------------------
// GET TRIP BY ID
// -------------------------------
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.json({
      message: "Trip fetched (MongoDB)",
      trip,
    });
  } catch (err) {
    console.error("Error in getTripById:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// -------------------------------
// GET ACTIVE TRIP (LATEST "started")
// -------------------------------
exports.getActiveTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ status: "started" })
      .sort({ startedAt: -1 });

    if (!trip) {
      return res.status(404).json({ message: "No active trip found" });
    }

    return res.json({
      message: "Active trip fetched (MongoDB)",
      trip,
    });
  } catch (err) {
    console.error("Error in getActiveTrip:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// -------------------------------
// MARK SAFE
// -------------------------------
exports.markSafe = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.status = "safe";
    trip.alertedAt = Date.now();

    await trip.save();

    return res.json({
      message: "Trip marked safe (MongoDB)",
      trip,
    });
  } catch (err) {
    console.error("Error in markSafe:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// -------------------------------
// UPDATE LOCATION
// -------------------------------
exports.updateLocation = async (req, res) => {
  try {
    const { lat, lon, accuracy } = req.body;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "lat and lon are required",
      });
    }

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.lastLocation = {
      lat,
      lon,
      accuracy: accuracy || null,
      timestamp: Date.now(),
    };

    await trip.save();

    return res.json({
      message: "Location updated (MongoDB)",
      trip,
    });
  } catch (err) {
    console.error("Error in updateLocation:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

