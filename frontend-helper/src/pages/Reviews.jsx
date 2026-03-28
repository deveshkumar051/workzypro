import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';
const Stars = ({ n }) => <span style={{ color:'var(--gold)', letterSpacing:2 }}>{'★'.repeat(n)}{'☆'.repeat(5-n)}</span>;
export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/reviews/my').then(res => setReviews(res.data.data)).finally(() => setLoading(false)); }, []);
  const avg = reviews.length ? (reviews.reduce((s,r) => s+r.rating, 0)/reviews.length).toFixed(1) : '—';
  return (
    <DashboardLayout>
      <div style={{ borderBottom:'1px solid var(--border)', padding:'24px 32px', background:'var(--card)' }}>
        <div className="section-label">Reputation</div>
        <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-0.5px' }}>My Reviews</h1>
      </div>
      <div style={{ padding:'32px' }}>
        <div className="grid-3" style={{ marginBottom:28 }}>
          {[{ label:'Average Rating', value:avg, sub:'Out of 5', accent:'var(--gold)' }, { label:'Total Reviews', value:reviews.length, sub:'From customers', accent:'var(--accent)' }, { label:'4★ or Above', value:reviews.filter(r=>r.rating>=4).length, sub:'Great reviews', accent:'var(--green)' }].map(({ label, value, sub, accent }) => (
            <div key={label} className="card reveal" style={{ padding:'24px', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${accent}, transparent)` }} />
              <div style={{ fontFamily:"inherit,sans-serif", fontSize:36, fontWeight:800, color:accent }}>{loading ? '—' : value}</div>
              <div style={{ fontSize:13, color:'var(--subtext)', marginTop:6 }}>{label}</div>
              <div style={{ fontSize:11, color:'rgba(179,179,179,0.45)' }}>{sub}</div>
            </div>
          ))}
        </div>
        <div className="card reveal">
          <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:17, marginBottom:20, color:'var(--text)' }}>Customer Feedback</h2>
          {loading ? <div style={{ display:'flex', justifyContent:'center', padding:48 }}><div className="spinner" /></div>
          : reviews.length === 0 ? <div className="empty-state" style={{ padding:'32px' }}><div style={{ fontSize:36, opacity:.4, marginBottom:10 }}>★</div><h3>No reviews yet</h3><p>Complete jobs to receive reviews</p></div>
          : <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {reviews.map(r => (
              <div key={r.id} style={{ padding:'18px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-sm)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, flexWrap:'wrap', gap:8 }}>
                  <div><span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>{r.client_name}</span><span style={{ color:'rgba(179,179,179,0.45)', fontSize:12, marginLeft:8 }}>for {r.service_name}</span></div>
                  <Stars n={r.rating} />
                </div>
                {r.comment && <p style={{ color:'var(--subtext)', fontSize:13, lineHeight:1.6, fontStyle:'italic' }}>"{r.comment}"</p>}
                <div style={{ fontSize:11, color:'rgba(179,179,179,0.45)', marginTop:8 }}>{new Date(r.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </DashboardLayout>
  );
}
