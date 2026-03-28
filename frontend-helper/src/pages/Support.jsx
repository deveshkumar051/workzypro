import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const TEAM = [
  { name: 'Devesh Kumar',  role: 'Developer',  avatar: 'D', contact: 'devesh@workzy.world' },
  { name: 'Harshit Nama',  role: 'Marketing',  avatar: 'H', contact: 'harshit@workzy.world' },
];

export default function Support() {
  const [form, setForm] = useState({ subject:'', message:'' });
  const [sent, setSent] = useState(false);

  return (
    <DashboardLayout>
      <div style={{ borderBottom:'1px solid var(--border)', padding:'24px 28px', background:'var(--card)' }}>
        <div style={{ fontSize:11, fontWeight:700, color:'var(--accent)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:6 }}>Help</div>
        <h1 style={{ fontSize:24, fontWeight:800, letterSpacing:'-0.5px' }}>Support</h1>
        <p style={{ color:'var(--subtext)', fontSize:14, marginTop:4 }}>Get help from the Workzy team</p>
      </div>
      <div style={{ padding:'28px', maxWidth:680 }}>
        {/* Contact info */}
        <div className="grid-2" style={{ marginBottom:24, gap:12 }}>
          {[['📧','Email','helper-support@workzy.world'],['📞','Phone','+91 98765 43210'],['🕐','Hours','Mon–Sat, 9am–7pm'],['⚡','Response','Within 24 hours']].map(([icon,l,v]) => (
            <div key={l} className="card" style={{ display:'flex', gap:14, alignItems:'center', padding:'16px 18px' }}>
              <span style={{ fontSize:20 }}>{icon}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:13 }}>{l}</div>
                <div style={{ fontSize:13, color:'var(--subtext)', marginTop:2 }}>{v}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="card" style={{ marginBottom:24 }}>
          <h2 style={{ fontWeight:800, fontSize:16, marginBottom:18 }}>Meet the Team</h2>
          <div className="grid-2" style={{ gap:16 }}>
            {TEAM.map(({ name, role, avatar, contact }) => (
              <div key={name} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:'rgba(255,255,255,0.04)', borderRadius:'var(--r-sm)' }}>
                <div style={{ width:42, height:42, borderRadius:'50%', background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, color:'#000', flexShrink:0 }}>{avatar}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14 }}>{name}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'0.07em', marginTop:2 }}>{role}</div>
                  <div style={{ fontSize:12, color:'var(--subtext)', marginTop:2 }}>{contact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        {sent ? (
          <div className="alert alert-success" style={{ padding:20, fontSize:15 }}>✓ Message sent! We'll respond within 24 hours.</div>
        ) : (
          <div className="card">
            <h2 style={{ fontWeight:800, fontSize:16, marginBottom:18 }}>Send a Message</h2>
            <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <div className="form-group"><label className="form-label">Subject</label><input className="form-input" placeholder="What do you need help with?" value={form.subject} onChange={e => setForm(f=>({...f,subject:e.target.value}))} required /></div>
              <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={5} placeholder="Describe your issue..." value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} required /></div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
