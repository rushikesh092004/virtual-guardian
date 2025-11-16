import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  title: String,
  status: String,
  expiresAt: Number,
  lastLocation: {
    lat: Number,
    lon: Number
  },
  contacts: [
    {
      type: { type: String },
      value: String
    }
  ],
  alertedAt: Number
});

export default mongoose.model("Trip", tripSchema);
