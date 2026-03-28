import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThreeBackground from '../components/common/ThreeBackground';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', mobile:'', password:'', confirmPassword:'', location:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault(); setError('');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try { const { confirmPassword, ...data } = form; await register({ ...data, role:'helper' }); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <ThreeBackground />
      <div style={{ position:'relative', zIndex:2, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'36px 24px' }}>
        <div style={{ width:'100%', maxWidth:460 }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <Link to="/login">
              <img src="/logo/HorizontalLogo.jpg" alt="Workzy" style={{ height:34, width:'auto', borderRadius:4, margin:'0 auto' }} />
            </Link>
            <h1 style={{ fontSize:26, fontWeight:800, marginTop:26, marginBottom:8, letterSpacing:'-0.5px' }}>Join as Helper</h1>
            <p style={{ color:'var(--subtext)', fontSize:15 }}>Create your account and start earning</p>
          </div>
          <div style={{ background:'var(--card)', borderRadius:'var(--r-lg)', padding:'32px 28px' }}>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Full Name</label><input name="name" className="form-input" placeholder="Your full name" value={form.name} onChange={handleChange} required /></div>
              <div className="form-group"><label className="form-label">Mobile Number</label><input name="mobile" type="tel" className="form-input" placeholder="10-digit mobile" value={form.mobile} onChange={handleChange} required /></div>
              <div className="form-group"><label className="form-label">City / Location</label><input name="location" className="form-input" placeholder="e.g. Jaipur, Rajasthan" value={form.location} onChange={handleChange} /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div className="form-group"><label className="form-label">Password</label><input name="password" type="password" className="form-input" placeholder="Min 6 chars" value={form.password} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Confirm</label><input name="confirmPassword" type="password" className="form-input" placeholder="Repeat" value={form.confirmPassword} onChange={handleChange} required /></div>
              </div>
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop:8 }}>
                {loading ? <span style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center' }}><span className="spinner" style={{ width:16, height:16, borderWidth:2 }} />Creating account...</span> : 'Register as Helper'}
              </button>
            </form>
            <p style={{ textAlign:'center', marginTop:22, fontSize:14, color:'var(--subtext)' }}>
              Already registered?{' '}<Link to="/login" style={{ color:'var(--accent)', fontWeight:700 }}>Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
