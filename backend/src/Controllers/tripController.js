// Simple in-memory "database"
let trips = [];
let nextId = 1;

// POST /api/trips/create
exports.createTrip = async (req, res) => {
  try {
    const { title, durationMinutes, contacts, initialLocation } = req.body;

    if (!title || !durationMinutes) {
      return res.status(400).json({
        message: 'title and durationMinutes are required',
      });
    }

    const now = Date.now();
    const expiresAt = now + durationMinutes * 60 * 1000;

    const newTrip = {
      id: nextId++,
      title,
      status: 'started',
      startedAt: now,
      expiresAt,
      contacts: contacts || [],
      lastLocation: initialLocation || null,
    };

    trips.push(newTrip);

    return res.status(201).json({
      message: 'Trip created (in-memory)',
      trip: newTrip,
    });
  } catch (err) {
    console.error('Error in createTrip:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/trips/all
exports.getTrips = async (req, res) => {
  try {
    return res.json({
      message: 'Trips fetched (in-memory)',
      trips,
    });
  } catch (err) {
    console.error('Error in getTrips:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/trips/:id/safe
exports.markSafe = async (req, res) => {
  try {
    const { id } = req.params;
    const tripId = parseInt(id, 10);

    const trip = trips.find((t) => t.id === tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.status = 'safe';

    return res.json({
      message: `Trip ${id} marked safe (in-memory)`,
      trip,
    });
  } catch (err) {
    console.error('Error in markSafe:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
