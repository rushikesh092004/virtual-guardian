const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  title: String,
  status: String,
  expiresAt: Number,
  lastLocation: {
    lat: Number,
    lon: Number,
    accuracy: Number,
    timestamp: Number,
  },
  contacts: [
    {
      type: { type: String },
      value: String,
    },
  ],
  alertedAt: Number,
  startedAt: Number,
});

module.exports = mongoose.model("Trip", tripSchema);
