import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThreeBackground from '../components/common/ThreeBackground';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ mobile: '', password: '', role: 'client' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <ThreeBackground />
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <Link to="/">
              <img src="/logo/HorizontalLogo.jpg" alt="Workzy" style={{ height: 36, width: 'auto', borderRadius: 4, margin: '0 auto' }} />
            </Link>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 28, marginBottom: 8, letterSpacing: '-0.5px' }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--subtext)', fontSize: 15 }}>Log in to your Workzy account</p>
          </div>

          <div style={{ background: 'var(--card)', borderRadius: 'var(--r-lg)', padding: '32px 28px' }}>
            {error && <div className="alert alert-error">{error}</div>}

            {/* Role toggle */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--r-full)', padding: 4, marginBottom: 24 }}>
              {[{ val: 'client', label: 'Customer' }, { val: 'helper', label: 'Helper' }].map(({ val, label }) => (
                <button key={val} type="button"
                  onClick={() => setForm(f => ({ ...f, role: val }))}
                  style={{
                    flex: 1, padding: '9px 16px', borderRadius: 'var(--r-full)',
                    border: 'none', fontSize: 13, fontWeight: 700, transition: 'all 0.2s',
                    background: form.role === val ? 'var(--accent)' : 'transparent',
                    color: form.role === val ? '#000' : 'var(--subtext)',
                  }}
                >{label}</button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input name="mobile" type="tel" className="form-input" placeholder="e.g. 9876543210"
                  value={form.mobile} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input name="password" type="password" className="form-input" placeholder="Enter your password"
                  value={form.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 8 }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Logging in...
                  </span>
                ) : 'Log in'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 22, fontSize: 14, color: 'var(--subtext)' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 700 }}>Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
