// database/index.js
const { connectDB } = require('./config/mongoConnection');

const User = require('./models/user.model');
const Trip = require('./models/trip.model');
const Alert = require('./models/alert.model');

module.exports = {
  connectDB,
  User,
  Trip,
  Alert
};
