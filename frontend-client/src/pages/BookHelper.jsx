import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import api from '../api/axios';
export default function BookHelper() {
  const { helperId } = useParams();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service');
  const navigate = useNavigate();
  const [helper, setHelper] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ service_id:serviceId||'', date:'', time:'', address:'', payment_method:'offline' });
  useEffect(() => {
    Promise.all([api.get(`/helpers/${helperId}`), api.get('/services')]).then(([h,s]) => { setHelper(h.data.data); setServices(s.data.data); }).finally(() => setLoading(false));
  }, [helperId]);
  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setSubmitting(true);
    try { await api.post('/bookings', { ...form, helper_id:parseInt(helperId), service_id:parseInt(form.service_id) }); navigate('/bookings'); }
    catch (err) { setError(err.response?.data?.message || 'Booking failed.'); } finally { setSubmitting(false); }
  };
  if (loading) return <MainLayout><div style={{ display:'flex', justifyContent:'center', padding:100 }}><div className="spinner" /></div></MainLayout>;
  const today = new Date().toISOString().split('T')[0];
  return (
    <MainLayout>
      <div style={{ background:'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', borderBottom:'1px solid var(--border)', padding:'56px 0 40px' }}>
        <div className="container">
          <Link to={`/services/${form.service_id}`} style={{ color:'var(--subtext)', fontSize:13 }}>← Back to helpers</Link>
          <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:'clamp(26px,4vw,40px)', fontWeight:800, color:'var(--text)', letterSpacing:'-1px', marginTop:10 }}>Book a Helper</h1>
        </div>
      </div>
      <div className="container" style={{ padding:'40px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:28, alignItems:'start' }}>
          <div className="card reveal">
            <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:18, marginBottom:24, color:'var(--text)' }}>Booking Details</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Service</label>
                <select name="service_id" className="form-input" value={form.service_id} onChange={e => setForm(f=>({...f,service_id:e.target.value}))} required>
                  <option value="">Select a service</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.service_name} — ₹{s.base_price}</option>)}
                </select>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div className="form-group"><label className="form-label">Date</label><input type="date" className="form-input" min={today} value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))} required /></div>
                <div className="form-group"><label className="form-label">Time</label><input type="time" className="form-input" value={form.time} onChange={e => setForm(f=>({...f,time:e.target.value}))} required /></div>
              </div>
              <div className="form-group"><label className="form-label">Address</label><textarea className="form-input" rows={3} placeholder="Your full address where helper needs to come" value={form.address} onChange={e => setForm(f=>({...f,address:e.target.value}))} required /></div>
              <div className="form-group"><label className="form-label">Payment Method</label>
                <div style={{ display:'flex', gap:16 }}>
                  {[['offline','Cash on Delivery'],['online','Online Payment']].map(([v,l]) => (
                    <label key={v} style={{ display:'flex', alignItems:'center', gap:8, cursor:'none', fontSize:14 }}>
                      <input type="radio" name="payment_method" value={v} checked={form.payment_method===v} onChange={() => setForm(f=>({...f,payment_method:v}))} style={{ accentColor:'var(--accent)' }} />
                      {l}
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-gold btn-full btn-lg" disabled={submitting} style={{ marginTop:8 }}>{submitting ? 'Confirming...' : 'Confirm Booking'}</button>
            </form>
          </div>
          {helper && (
            <div className="card reveal" style={{ padding:'24px' }}>
              <h3 style={{ fontWeight:700, marginBottom:16, color:'var(--text)' }}>You're booking</h3>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent-dim), rgba(139,92,246,0.12))', border:'1px solid rgba(0,229,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:22, color:'var(--accent)' }}>{helper.name[0]}</div>
                <div><div style={{ fontWeight:700, fontSize:17, color:'var(--text)' }}>{helper.name}</div><div style={{ fontSize:13, color:'var(--subtext)' }}>📍 {helper.location}</div></div>
              </div>
              {[['Rating', `⭐ ${Number(helper.avg_rating).toFixed(1)}`], ['Jobs completed', helper.total_jobs], ['Status', '● Available']].map(([l,v]) => (
                <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderTop:'1px solid var(--border)', fontSize:13 }}>
                  <span style={{ color:'var(--subtext)' }}>{l}</span>
                  <span style={{ fontWeight:600, color:'var(--text)' }}>{v}</span>
                </div>
              ))}
              <div className="alert alert-info" style={{ marginTop:16, fontSize:12 }}>Price shown is the base price. Final price may vary based on scope of work.</div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
