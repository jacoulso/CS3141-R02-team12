const express = require('express');
const controller = require('../controllers/friendController');
const router = express.Router();

router.post('/add',         controller.addFriend);
router.get('/get/username', controller.getFriendByUsername);
router.get('/get/email',    controller.getFriendByEmail);
router.get('/remove',       controller.removeFriend);
router.get('/',             controller.getAllFriends);

module.exports = router
