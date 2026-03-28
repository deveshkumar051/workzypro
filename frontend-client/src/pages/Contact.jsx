import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  return (
    <MainLayout>
      <div style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', padding: '60px 0 48px' }}>
        <div className="container"><h1 style={{ color: 'var(--text)', fontSize: 34, fontWeight: 800 }}>Contact Us</h1><p style={{ color: 'var(--subtext)', marginTop: 8 }}>We'd love to hear from you</p></div>
      </div>
      <div className="container" style={{ padding: '48px 24px' }}>
        <div className="grid-2" style={{ gap: 40, alignItems: 'start' }}>
          <div>
            {sent ? (
              <div className="alert alert-success" style={{ padding: '24px', fontSize: 16 }}>✅ Message sent! We'll get back to you within 24 hours.</div>
            ) : (
              <div className="card">
                <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Send a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
                  <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required /></div>
                  <div className="form-group"><label className="form-label">Subject</label><input className="form-input" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required /></div>
                  <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required /></div>
                  <button type="submit" className="btn btn-primary btn-full">Send Message</button>
                </form>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[['📧', 'Email', 'support@workzy.world'], ['📞', 'Phone', '+91 98765 43210'], ['📍', 'Location', 'Jaipur, Rajasthan, India'], ['🕐', 'Support Hours', 'Mon–Sat, 9am–7pm']].map(([icon, label, value]) => (
              <div key={label} className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px' }}>
                <div style={{ fontSize: 28 }}>{icon}</div>
                <div><div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div><div style={{ color: 'var(--subtext)' }}>{value}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
