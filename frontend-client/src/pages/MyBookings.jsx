import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import api from '../api/axios';

const SC = { pending:'var(--gold)', accepted:'var(--blue)', completed:'var(--green)', cancelled:'var(--red)', rejected:'var(--red)' };
const SL = { pending:'Pending', accepted:'Accepted', completed:'Completed', cancelled:'Cancelled', rejected:'Rejected' };

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  useEffect(() => { api.get('/bookings/my').then(res => setBookings(res.data.data)).finally(() => setLoading(false)); }, []);
  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
  const handleCancel = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    try { await api.patch(`/bookings/${id}/cancel`); setBookings(prev => prev.map(b => b.id===id ? {...b,status:'cancelled'} : b)); }
    catch (err) { alert(err.response?.data?.message || 'Could not cancel.'); }
  };
  return (
    <MainLayout>
      <div style={{ background:'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', borderBottom:'1px solid var(--border)', padding:'56px 0 40px' }}>
        <div className="container"><div className="section-label">History</div>
          <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:'clamp(26px,4vw,40px)', fontWeight:800, color:'var(--text)', letterSpacing:'-1px' }}>My Bookings</h1>
          <p style={{ color:'var(--subtext)', marginTop:8 }}>Track all your service bookings</p>
        </div>
      </div>
      <div className="container" style={{ padding:'36px 24px' }}>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32 }}>
          {['all','pending','accepted','completed','cancelled'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`btn btn-sm ${filter===s ? 'btn-primary' : 'btn-dark'}`} style={{ borderRadius:'var(--r-full)', textTransform:'capitalize' }}>{s}</button>
          ))}
        </div>
        {loading ? <div style={{ display:'flex', justifyContent:'center', padding:80 }}><div className="spinner" /></div>
        : filtered.length === 0 ? <div className="empty-state"><div style={{ fontSize:48, opacity:.4, marginBottom:16 }}>▤</div><h3>No bookings found</h3><p>You haven't made any bookings yet</p><Link to="/services" className="btn btn-primary" style={{ marginTop:20 }}>Book a Service</Link></div>
        : <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {filtered.map(b => (
            <div key={b.id} className="card" style={{ padding:'20px 24px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:14 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                    <h3 style={{ fontWeight:700, fontSize:17, color:'var(--text)' }}>{b.service_name}</h3>
                    <span className="badge" style={{ background:SC[b.status]+'18', color:SC[b.status], border:`1px solid ${SC[b.status]}33` }}>{SL[b.status]}</span>
                  </div>
                  <p style={{ color:'var(--subtext)', fontSize:13 }}>Helper: <strong style={{ color:'var(--text)' }}>{b.helper_name}</strong></p>
                  <p style={{ color:'var(--subtext)', fontSize:13 }}>📅 {new Date(b.date).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'})} · 🕐 {b.time}</p>
                  <p style={{ color:'var(--subtext)', fontSize:13 }}>📍 {b.address}</p>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:"inherit,sans-serif", fontSize:22, fontWeight:800, color:'var(--accent)', marginBottom:12 }}>₹{b.price}</div>
                  <div style={{ display:'flex', gap:8, justifyContent:'flex-end', flexWrap:'wrap' }}>
                    <Link to={`/bookings/${b.id}`} className="btn btn-dark btn-sm">View Details</Link>
                    {b.status==='pending' && <button onClick={() => handleCancel(b.id)} className="btn btn-sm" style={{ background:'rgba(239,68,68,0.1)', color:'var(--red)', border:'1px solid rgba(239,68,68,0.2)' }}>Cancel</button>}
                    {b.status==='completed' && <Link to={`/bookings/${b.id}`} className="btn btn-gold btn-sm">Leave Review</Link>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </MainLayout>
  );
}
