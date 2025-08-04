// Adrien

const express = require('express');
const { logOut } = require('../controller/userController');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

router.post('/logOut', requireAuth, logOut);

module.exports = router;