const { query } = require('../../config/db');

// Client creates a booking
const createBooking = async (req, res, next) => {
  try {
    const client_id = req.session.user.id;
    const { helper_id, service_id, date, time, address, payment_method } = req.body;

    // Get base price for the service
    const svc = await query('SELECT base_price FROM services WHERE id = $1', [service_id]);
    if (!svc.rows.length) return res.status(404).json({ success: false, message: 'Service not found.' });

    const price = svc.rows[0].base_price;

    const result = await query(
      `INSERT INTO bookings (client_id, helper_id, service_id, date, time, status, price, address, payment_method)
       VALUES ($1, $2, $3, $4, $5, 'pending', $6, $7, $8)
       RETURNING *`,
      [client_id, helper_id, service_id, date, time, price, address, payment_method || 'offline']
    );

    const booking = result.rows[0];

    // Notify helper
    await query(
      `INSERT INTO notifications (user_id, title, message)
       VALUES ($1, 'New booking request', 'You have a new booking request. Please check your jobs.')`,
      [helper_id]
    );

    res.status(201).json({ success: true, data: booking });
  } catch (err) { next(err); }
};

// Get bookings for logged-in client
const getClientBookings = async (req, res, next) => {
  try {
    const client_id = req.session.user.id;
    const result = await query(
      `SELECT b.*, s.service_name, a.name AS helper_name
       FROM bookings b
       JOIN services s ON s.id = b.service_id
       JOIN accounts a ON a.id = b.helper_id
       WHERE b.client_id = $1
       ORDER BY b.date DESC, b.time DESC`,
      [client_id]
    );
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
};

// Get bookings (jobs) for logged-in helper
const getHelperBookings = async (req, res, next) => {
  try {
    const helper_id = req.session.user.id;
    const { status } = req.query;
    let sql = `
      SELECT b.*, s.service_name, a.name AS client_name, a.mobile AS client_mobile
      FROM bookings b
      JOIN services s ON s.id = b.service_id
      JOIN accounts a ON a.id = b.client_id
      WHERE b.helper_id = $1
    `;
    const params = [helper_id];
    if (status) { params.push(status); sql += ` AND b.status = $${params.length}`; }
    sql += ' ORDER BY b.date DESC';
    const result = await query(sql, params);
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
};

// Helper updates booking status
const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const helper_id = req.session.user.id;

    const allowed = ['accepted', 'rejected', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const result = await query(
      `UPDATE bookings SET status = $1 WHERE id = $2 AND helper_id = $3 RETURNING *`,
      [status, id, helper_id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ success: false, message: 'Booking not found or unauthorized.' });
    }

    const booking = result.rows[0];

    // If completed → create earnings record
    if (status === 'completed') {
      const commission = 0.1; // 10% platform commission
      const earned = booking.price * (1 - commission);
      await query(
        `INSERT INTO earnings (helper_id, booking_id, amount, date) VALUES ($1, $2, $3, CURRENT_DATE)`,
        [helper_id, id, earned]
      );
    }

    // Notify client
    await query(
      `INSERT INTO notifications (user_id, title, message)
       VALUES ($1, $2, $3)`,
      [booking.client_id, `Booking ${status}`, `Your booking has been ${status} by the helper.`]
    );

    res.json({ success: true, data: booking });
  } catch (err) { next(err); }
};

const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.session.user.id;
    const result = await query(
      `SELECT b.*, s.service_name, 
              c.name AS client_name, c.mobile AS client_mobile,
              h.name AS helper_name, h.mobile AS helper_mobile
       FROM bookings b
       JOIN services s ON s.id = b.service_id
       JOIN accounts c ON c.id = b.client_id
       JOIN accounts h ON h.id = b.helper_id
       WHERE b.id = $1 AND (b.client_id = $2 OR b.helper_id = $2)`,
      [id, user_id]
    );
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Booking not found.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) { next(err); }
};

// Client cancels booking
const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client_id = req.session.user.id;
    const result = await query(
      `UPDATE bookings SET status = 'cancelled' 
       WHERE id = $1 AND client_id = $2 AND status = 'pending' 
       RETURNING *`,
      [id, client_id]
    );
    if (!result.rows.length) {
      return res.status(400).json({ success: false, message: 'Cannot cancel this booking.' });
    }
    res.json({ success: true, message: 'Booking cancelled.', data: result.rows[0] });
  } catch (err) { next(err); }
};

module.exports = { createBooking, getClientBookings, getHelperBookings, updateBookingStatus, getBookingById, cancelBooking };
