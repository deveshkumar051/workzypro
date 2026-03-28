/**
 * Middleware: requireAuth
 * Protects routes — user must be logged in (session must exist).
 */
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated. Please login.',
    });
  }
  next();
};

/**
 * Middleware: requireRole
 * Role-based access control. Pass 'client' or 'helper'.
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }
  if (!roles.includes(req.session.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Access denied. Required role: ${roles.join(' or ')}.`,
    });
  }
  next();
};

module.exports = { requireAuth, requireRole };
