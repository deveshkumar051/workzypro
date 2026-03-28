import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';

export default function Availability() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { api.get('/availability').then(res => setIsAvailable(res.data.data?.is_available ?? true)).finally(() => setLoading(false)); }, []);

  const handleToggle = async () => {
    const next = !isAvailable; setIsAvailable(next); setSaving(true); setSaved(false);
    try { await api.patch('/availability', { is_available: next }); setSaved(true); setTimeout(() => setSaved(false), 2500); }
    catch { setIsAvailable(!next); } finally { setSaving(false); }
  };

  return (
    <DashboardLayout>
      <div style={{ borderBottom:'1px solid var(--border)', padding:'24px 32px', background:'var(--card)' }}>
        <div className="section-label">Settings</div>
        <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-0.5px' }}>Availability</h1>
        <p style={{ color:'var(--subtext)', fontSize:14, marginTop:4 }}>Control when customers can find and book you</p>
      </div>
      <div style={{ padding:'32px', maxWidth:560 }}>
        {saved && <div className="alert alert-success" style={{ marginBottom:20 }}>✓ Availability updated.</div>}
        {loading ? <div style={{ display:'flex', justifyContent:'center', padding:80 }}><div className="spinner" /></div> : (
          <>
            <div className="card reveal" style={{ textAlign:'center', padding:'48px 32px', marginBottom:20 }}>
              <div style={{ width:80, height:80, borderRadius:'50%', background: isAvailable ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.07)', border:`2px solid ${isAvailable ? 'rgba(16,185,129,0.3)' : 'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', transition:'all 0.3s', boxShadow: isAvailable ? '0 0 24px rgba(16,185,129,0.2)' : 'none' }}>
                <span style={{ width:20, height:20, borderRadius:'50%', background: isAvailable ? 'var(--green)' : '#4b5563', display:'inline-block', boxShadow: isAvailable ? '0 0 10px var(--green)' : 'none', transition:'all 0.3s' }} />
              </div>
              <h2 style={{ fontFamily:"inherit,sans-serif", fontSize:26, fontWeight:800, marginBottom:10, color: isAvailable ? 'var(--green)' : 'var(--subtext)', transition:'color 0.3s' }}>
                {isAvailable ? 'You are Available' : 'You are Offline'}
              </h2>
              <p style={{ color:'var(--subtext)', fontSize:15, marginBottom:36, lineHeight:1.7 }}>
                {isAvailable ? 'Customers can see your profile and send booking requests.' : 'You are hidden from customers. No new bookings will arrive.'}
              </p>
              <div onClick={handleToggle} style={{ width:64, height:34, borderRadius:17, background: isAvailable ? 'var(--green)' : 'var(--border)', position:'relative', cursor:'none', transition:'all 0.3s', margin:'0 auto', boxShadow: isAvailable ? '0 0 16px rgba(16,185,129,0.4)' : 'none' }}>
                <div style={{ position:'absolute', top:4, left: isAvailable ? 34 : 4, width:26, height:26, borderRadius:'50%', background:'#fff', transition:'left 0.3s', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }} />
              </div>
              <p style={{ fontSize:13, color:'rgba(179,179,179,0.45)', marginTop:16 }}>{saving ? 'Saving...' : 'Click to toggle'}</p>
            </div>
            <div className="card reveal">
              <h3 style={{ fontWeight:700, marginBottom:14, color:'var(--text)' }}>Tips</h3>
              {[['Turn on when you\'re ready to work','Go online only when you can accept and complete jobs.'], ['Turn off when you\'re busy','Helps keep your acceptance rate high.'], ['High availability = more bookings','Customers prefer helpers who are consistently available.']].map(([t,d]) => (
                <div key={t} style={{ display:'flex', gap:12, marginBottom:14, padding:'12px 14px', background:'var(--surface)', borderRadius:'var(--r-sm)', border:'1px solid var(--border)' }}>
                  <span style={{ color:'var(--accent)', fontSize:16, flexShrink:0 }}>→</span>
                  <div><div style={{ fontWeight:600, fontSize:14, color:'var(--text)' }}>{t}</div><div style={{ fontSize:13, color:'var(--subtext)' }}>{d}</div></div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
