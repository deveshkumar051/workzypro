const { query } = require('../../config/db');

const getProfile = async (req, res, next) => {
  try {
    const id = req.session.user.id;
    const result = await query(
      'SELECT id, name, mobile, role, location, created_at FROM accounts WHERE id = $1',
      [id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) { next(err); }
};

const updateProfile = async (req, res, next) => {
  try {
    const id = req.session.user.id;
    const { name, location } = req.body;
    const result = await query(
      `UPDATE accounts SET name = $1, location = $2 WHERE id = $3
       RETURNING id, name, mobile, role, location`,
      [name, location, id]
    );
    req.session.user.name = result.rows[0].name;
    res.json({ success: true, data: result.rows[0] });
  } catch (err) { next(err); }
};

module.exports = { getProfile, updateProfile };
