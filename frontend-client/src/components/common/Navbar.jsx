import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 100);
      setScrolled(y > 16);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}${hidden ? ' hidden' : ''}`}>
        <div className="nav-inner">
          {/* Logo — HorizontalLogo in navbar */}
          <Link to="/" className="nav-logo">
            <img src="/logo/HorizontalLogo.jpg" alt="Workzy" style={{ height: 32, width: 'auto', borderRadius: 4 }} />
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            {[
              { to: '/services', label: 'Services' },
              { to: '/about',    label: 'About' },
              { to: '/contact',  label: 'Contact' },
            ].map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="nav-actions">
            {user ? (
              <>
                <Link to="/notifications" className="btn btn-ghost btn-sm" title="Notifications">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </Link>
                <Link to="/dashboard" className="btn btn-dark btn-sm">Dashboard</Link>
                <button onClick={logout} className="btn btn-ghost btn-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login"    className="btn btn-outline btn-sm">Log in</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Sign up free</Link>
              </>
            )}
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="btn btn-ghost btn-sm"
              style={{ display: 'none', padding: 8 }}
              id="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen
                  ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                  : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>
                }
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
          background: '#0a0a0a', borderBottom: '1px solid var(--border)',
          padding: '12px 20px 20px',
        }}>
          {[
            { to: '/services', label: 'Services' },
            { to: '/about',    label: 'About' },
            { to: '/contact',  label: 'Contact' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{ display: 'block', padding: '13px 0', color: 'var(--subtext)', fontSize: 15, fontWeight: 600, borderBottom: '1px solid var(--border)' }}>
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-primary btn-full" style={{ marginTop: 14 }}>Dashboard</Link>
              <button onClick={logout} className="btn btn-outline btn-full" style={{ marginTop: 10 }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn btn-outline btn-full" style={{ marginTop: 14 }}>Log in</Link>
              <Link to="/register" className="btn btn-primary btn-full" style={{ marginTop: 10 }}>Sign up free</Link>
            </>
          )}
        </div>
      )}

      <style>{`@media (max-width: 768px) { #mobile-menu-btn { display: flex !important; } }`}</style>
    </>
  );
}
