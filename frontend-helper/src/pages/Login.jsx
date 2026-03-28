import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThreeBackground from '../components/common/ThreeBackground';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ mobile: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await login({ ...form, role: 'helper' }); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || err.message || 'Login failed.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <ThreeBackground />
      <div style={{ position:'relative', zIndex:2, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ width:'100%', maxWidth:420 }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <Link to="/login">
              <img src="/logo/HorizontalLogo.jpg" alt="Workzy" style={{ height:34, width:'auto', borderRadius:4, margin:'0 auto' }} />
            </Link>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(29,185,84,0.12)', border:'1px solid rgba(29,185,84,0.25)', borderRadius:99, padding:'4px 12px', fontSize:11, fontWeight:700, color:'#1DB954', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:14 }}>
              Helper Portal
            </div>
            <h1 style={{ fontSize:26, fontWeight:800, marginTop:22, marginBottom:8, letterSpacing:'-0.5px' }}>Helper Login</h1>
            <p style={{ color:'var(--subtext)', fontSize:15 }}>Access your helper dashboard</p>
          </div>

          <div style={{ background:'var(--card)', borderRadius:'var(--r-lg)', padding:'32px 28px' }}>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input name="mobile" type="tel" className="form-input" placeholder="Registered mobile number" value={form.mobile} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input name="password" type="password" className="form-input" placeholder="Your password" value={form.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop:8 }}>
                {loading ? <span style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center' }}><span className="spinner" style={{ width:16, height:16, borderWidth:2 }} />Logging in...</span> : 'Log in to Dashboard'}
              </button>
            </form>
            <p style={{ textAlign:'center', marginTop:22, fontSize:14, color:'var(--subtext)' }}>
              New helper?{' '}<Link to="/register" style={{ color:'var(--accent)', fontWeight:700 }}>Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
