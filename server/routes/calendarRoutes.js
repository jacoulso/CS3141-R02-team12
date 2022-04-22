const express = require('express');
const controller = require('../controllers/calendarController');
const router = express.Router();

router.post('/create', controller.createNewCalendar);
router.post('/remove', controller.removeCalendar); // Not yet implemented
router.get('/calendar', controller.getOneCalendar);
router.get('/', controller.getAllCalendars);

module.exports = router
