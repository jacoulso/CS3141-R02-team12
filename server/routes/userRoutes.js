const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

router.post('/signup', controller.register);
router.post('/login', controller.login);
router.get('/authenticate', controller.authenticateLogin, function (req, res) {
    res.join({ 'access': true })
});

module.exports = router
