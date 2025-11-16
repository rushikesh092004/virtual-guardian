exports.createTrip = async (req, res) => {
  return res.json({ message: "Trip created (placeholder)" });
};

exports.getTrips = async (req, res) => {
  return res.json({ message: "Trips fetched (placeholder)" });
};

exports.markSafe = async (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Trip ${id} marked safe (placeholder)` });
};
