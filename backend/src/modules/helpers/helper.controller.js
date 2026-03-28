const { query } = require('../../config/db');

const searchHelpers = async (req, res, next) => {
  try {
    const { service_id, location, min_rating, sort } = req.query;
    let sql = `
      SELECT a.id, a.name, a.location,
             COALESCE(AVG(r.rating),0)::numeric(3,1) AS avg_rating,
             COUNT(DISTINCT r.id) AS review_count,
             ha.is_available
      FROM accounts a
      LEFT JOIN bookings b ON b.helper_id = a.id
      LEFT JOIN reviews r ON r.booking_id = b.id
      LEFT JOIN helper_availability ha ON ha.helper_id = a.id
      WHERE a.role = 'helper'`;
    const params = [];
    if (service_id) {
      params.push(service_id);
      sql += ` AND b.service_id = $${params.length}`;
    }
    if (location) {
      params.push('%' + location + '%');
      sql += ` AND a.location ILIKE $${params.length}`;
    }
    sql += ` GROUP BY a.id, a.name, a.location, ha.is_available`;
    if (min_rating) {
      params.push(parseFloat(min_rating));
      sql += ` HAVING COALESCE(AVG(r.rating),0) >= $${params.length}`;
    }
    sql += sort === 'rating' ? ' ORDER BY avg_rating DESC' : ' ORDER BY a.name ASC';
    const result = await query(sql, params);
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
};

const getHelperProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query(
      `SELECT a.id, a.name, a.location, a.created_at,
              COALESCE(AVG(r.rating),0)::numeric(3,1) AS avg_rating,
              COUNT(DISTINCT b.id) AS total_jobs,
              ha.is_available
       FROM accounts a
       LEFT JOIN bookings b ON b.helper_id = a.id AND b.status = 'completed'
       LEFT JOIN reviews r ON r.booking_id = b.id
       LEFT JOIN helper_availability ha ON ha.helper_id = a.id
       WHERE a.id = $1 AND a.role = 'helper'
       GROUP BY a.id, ha.is_available`,
      [id]
    );
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Helper not found.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) { next(err); }
};

module.exports = { searchHelpers, getHelperProfile };
