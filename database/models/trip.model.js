// database/models/trip.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  type: { type: String, enum: ['sms', 'email'], required: true },
  value: { type: String, required: true }
}, { _id: false });

const LocationSchema = new Schema({
  lat: { type: Number },
  lon: { type: Number },
  accuracy: { type: Number },
  timestamp: { type: Date }
}, { _id: false });

const TripSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  title: { type: String, trim: true },
  status: { type: String, enum: ['started', 'safe', 'alert_sent', 'cancelled'], default: 'started' },
  startedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  lastLocation: { type: LocationSchema },
  contacts: { type: [ContactSchema], default: [] },
  meta: {
    deviceId: { type: String },
    appVersion: { type: String }
  }
}, {
  timestamps: true
});

// Indexes for fast cron queries
TripSchema.index({ status: 1, expiresAt: 1 });
TripSchema.index({ expiresAt: 1 });

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
