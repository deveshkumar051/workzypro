const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../../middleware/auth.middleware');
const { createReview, getHelperReviews, getMyReviews } = require('./review.controller');
router.post('/', requireAuth, requireRole('client'), createReview);
router.get('/my', requireAuth, requireRole('helper'), getMyReviews);
router.get('/helper/:helper_id', getHelperReviews);
module.exports = router;
