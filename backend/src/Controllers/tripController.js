// src/Controllers/tripController.js

// Simple in-memory "database"
let trips = [];
let nextId = 1;

// POST /api/trips/create
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

    const newTrip = {
      id: nextId++,
      title,
      status: "started",
      startedAt: now,
      expiresAt,
      contacts: contacts || [],
      lastLocation: initialLocation || null,
    };

    trips.push(newTrip);

    return res.status(201).json({
      message: "Trip created (in-memory)",
      trip: newTrip,
    });
  } catch (err) {
    console.error("Error in createTrip:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/trips/all
exports.getTrips = async (req, res) => {
  try {
    return res.json({
      message: "Trips fetched (in-memory)",
      trips,
    });
  } catch (err) {
    console.error("Error in getTrips:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/trips/:id/safe
exports.markSafe = async (req, res) => {
  try {
    const { id } = req.params;
    const tripId = parseInt(id, 10);

    const trip = trips.find((t) => t.id === tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.status = "safe";

    return res.json({
      message: `Trip ${id} marked safe (in-memory)`,
      trip,
    });
  } catch (err) {
    console.error("Error in markSafe:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// --- existing code above ---
// trips = [], nextId = 1, createTrip, getTrips, markSafe ...

// GET /api/trips/:id  -> get a single trip by id
exports.getTripById = async (req, res) => {
  try {
    const tripId = parseInt(req.params.id, 10);
    const trip = trips.find((t) => t.id === tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.json({
      message: 'Trip fetched (in-memory)',
      trip,
    });
  } catch (err) {
    console.error('Error in getTripById:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/trips/active  -> return latest "started" trip
exports.getActiveTrip = async (req, res) => {
  try {
    // Filter only started trips
    const startedTrips = trips.filter((t) => t.status === 'started');

    if (startedTrips.length === 0) {
      return res.status(404).json({ message: 'No active trip found' });
    }

    // Simple logic: pick the one with the latest startedAt
    const activeTrip = startedTrips.reduce((latest, current) => {
      return current.startedAt > latest.startedAt ? current : latest;
    });

    return res.json({
      message: 'Active trip fetched (in-memory)',
      trip: activeTrip,
    });
  } catch (err) {
    console.error('Error in getActiveTrip:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// src/Controllers/tripController.js

// ... your existing code above (trips array, nextId, createTrip, getTrips, markSafe, getTripById, getActiveTrip)

// POST /api/trips/:id/update-location
exports.updateLocation = async (req, res) => {
  try {
    const tripId = parseInt(req.params.id, 10);
    const { lat, lon, accuracy } = req.body;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "lat and lon are required in body",
      });
    }

    const trip = trips.find((t) => t.id === tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.lastLocation = {
      lat,
      lon,
      accuracy: accuracy || null,
      timestamp: Date.now(),
    };

    return res.json({
      message: "Location updated (in-memory)",
      trip,
    });
  } catch (err) {
    console.error("Error in updateLocation:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
