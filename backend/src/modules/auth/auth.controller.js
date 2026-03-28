const bcrypt = require('bcryptjs');
const { query } = require('../../config/db');

/**
 * POST /api/auth/register
 * Register a new user (client or helper)
 */
const register = async (req, res, next) => {
  try {
    const { name, mobile, password, role, location } = req.body;

    // Validate role
    if (!['client', 'helper'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Role must be client or helper.' });
    }

    // Check if mobile already exists
    const existing = await query('SELECT id FROM accounts WHERE mobile = $1', [mobile]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'Mobile number already registered.' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Insert user
    const result = await query(
      `INSERT INTO accounts (name, mobile, password_hash, role, location)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, mobile, role, location, created_at`,
      [name, mobile, password_hash, role, location || null]
    );

    const user = result.rows[0];

    // If helper, create default availability
    if (role === 'helper') {
      await query(
        'INSERT INTO helper_availability (helper_id, is_available) VALUES ($1, true)',
        [user.id]
      );
    }

    // Start session
    req.session.user = { id: user.id, name: user.name, role: user.role };

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      user: { id: user.id, name: user.name, role: user.role, mobile: user.mobile },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 * Login with mobile and password
 */
const login = async (req, res, next) => {
  try {
    const { mobile, password, role } = req.body;

    // Find user by mobile and role
    const result = await query(
      'SELECT * FROM accounts WHERE mobile = $1 AND role = $2',
      [mobile, role]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const user = result.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Start session
    req.session.user = { id: user.id, name: user.name, role: user.role };

    return res.json({
      success: true,
      message: 'Login successful.',
      user: { id: user.id, name: user.name, role: user.role, mobile: user.mobile },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/logout
 * Destroy session
 */
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed.' });
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true, message: 'Logged out successfully.' });
  });
};

/**
 * GET /api/auth/me
 * Check current session — used by frontend on load to detect existing session
 */
const me = (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }
  return res.json({ success: true, user: req.session.user });
};

module.exports = { register, login, logout, me };
