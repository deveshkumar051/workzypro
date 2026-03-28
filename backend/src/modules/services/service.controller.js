const { query } = require('../../config/db');

const getAllServices = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM services ORDER BY service_name');
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
};

const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM services WHERE id = $1', [id]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) { next(err); }
};

// Get helpers who offer this service
const getHelpersByService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { min_rating, max_price, sort } = req.query;

    let sql = `
      SELECT a.id, a.name, a.location,
             COALESCE(AVG(r.rating), 0) AS avg_rating,
             COUNT(r.id) AS review_count,
             ha.is_available,
             s.base_price
      FROM accounts a
      JOIN services s ON s.id = $1
      LEFT JOIN bookings b ON b.helper_id = a.id AND b.service_id = s.id
      LEFT JOIN reviews r ON r.booking_id = b.id
      LEFT JOIN helper_availability ha ON ha.helper_id = a.id
      WHERE a.role = 'helper'
      GROUP BY a.id, a.name, a.location, ha.is_available, s.base_price
    `;

    const params = [id];

    if (min_rating) {
      params.push(parseFloat(min_rating));
      sql += ` HAVING COALESCE(AVG(r.rating), 0) >= $${params.length}`;
    }

    sql += sort === 'price' ? ' ORDER BY s.base_price ASC' : ' ORDER BY avg_rating DESC';

    const result = await query(sql, params);
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
};

module.exports = { getAllServices, getServiceById, getHelpersByService };
