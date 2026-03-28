import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import api from '../api/axios';
export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [helpers, setHelpers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating');
  useEffect(() => {
    Promise.all([api.get(`/services/${id}`), api.get(`/services/${id}/helpers?sort=${sortBy}`)]).then(([s,h]) => { setService(s.data.data); setHelpers(h.data.data); }).finally(() => setLoading(false));
  }, [id, sortBy]);
  if (loading) return <MainLayout><div style={{ display:'flex', justifyContent:'center', padding:100 }}><div className="spinner" /></div></MainLayout>;
  if (!service) return <MainLayout><div className="container"><p>Service not found.</p></div></MainLayout>;
  return (
    <MainLayout>
      <div style={{ background:'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', borderBottom:'1px solid var(--border)', padding:'56px 0 40px' }}>
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom:12 }}>{service.category}</span>
          <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:'clamp(26px,4vw,42px)', fontWeight:800, color:'var(--text)', letterSpacing:'-1px', marginBottom:10 }}>{service.service_name}</h1>
          <p style={{ color:'var(--subtext)', fontSize:16, maxWidth:560 }}>{service.description}</p>
          <div style={{ marginTop:16, fontFamily:"inherit,sans-serif", fontSize:22, fontWeight:800, color:'var(--accent)' }}>Starting from ₹{service.base_price}</div>
        </div>
      </div>
      <div className="container" style={{ padding:'40px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, flexWrap:'wrap', gap:12 }}>
          <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:20, color:'var(--text)' }}>Available Helpers ({helpers.length})</h2>
          <select className="form-input" style={{ width:'auto', minWidth:160 }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="rating">Sort by Rating</option><option value="price">Sort by Price</option>
          </select>
        </div>
        {helpers.length===0 ? <div className="empty-state"><h3>No helpers available</h3><p>Try again later or choose a different service.</p></div>
        : <div className="grid-3">
          {helpers.map(h => (
            <div key={h.id} className="card reveal" style={{ padding:'24px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent-dim), rgba(139,92,246,0.12))', border:'1px solid rgba(0,229,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:20, color:'var(--accent)' }}>{h.name[0]}</div>
                <div><div style={{ fontWeight:700, fontSize:16, color:'var(--text)' }}>{h.name}</div><div style={{ fontSize:13, color:'var(--subtext)' }}>📍 {h.location||'N/A'}</div></div>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
                <span style={{ fontSize:14, color:'var(--subtext)' }}>⭐ {Number(h.avg_rating).toFixed(1)} ({h.review_count})</span>
                <span className={`badge ${h.is_available ? 'badge-green' : 'badge-gray'}`}>{h.is_available ? '● Available' : '○ Busy'}</span>
              </div>
              {h.is_available ? <Link to={`/book/${h.id}?service=${id}`} className="btn btn-gold btn-full">Book Now</Link>
              : <button className="btn btn-full" disabled style={{ opacity:.4 }}>Not Available</button>}
            </div>
          ))}
        </div>}
      </div>
    </MainLayout>
  );
}
