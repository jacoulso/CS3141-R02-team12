const express = require('express');
const controller = require('../controllers/eventController');
const router = express.Router();

router.get('/getAll', controller.getAllEvents);
router.get('/getOne', controller.getOneEvent);
router.post('/add', controller.addEvent);
router.post('/update', controller.updateEvent);
router.post('/delete', controller.deleteEvent);

module.exports = router
