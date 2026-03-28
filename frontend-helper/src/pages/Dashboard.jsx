import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const SC = { pending:'var(--gold)', accepted:'var(--blue)', completed:'var(--accent)', cancelled:'var(--red)', rejected:'var(--red)' };

export default function Dashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [earnings, setEarnings] = useState({ total: 0 });
  const [availability, setAvailability] = useState(true);
  const [notifCount, setNotifCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/bookings/jobs'), api.get('/earnings'), api.get('/availability'), api.get('/notifications')])
      .then(([j,e,a,n]) => {
        setJobs(j.data.data);
        setEarnings(e.data);
        setAvailability(a.data.data?.is_available ?? true);
        setNotifCount(n.data.data.filter(x => !x.is_read).length);
      }).finally(() => setLoading(false));
  }, []);

  const toggleAvailability = async () => {
    const next = !availability; setAvailability(next);
    await api.patch('/availability', { is_available: next });
  };

  const STATS = [
    { label:'Total Jobs',   value: jobs.length,                                   color:'var(--accent)', icon:'💼' },
    { label:'Pending',      value: jobs.filter(j=>j.status==='pending').length,   color:'var(--gold)',   icon:'⏳' },
    { label:'Completed',    value: jobs.filter(j=>j.status==='completed').length, color:'#1ed760',       icon:'✅' },
    { label:'Total Earned', value: '₹'+Number(earnings.total||0).toFixed(0),      color:'#1ed760',       icon:'💰' },
  ];

  return (
    <DashboardLayout>
      {/* Top bar */}
      <div style={{ borderBottom:'1px solid var(--border)', padding:'24px 28px', background:'var(--card)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--subtext)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:6 }}>Helper Dashboard</div>
          <h1 style={{ fontSize:'clamp(20px,3vw,28px)', fontWeight:800, letterSpacing:'-0.5px' }}>
            Good day, <span style={{ color:'var(--accent)' }}>{user?.name?.split(' ')[0]}</span> 👋
          </h1>
        </div>
        {/* Availability toggle */}
        <div style={{ display:'flex', alignItems:'center', gap:12, background:'var(--bg)', border:'1px solid var(--border)', borderRadius:99, padding:'10px 18px' }}>
          <span style={{ fontSize:13, color:'var(--subtext)', fontWeight:600 }}>Status</span>
          <div onClick={toggleAvailability} style={{ width:42, height:22, borderRadius:11, background:availability?'var(--accent)':'rgba(255,255,255,0.12)', position:'relative', cursor:'pointer', transition:'background 0.25s' }}>
            <div style={{ position:'absolute', top:2, left:availability?22:2, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left 0.25s', boxShadow:'0 1px 4px rgba(0,0,0,0.4)' }} />
          </div>
          <span style={{ fontSize:13, fontWeight:700, color:availability?'var(--accent)':'var(--subtext)' }}>{availability?'Available':'Offline'}</span>
        </div>
      </div>

      <div style={{ padding:'28px' }}>
        {/* Stats grid */}
        <div className="grid-4" style={{ marginBottom:24 }}>
          {STATS.map(({ label, value, color, icon }) => (
            <div key={label} className="card reveal" style={{ padding:'20px' }}>
              <div style={{ fontSize:22, marginBottom:10 }}>{icon}</div>
              <div style={{ fontSize:28, fontWeight:800, color }}>{loading ? '—' : value}</div>
              <div style={{ fontSize:13, color:'var(--subtext)', marginTop:4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="card reveal" style={{ marginBottom:20 }}>
          <h2 style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>Quick Actions</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <Link to="/jobs"          className="btn btn-primary btn-sm">View Jobs</Link>
            <Link to="/earnings"      className="btn btn-dark btn-sm">Earnings</Link>
            <Link to="/availability"  className="btn btn-dark btn-sm">Availability</Link>
            <Link to="/notifications" className="btn btn-dark btn-sm" style={{ position:'relative' }}>
              Notifications
              {notifCount > 0 && <span style={{ position:'absolute', top:-6, right:-6, background:'var(--red)', color:'#fff', width:17, height:17, borderRadius:'50%', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{notifCount}</span>}
            </Link>
          </div>
        </div>

        {/* Recent jobs */}
        <div className="card reveal">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
            <h2 style={{ fontWeight:800, fontSize:16 }}>Recent Jobs</h2>
            <Link to="/jobs" style={{ color:'var(--accent)', fontSize:13, fontWeight:700 }}>View all →</Link>
          </div>
          {loading ? <div style={{ display:'flex', justifyContent:'center', padding:48 }}><div className="spinner" /></div>
          : jobs.slice(0,5).length === 0 ? (
            <div className="empty-state" style={{ padding:'32px 24px' }}>
              <div style={{ fontSize:36, marginBottom:12, opacity:.4 }}>💼</div>
              <h3>No jobs yet</h3><p style={{ color:'var(--subtext)' }}>Jobs will appear once customers book you</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {jobs.slice(0,5).map(j => (
                <div key={j.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 15px', background:'rgba(255,255,255,0.04)', borderRadius:'var(--r-sm)', flexWrap:'wrap', gap:10, transition:'background .15s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.07)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                >
                  <div>
                    <div style={{ fontWeight:700, fontSize:14 }}>{j.service_name}</div>
                    <div style={{ fontSize:12, color:'var(--subtext)', marginTop:2 }}>{j.client_name} · {new Date(j.date).toLocaleDateString('en-IN')}</div>
                  </div>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <span style={{ fontWeight:800, color:'var(--accent)', fontSize:14 }}>₹{j.price}</span>
                    <span className="badge" style={{ background:SC[j.status]+'22', color:SC[j.status] }}>{j.status}</span>
                    <Link to={`/jobs/${j.id}`} className="btn btn-dark btn-sm">View</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
