const { query } = require('../../config/db');

const createReview = async (req, res, next) => {
  try {
    const client_id = req.session.user.id;
    const { booking_id, rating, comment } = req.body;
    if (rating < 1 || rating > 5) return res.status(400).json({ success: false, message: 'Rating must be 1–5.' });
    const booking = await query(`SELECT * FROM bookings WHERE id=$1 AND client_id=$2 AND status='completed'`, [booking_id, client_id]);
    if (!booking.rows.length) return res.status(403).json({ success: false, message: 'Cannot review this booking.' });
    const existing = await query('SELECT id FROM reviews WHERE booking_id=$1', [booking_id]);
    if (existing.rows.length) return res.status(409).json({ success: false, message: 'Already reviewed.' });
    const result = await query(`INSERT INTO reviews (booking_id,client_id,rating,comment) VALUES($1,$2,$3,$4) RETURNING *`, [booking_id, client_id, rating, comment||null]);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) { next(err); }
};

const getHelperReviews = async (req, res, next) => {
  try {
    const { helper_id } = req.params;
    const result = await query(
      `SELECT r.*, a.name AS client_name, s.service_name
       FROM reviews r JOIN bookings b ON b.id=r.booking_id
       JOIN accounts a ON a.id=r.client_id JOIN services s ON s.id=b.service_id
       WHERE b.helper_id=$1 ORDER BY r.created_at DESC`, [helper_id]);
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
};

const getMyReviews = async (req, res, next) => {
  try {
    const helper_id = req.session.user.id;
    const result = await query(
      `SELECT r.*, a.name AS client_name, s.service_name
       FROM reviews r JOIN bookings b ON b.id=r.booking_id
       JOIN accounts a ON a.id=r.client_id JOIN services s ON s.id=b.service_id
       WHERE b.helper_id=$1 ORDER BY r.created_at DESC`, [helper_id]);
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
};

module.exports = { createReview, getHelperReviews, getMyReviews };
