const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../../middleware/auth.middleware');
const {
  createBooking, getClientBookings, getHelperBookings,
  updateBookingStatus, getBookingById, cancelBooking
} = require('./booking.controller');

router.post('/', requireAuth, requireRole('client'), createBooking);
router.get('/my', requireAuth, requireRole('client'), getClientBookings);
router.get('/jobs', requireAuth, requireRole('helper'), getHelperBookings);
router.get('/:id', requireAuth, getBookingById);
router.patch('/:id/status', requireAuth, requireRole('helper'), updateBookingStatus);
router.patch('/:id/cancel', requireAuth, requireRole('client'), cancelBooking);

module.exports = router;
