import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import api from '../api/axios';
const Stars = ({ r }) => <span style={{ color:'var(--gold)', letterSpacing:2 }}>{'★'.repeat(r)}{'☆'.repeat(5-r)}</span>;
export default function Reviews() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/bookings/my').then(res => setBookings(res.data.data.filter(b => b.status==='completed'))).finally(() => setLoading(false)); }, []);
  return (
    <MainLayout>
      <div style={{ background:'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', borderBottom:'1px solid var(--border)', padding:'56px 0 40px' }}>
        <div className="container"><div className="section-label">Feedback</div>
          <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:'clamp(26px,4vw,40px)', fontWeight:800, color:'var(--text)', letterSpacing:'-1px' }}>Reviews</h1>
          <p style={{ color:'var(--subtext)', marginTop:8 }}>Rate your completed services</p>
        </div>
      </div>
      <div className="container" style={{ padding:'40px 24px' }}>
        {loading ? <div style={{ display:'flex', justifyContent:'center', padding:80 }}><div className="spinner" /></div>
        : bookings.length===0 ? <div className="empty-state"><div style={{ fontSize:48, opacity:.4, marginBottom:16 }}>★</div><h3>No completed bookings</h3><p>Complete a booking to leave a review</p><Link to="/services" className="btn btn-primary" style={{ marginTop:20 }}>Book a Service</Link></div>
        : <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {bookings.map(b => (
            <div key={b.id} className="card" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16, padding:'20px 24px' }}>
              <div>
                <div style={{ fontWeight:700, fontSize:16, color:'var(--text)' }}>{b.service_name}</div>
                <div style={{ color:'var(--subtext)', fontSize:13, marginTop:4 }}>Helper: {b.helper_name} · {new Date(b.date).toLocaleDateString('en-IN')}</div>
                <div style={{ fontFamily:"inherit,sans-serif", fontWeight:800, color:'var(--accent)', marginTop:4 }}>₹{b.price}</div>
              </div>
              <Link to={'/bookings/'+b.id} className="btn btn-gold btn-sm">Leave Review →</Link>
            </div>
          ))}
        </div>}
      </div>
    </MainLayout>
  );
}
