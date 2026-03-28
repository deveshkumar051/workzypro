import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThreeBackground from '../components/common/ThreeBackground';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '', mobile: '', password: '', confirmPassword: '',
    role: searchParams.get('role') || 'client', location: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault(); setError('');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      const { confirmPassword, ...data } = form;
      await register(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <ThreeBackground />
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Link to="/">
              <img src="/logo/HorizontalLogo.jpg" alt="Workzy" style={{ height: 36, width: 'auto', borderRadius: 4, margin: '0 auto' }} />
            </Link>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 28, marginBottom: 8, letterSpacing: '-0.5px' }}>
              Create your account
            </h1>
            <p style={{ color: 'var(--subtext)', fontSize: 15 }}>Join the platform today — it's free</p>
          </div>

          <div style={{ background: 'var(--card)', borderRadius: 'var(--r-lg)', padding: '32px 28px' }}>
            {error && <div className="alert alert-error">{error}</div>}

            {/* Role toggle */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--r-full)', padding: 4, marginBottom: 24 }}>
              {[{ val: 'client', label: 'I need help' }, { val: 'helper', label: 'I am a helper' }].map(({ val, label }) => (
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
                <label className="form-label">Full Name</label>
                <input name="name" className="form-input" placeholder="Your full name"
                  value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input name="mobile" type="tel" className="form-input" placeholder="10-digit mobile"
                  value={form.mobile} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">City / Location</label>
                <input name="location" className="form-input" placeholder="e.g. Jaipur, Rajasthan"
                  value={form.location} onChange={handleChange} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input name="password" type="password" className="form-input" placeholder="Min 6 chars"
                    value={form.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm</label>
                  <input name="confirmPassword" type="password" className="form-input" placeholder="Repeat"
                    value={form.confirmPassword} onChange={handleChange} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 8 }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Creating account...
                  </span>
                ) : `Sign up as ${form.role === 'client' ? 'Customer' : 'Helper'}`}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 22, fontSize: 14, color: 'var(--subtext)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
