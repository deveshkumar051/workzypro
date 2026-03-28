const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../../middleware/auth.middleware');
const { getAvailability, toggleAvailability } = require('./availability.controller');

router.get('/', requireAuth, requireRole('helper'), getAvailability);
router.patch('/', requireAuth, requireRole('helper'), toggleAvailability);

module.exports = router;
