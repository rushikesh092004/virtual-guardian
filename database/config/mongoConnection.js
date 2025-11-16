// database/config/mongoConnection.js
const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || undefined;

  if (!uri) {
    const msg = 'MONGODB_URI is not set. Please add it to backend/.env or your environment.';
    console.error(msg);
    throw new Error(msg);
  }

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  };

  if (dbName) options.dbName = dbName;

  try {
    await mongoose.connect(uri, options);
    console.log('✅ MongoDB connected');

    mongoose.connection.on('connected', () => console.log('Mongoose: connected'));
    mongoose.connection.on('error', (err) => console.error('Mongoose error:', err));
    mongoose.connection.on('disconnected', () => console.warn('Mongoose: disconnected'));

    const gracefulClose = (signal) => {
      return () => {
        console.log(`Received ${signal}. Closing mongoose connection...`);
        mongoose.connection.close(false, () => {
          console.log('Mongoose connection closed. Exiting process.');
          process.exit(0);
        });
      };
    };
    process.on('SIGINT', gracefulClose('SIGINT'));
    process.on('SIGTERM', gracefulClose('SIGTERM'));
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}

module.exports = { connectDB };
