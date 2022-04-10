const express = require('express');
const controller = require('../controllers/calendarController');
const router = express.Router();

// Create a new calendar given a new calendar title
router.post('/create', controller.createNewCalendar);

// Removes a specific calendar based on a given calendar ID
router.post('/remove', controller.removeCalendar); // Not yet implemented

// Get a specific calendar based on a uID and a cID
router.get('/calendar', controller.getOneCalendar);

// Get all calendars associated with a uID
router.get('/', controller.getAllCalendars);

module.exports = router
