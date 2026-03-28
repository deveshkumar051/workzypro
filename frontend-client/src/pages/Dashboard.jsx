import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const STATUS_COLOR = {
  pending: 'var(--gold)', accepted: 'var(--blue)',
  completed: 'var(--accent)', cancelled: 'var(--red)', rejected: 'var(--red)',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [notifCount, setNotifCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/bookings/my'), api.get('/notifications')])
      .then(([bRes, nRes]) => {
        setBookings(bRes.data.data.slice(0, 6));
        setNotifCount(nRes.data.data.filter(n => !n.is_read).length);
      }).finally(() => setLoading(false));
  }, []);

  const stats = {
    total:     bookings.length,
    pending:   bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    notif:     notifCount,
  };

  const STAT_CARDS = [
    { label: 'Total Bookings', value: stats.total,     color: 'var(--accent)', icon: '📋' },
    { label: 'Pending',        value: stats.pending,   color: 'var(--gold)',   icon: '⏳' },
    { label: 'Completed',      value: stats.completed, color: '#1ed760',       icon: '✅' },
    { label: 'Notifications',  value: stats.notif,     color: 'var(--blue)',   icon: '🔔' },
  ];

  return (
    <MainLayout>
      {/* Welcome banner */}
      <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', padding: '40px 0 36px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%', background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, fontWeight: 800, color: '#000', flexShrink: 0,
            }}>
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--subtext)', marginBottom: 4 }}>Good day,</div>
              <h1 style={{ fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 800, letterSpacing: '-0.5px' }}>
                {user?.name || 'User'} 👋
              </h1>
              <div style={{ fontSize: 13, color: 'var(--subtext)', marginTop: 4 }}>What do you need help with today?</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 32px' }}>
        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 28 }}>
          {STAT_CARDS.map(({ label, value, color, icon }) => (
            <div key={label} className="card reveal" style={{ padding: '22px 20px' }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color }}>
                {loading ? '—' : value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--subtext)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card reveal" style={{ marginBottom: 24 }}>
          <h2 style={{ fontWeight: 800, fontSize: 17, marginBottom: 18 }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/services"      className="btn btn-primary">Book a Service</Link>
            <Link to="/bookings"      className="btn btn-dark">My Bookings</Link>
            <Link to="/notifications" className="btn btn-dark" style={{ position: 'relative' }}>
              Notifications
              {notifCount > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  background: 'var(--red)', color: '#fff',
                  width: 18, height: 18, borderRadius: '50%',
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{notifCount}</span>
              )}
            </Link>
            <Link to="/profile" className="btn btn-ghost">My Profile</Link>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card reveal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontWeight: 800, fontSize: 17 }}>Recent Bookings</h2>
            <Link to="/bookings" style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700 }}>View all →</Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}><div className="spinner" /></div>
          ) : bookings.length === 0 ? (
            <div className="empty-state" style={{ padding: '36px 24px' }}>
              <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.4 }}>📋</div>
              <h3>No bookings yet</h3>
              <p style={{ marginBottom: 20, color: 'var(--subtext)' }}>Book your first service now</p>
              <Link to="/services" className="btn btn-primary">Browse Services</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {bookings.map(b => (
                <div key={b.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 16px', background: 'rgba(255,255,255,0.04)',
                  borderRadius: 'var(--r-sm)', flexWrap: 'wrap', gap: 10,
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{b.service_name}</div>
                    <div style={{ fontSize: 12, color: 'var(--subtext)', marginTop: 2 }}>
                      {b.helper_name} · {new Date(b.date).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: 14 }}>₹{b.price}</span>
                    <span className="badge" style={{
                      background: STATUS_COLOR[b.status] + '22', color: STATUS_COLOR[b.status],
                    }}>{b.status}</span>
                    <Link to={`/bookings/${b.id}`} className="btn btn-dark btn-sm">View</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
