const express = require('express');
const router = express.Router();
const { register, login, logout, me } = require('./auth.controller');
const { requireAuth } = require('../../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout);
router.get('/me', me);  // No requireAuth — returns 401 if not logged in (used for session check)

module.exports = router;
