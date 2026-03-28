const express = require('express');
const router = express.Router();

const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const helperRoutes = require('./modules/helpers/helper.routes');
const serviceRoutes = require('./modules/services/service.routes');
const bookingRoutes = require('./modules/bookings/booking.routes');
const reviewRoutes = require('./modules/reviews/review.routes');
const notificationRoutes = require('./modules/notifications/notification.routes');
const earningRoutes = require('./modules/earnings/earning.routes');
const availabilityRoutes = require('./modules/availability/availability.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/helpers', helperRoutes);
router.use('/services', serviceRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/notifications', notificationRoutes);
router.use('/earnings', earningRoutes);
router.use('/availability', availabilityRoutes);

module.exports = router;
