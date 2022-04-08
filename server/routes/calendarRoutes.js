const express = require('express');
const controller = require('../controllers/calendarController');
const router = express.Router();

// Get all calendars associated with a user
router.post('/calendars', controller.getAllCalendars);

module.exports = router
