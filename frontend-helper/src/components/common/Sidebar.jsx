import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/dashboard',     label: 'Dashboard',     icon: '🏠' },
  { to: '/jobs',          label: 'Jobs',           icon: '💼' },
  { to: '/earnings',      label: 'Earnings',       icon: '💰' },
  { to: '/reviews',       label: 'Reviews',        icon: '⭐' },
  { to: '/notifications', label: 'Notifications',  icon: '🔔' },
  { to: '/availability',  label: 'Availability',   icon: '📅' },
  { to: '/profile',       label: 'Profile',        icon: '👤' },
  { to: '/support',       label: 'Support',        icon: '❓' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const w = collapsed ? 64 : 240;

  return (
    <>
      <aside style={{ width: w, minHeight: '100vh', background: 'var(--sidebar)', position: 'fixed', top: 0, left: 0, zIndex: 100, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.06)', transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden' }}>
        {/* Top accent bar */}
        <div style={{ height: 3, background: 'var(--accent)', flexShrink: 0 }} />

        {/* Logo + collapse */}
        <div style={{ padding: '16px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden', minWidth: 0 }}>
            <img
              src="/logo/BadgeLogo.png" alt="Workzy"
              style={{ width: 32, height: 32, objectFit: 'contain', flexShrink: 0, borderRadius: 6 }}
            />
            {!collapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)', whiteSpace: 'nowrap' }}>Workzy</div>
                <div style={{ fontSize: 10, color: 'var(--subtext)', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Helper Portal</div>
              </div>
            )}
          </div>
          <button onClick={() => setCollapsed(c => !c)} style={{
            width: 26, height: 26, borderRadius: 6, background: 'var(--card-hover)',
            border: 'none', color: 'var(--subtext)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            fontSize: 12,
          }}>
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        {/* User card */}
        <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#000', flexShrink: 0 }}>
            {user?.name?.[0] || 'H'}
          </div>
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Helper'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <span className="dot dot-green" style={{ width: 6, height: 6 }} />
                <span style={{ color: 'var(--subtext)', fontSize: 11 }}>Active</span>
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 8px', overflowY: 'auto' }}>
          {NAV.map(({ to, icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              <span className="sidebar-icon">{icon}</span>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '8px 8px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <button onClick={logout} className="sidebar-link" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(233,20,41,0.08)'; e.currentTarget.style.color = 'var(--red)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; }}
          >
            <span className="sidebar-icon">🚪</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <style>{`:root { --sidebar-w: ${w}px; }`}</style>
    </>
  );
}
