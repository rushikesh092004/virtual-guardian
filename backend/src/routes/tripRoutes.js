const express = require('express');
const router = express.Router();

const { createTrip, getTrips } = require('../Controllers/tripController');

router.post('/create', createTrip);
router.get('/all', getTrips);

module.exports = router;
