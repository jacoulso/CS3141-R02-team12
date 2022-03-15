const express = require('express');
const { createUser, getUser } = require("../controller/user.controller");

const router = express.Router();

router.route('/').get(getUser);
router.route('/create').post(createUser);

module.exports = router;

export default router;
