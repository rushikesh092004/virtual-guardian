// database/models/user.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  type: { type: String, enum: ['sms', 'email'], required: true },
  value: { type: String, required: true },
}, { _id: false });

const UserSchema = new Schema({
  displayName: { type: String, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  settings: {
    defaultContacts: { type: [ContactSchema], default: [] }
  }
}, {
  timestamps: true
});

// optional indexes for quick lookup by email/phone
UserSchema.index({ email: 1 }, { unique: false });
UserSchema.index({ phone: 1 }, { unique: false });

const User = mongoose.model('User', UserSchema);
module.exports = User;
