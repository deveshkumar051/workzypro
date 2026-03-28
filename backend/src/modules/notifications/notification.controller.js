const { query } = require('../../config/db');

const getMyNotifications = async (req, res, next) => {
  try {
    const user_id = req.session.user.id;
    const result = await query(
      `SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50`, [user_id]);
    res.json({ success: true, data: result.rows });
  } catch (err) { next(err); }
};

const markRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.session.user.id;
    await query(`UPDATE notifications SET is_read=true WHERE id=$1 AND user_id=$2`, [id, user_id]);
    res.json({ success: true });
  } catch (err) { next(err); }
};

const markAllRead = async (req, res, next) => {
  try {
    const user_id = req.session.user.id;
    await query(`UPDATE notifications SET is_read=true WHERE user_id=$1`, [user_id]);
    res.json({ success: true });
  } catch (err) { next(err); }
};

module.exports = { getMyNotifications, markRead, markAllRead };
