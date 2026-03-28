import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
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
    catch (err) { setError(err.response?.data?.message || 'Failed to update profile.'); } finally { setSaving(false); }
  };
  return (
    <MainLayout>
      <div style={{ background:'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', borderBottom:'1px solid var(--border)', padding:'56px 0 40px' }}>
        <div className="container"><div className="section-label">Account</div>
          <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:'clamp(26px,4vw,40px)', fontWeight:800, color:'var(--text)', letterSpacing:'-1px' }}>My Profile</h1>
        </div>
      </div>
      <div className="container" style={{ padding:'40px 24px', maxWidth:680 }}>
        {loading ? <div style={{ display:'flex', justifyContent:'center', padding:80 }}><div className="spinner" /></div> : <>
          <div className="card reveal" style={{ display:'flex', alignItems:'center', gap:20, marginBottom:20, padding:'24px 28px' }}>
            <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent-dim), rgba(139,92,246,0.12))', border:'2px solid rgba(0,229,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, fontWeight:800, color:'var(--accent)', flexShrink:0 }}>{profile?.name?.[0]}</div>
            <div>
              <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', fontFamily:"inherit,sans-serif" }}>{profile?.name}</div>
              <div style={{ color:'var(--subtext)', marginTop:4, fontSize:14 }}>📞 {profile?.mobile}</div>
              <div style={{ marginTop:8 }}><span className="badge badge-green">{profile?.role==='client' ? 'Customer' : 'Helper'}</span></div>
            </div>
          </div>
          <div className="card reveal">
            <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:17, marginBottom:22, color:'var(--text)' }}>Edit Information</h2>
            {error && <div className="alert alert-error">{error}</div>}
            {saved && <div className="alert alert-success">✓ Profile updated successfully!</div>}
            <form onSubmit={handleSave}>
              <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} required /></div>
              <div className="form-group"><label className="form-label">Mobile Number</label><input className="form-input" value={profile?.mobile||''} disabled style={{ opacity:.5, cursor:'not-allowed' }} /><span style={{ fontSize:12, color:'rgba(179,179,179,0.45)' }}>Cannot be changed</span></div>
              <div className="form-group"><label className="form-label">City / Location</label><input className="form-input" placeholder="e.g. Jaipur, Rajasthan" value={form.location} onChange={e => setForm(f=>({...f,location:e.target.value}))} /></div>
              <div className="form-group"><label className="form-label">Member Since</label><input className="form-input" value={profile ? new Date(profile.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : ''} disabled style={{ opacity:.5, cursor:'not-allowed' }} /></div>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </form>
          </div>
        </>}
      </div>
    </MainLayout>
  );
}
