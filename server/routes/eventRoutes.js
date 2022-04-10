const express = require('express');
const controller = require('../controllers/eventController');
const router = express.Router();

// Retrieve all events related to a uID and a cID
router.get('/getAll', controller.getAllEvents);

// Retrieve a specific event based on eID
router.get('/getOne', controller.getOneEvent);

// Add an event, takes in a uID and a cID
router.post('/add', controller.addEvent);

// Update an exisitng event based on eID
router.post('/update', controller.updateEvent);

// Delete an existing event based on eID
router.post('/delete', controller.deleteEvent);

module.exports = router
