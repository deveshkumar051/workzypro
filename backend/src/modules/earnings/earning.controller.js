const { query } = require('../../config/db');

const getMyEarnings = async (req, res, next) => {
  try {
    const helper_id = req.session.user.id;
    const total = await query(`SELECT COALESCE(SUM(amount),0) AS total FROM earnings WHERE helper_id=$1`, [helper_id]);
    const history = await query(
      `SELECT e.*, b.date AS booking_date, s.service_name
       FROM earnings e JOIN bookings b ON b.id=e.booking_id
       JOIN services s ON s.id=b.service_id
       WHERE e.helper_id=$1 ORDER BY e.date DESC`, [helper_id]);
    res.json({ success: true, total: total.rows[0].total, data: history.rows });
  } catch (err) { next(err); }
};

module.exports = { getMyEarnings };
