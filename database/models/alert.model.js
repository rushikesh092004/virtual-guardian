// database/models/alert.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChannelSchema = new Schema({
  type: { type: String, enum: ['sms', 'email', 'push'], required: true },
  to: { type: String, required: true },
  providerResponse: { type: Schema.Types.Mixed, default: {} }
}, { _id: false });

const AlertSchema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  channels: { type: [ChannelSchema], default: [] },
  status: { type: String, enum: ['sent', 'failed', 'pending'], default: 'pending' },
  sentAt: { type: Date }
}, {
  timestamps: true
});

// index for quick lookup of alerts by trip
AlertSchema.index({ tripId: 1 });

const Alert = mongoose.model('Alert', AlertSchema);
module.exports = Alert;
