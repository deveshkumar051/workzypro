import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';

const STATS = [
  { value: '500+',  label: 'Verified Helpers' },
  { value: '2,000+', label: 'Jobs Completed' },
  { value: '50+',   label: 'Service Categories' },
  { value: '4.8★',  label: 'Average Rating' },
];

const VALUES = [
  { icon: '🎯', title: 'Mission First',    desc: 'Every feature we build starts with: does this help a helper earn more or a customer get better service?' },
  { icon: '🔒', title: 'Trust & Safety',   desc: 'All helpers are background verified. Payments are secured. Your data stays private.' },
  { icon: '⚡', title: 'Speed',            desc: 'From finding a helper to confirmation — under 2 minutes, always.' },
  { icon: '📍', title: 'Local First',      desc: 'We connect you to helpers in your neighbourhood — not strangers from across the city.' },
  { icon: '💬', title: 'Transparency',     desc: 'Fixed base prices. No surge, no hidden fees, no surprises on your bill.' },
  { icon: '🌱', title: 'Real Impact',      desc: "Every booking creates income for a local worker. You're not just booking a service — you're creating opportunity." },
];

const TEAM = [
  {
    name: 'Devesh Kumar',
    role: 'Developer',
    avatar: 'D',
    bio: 'Full-stack developer behind the Workzy platform. Passionate about building clean, scalable systems that solve real problems for real people.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'System Design'],
  },
  {
    name: 'Harshit Nama',
    role: 'Marketing',
    avatar: 'H',
    bio: 'Leads growth and brand strategy at Workzy. Focused on connecting skilled helpers with the customers who need them most.',
    skills: ['Growth Strategy', 'Brand Building', 'Community', 'User Research'],
  },
];

export default function About() {
  return (
    <MainLayout>
      {/* Hero */}
      <div style={{
        padding: '80px 0 64px', borderBottom: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(29,185,84,0.05) 0%, transparent 100%)',
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center', display: 'flex' }}>About Workzy</div>
          <h1 className="reveal" style={{ fontSize: 'clamp(32px,5vw,60px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 20 }}>
            Built for the helpers.<br />
            <span style={{ color: 'var(--accent)' }}>Designed for you.</span>
          </h1>
          <p className="reveal" style={{ color: 'var(--subtext)', fontSize: 18, maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            We're on a mission to connect skilled local helpers with customers who need home services — fast, reliably, and affordably.
          </p>
        </div>
      </div>

      {/* Story + Stats */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 56, alignItems: 'center' }}>
            <div className="reveal">
              <div className="section-label" style={{ marginBottom: 14 }}>Our Story</div>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 20 }}>Why we built Workzy</h2>
              <p style={{ color: 'var(--subtext)', lineHeight: 1.85, marginBottom: 16, fontSize: 15 }}>
                Workzy started with a simple observation: skilled workers in every neighbourhood are underemployed, while homeowners struggle to find reliable help for everyday tasks.
              </p>
              <p style={{ color: 'var(--subtext)', lineHeight: 1.85, fontSize: 15, marginBottom: 28 }}>
                We built a platform that makes it effortless to book trusted local helpers — plumbers, electricians, cleaners, carpenters, and many more — in under 2 minutes. Every booking creates meaningful income for local workers.
              </p>
              <Link to="/register?role=helper" className="btn btn-primary">Join as Helper →</Link>
            </div>
            <div className="grid-2 reveal" style={{ gap: 16 }}>
              {STATS.map(({ value, label }) => (
                <div key={label} className="card" style={{ textAlign: 'center', padding: '28px 16px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)', borderRadius: '12px 12px 0 0' }} />
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', marginBottom: 6 }}>{value}</div>
                  <div style={{ fontSize: 13, color: 'var(--subtext)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }} className="reveal">
            <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Values</div>
            <h2 className="section-heading">What drives us</h2>
          </div>
          <div className="grid-3" style={{ gap: 20 }}>
            {VALUES.map(({ icon, title, desc }, i) => (
              <div key={title} className="feature-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="feature-icon"><span style={{ fontSize: 20 }}>{icon}</span></div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--subtext)', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }} className="reveal">
            <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>The Team</div>
            <h2 className="section-heading">The people behind Workzy</h2>
            <p className="section-sub">A small team with a big mission.</p>
          </div>
          <div className="grid-2" style={{ gap: 24, maxWidth: 780, margin: '0 auto' }}>
            {TEAM.map(({ name, role, avatar, bio, skills }, i) => (
              <div key={name} className="card reveal" style={{ transitionDelay: `${i * 120}ms`, padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, fontWeight: 800, color: '#000', flexShrink: 0,
                  }}>{avatar}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>{name}</div>
                    <div style={{
                      fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: 'var(--accent)', marginTop: 2,
                    }}>{role}</div>
                  </div>
                </div>
                <p style={{ color: 'var(--subtext)', fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{bio}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {skills.map(s => (
                    <span key={s} style={{
                      padding: '4px 12px', borderRadius: 'var(--r-full)',
                      background: 'var(--accent-dim)', color: 'var(--accent)',
                      fontSize: 12, fontWeight: 600,
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="reveal" style={{
            background: 'var(--card)', borderRadius: 'var(--r-xl)',
            padding: 'clamp(40px,6vw,72px)', textAlign: 'center',
          }}>
            <h2 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 14 }}>
              Ready to get started?
            </h2>
            <p style={{ color: 'var(--subtext)', marginBottom: 32, fontSize: 16 }}>
              Book your first service in under 2 minutes.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn btn-primary btn-lg">Browse Services</Link>
              <Link to="/register?role=helper" className="btn btn-outline btn-lg">Become a Helper</Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
