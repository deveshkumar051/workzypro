const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../../middleware/auth.middleware');
const { getMyEarnings } = require('./earning.controller');
router.get('/', requireAuth, requireRole('helper'), getMyEarnings);
module.exports = router;
