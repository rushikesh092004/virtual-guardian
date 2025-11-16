const express = require('express');
const router = express.Router();

// ⬇️ This is where you import the functions
const { createTrip, getTrips, markSafe } = require('../Controllers/tripController');

// Routes
router.post('/create', createTrip);
router.get('/all', getTrips);
router.post('/:id/safe', markSafe);

module.exports = router;
