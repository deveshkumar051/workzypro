const { query } = require('../../config/db');

const getAvailability = async (req, res, next) => {
  try {
    const helper_id = req.session.user.id;
    const result = await query('SELECT * FROM helper_availability WHERE helper_id=$1', [helper_id]);
    res.json({ success: true, data: result.rows[0] || { is_available: false } });
  } catch (err) { next(err); }
};

const toggleAvailability = async (req, res, next) => {
  try {
    const helper_id = req.session.user.id;
    const { is_available } = req.body;
    await query(
      `INSERT INTO helper_availability (helper_id, is_available, updated_at) VALUES($1,$2,NOW())
       ON CONFLICT (helper_id) DO UPDATE SET is_available=$2, updated_at=NOW()`,
      [helper_id, is_available]
    );
    res.json({ success: true, is_available });
  } catch (err) { next(err); }
};

module.exports = { getAvailability, toggleAvailability };
