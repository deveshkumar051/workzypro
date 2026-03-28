import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name:'', location:'' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { api.get('/users/profile').then(res => { setProfile(res.data.data); setForm({ name:res.data.data.name, location:res.data.data.location||'' }); }).finally(() => setLoading(false)); }, []);
  const handleSave = async e => {
    e.preventDefault(); setError(''); setSaving(true); setSaved(false);
    try { const res = await api.put('/users/profile', form); setProfile(res.data.data); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (err) { setError(err.response?.data?.message || 'Failed to update.'); } finally { setSaving(false); }
  };
  return (
    <DashboardLayout>
      <div style={{ borderBottom:'1px solid var(--border)', padding:'24px 32px', background:'var(--card)' }}>
        <div className="section-label">Account</div>
        <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-0.5px' }}>My Profile</h1>
      </div>
      <div style={{ padding:'32px', maxWidth:640 }}>
        {loading ? <div style={{ display:'flex', justifyContent:'center', padding:80 }}><div className="spinner" /></div> : <>
          <div className="card reveal" style={{ display:'flex', alignItems:'center', gap:20, marginBottom:20, padding:'24px 28px' }}>
            <div style={{ width:68, height:68, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent-dim), rgba(139,92,246,0.12))', border:'2px solid var(--border-cyan)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:800, color:'var(--accent)', flexShrink:0 }}>{profile?.name?.[0]}</div>
            <div>
              <div style={{ fontSize:20, fontWeight:800, color:'var(--text)' }}>{profile?.name}</div>
              <div style={{ color:'var(--subtext)', marginTop:4, fontSize:14 }}>📞 {profile?.mobile}</div>
              <div style={{ marginTop:8 }}><span className="badge badge-green">Helper</span></div>
            </div>
          </div>
          <div className="card reveal">
            <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:17, marginBottom:22, color:'var(--text)' }}>Edit Information</h2>
            {error && <div className="alert alert-error">{error}</div>}
            {saved && <div className="alert alert-success">✓ Profile updated!</div>}
            <form onSubmit={handleSave}>
              <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} required /></div>
              <div className="form-group"><label className="form-label">Mobile Number</label><input className="form-input" value={profile?.mobile||''} disabled style={{ opacity:.5, cursor:'not-allowed' }} /></div>
              <div className="form-group"><label className="form-label">City / Location</label><input className="form-input" placeholder="e.g. Jaipur, Rajasthan" value={form.location} onChange={e => setForm(f=>({...f,location:e.target.value}))} /></div>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </form>
          </div>
        </>}
      </div>
    </DashboardLayout>
  );
}
