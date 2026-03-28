const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../middleware/auth.middleware');
const { getMyNotifications, markRead, markAllRead } = require('./notification.controller');

router.get('/', requireAuth, getMyNotifications);
router.patch('/read-all', requireAuth, markAllRead);   // MUST be before /:id/read
router.patch('/:id/read', requireAuth, markRead);

module.exports = router;
