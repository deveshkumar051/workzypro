import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import MainLayout from '../layouts/MainLayout';
import api from '../api/axios';

const SERVICE_ICONS = {
  'Cleaning': '🧹', 'Plumbing': '🔧', 'Electrical': '⚡',
  'Appliance Repair': '🔌', 'Carpenter': '🪚', 'Construction': '🏗',
  'Moving': '📦', 'Home Services': '🏠',
};

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose a Service', desc: 'Browse 50+ home service categories and pick exactly what you need.' },
  { step: '02', title: 'Book a Helper', desc: 'Select a verified local helper by rating, price, and availability.' },
  { step: '03', title: 'Get it Done', desc: 'Helper arrives, job done. Pay online or cash — your choice.' },
];

const WHY_US = [
  { icon: '✓', title: 'Verified Helpers', desc: 'All helpers are background-checked and rated by real customers.' },
  { icon: '⚡', title: 'Fast Booking', desc: 'Book in under 2 minutes. Helpers confirm within the hour.' },
  { icon: '₹', title: 'Fair Pricing', desc: 'Transparent base prices. No hidden charges, ever.' },
  { icon: '🛡', title: 'Secure Payments', desc: 'Pay safely online or choose cash on delivery.' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', service: 'House Cleaner', rating: 5, text: 'Found an amazing cleaner within 10 minutes. The house was spotless and the price was fair!' },
  { name: 'Rahul Gupta',  service: 'Electrician',  rating: 5, text: 'Very professional and affordable. Fixed all wiring issues same day. Highly recommended.' },
  { name: 'Sunita Devi',  service: 'Plumber',      rating: 4, text: 'Quick response, honest pricing. The helper arrived on time and resolved everything.' },
];

function Stars({ n }) {
  return <span style={{ color: 'var(--accent)', letterSpacing: 2, fontSize: 14 }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

function AnimatedCounter({ target, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = (el) => {
    if (!el || started.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        started.current = true;
        let s = 0;
        const step = () => {
          s += Math.ceil(target / 55);
          if (s >= target) { setCount(target); return; }
          setCount(s); requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
  };
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/services').then(res => {
      const cats = [...new Set(res.data.data.map(s => s.category))];
      setCategories(cats.filter(Boolean).slice(0, 8));
    }).catch(() => {});
  }, []);

  const displayCats = categories.length > 0 ? categories : Object.keys(SERVICE_ICONS);

  return (
    <MainLayout>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="hero-content">
          <div className="hero-label reveal">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            50+ Home Services Available
          </div>
          <h1 className="hero-title reveal">
            Home services,<br />
            <span className="accent">on demand</span>
          </h1>
          <p className="hero-sub reveal">
            Book trusted local helpers in minutes. No hassle — just pick a service and get it done.
          </p>
          <div className="hero-cta reveal">
            <Link to="/services" className="btn btn-primary btn-lg">Book a Helper</Link>
            <Link to="/register?role=helper" className="btn btn-outline btn-lg">Become a Helper</Link>
          </div>
          <div className="hero-stats reveal">
            {[
              { num: 500, suffix: '+', label: 'Verified Helpers' },
              { num: 2000, suffix: '+', label: 'Jobs Completed' },
              { num: 48, suffix: '.0★', label: 'Avg Rating' },
            ].map(({ num, suffix, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div className="hero-stat-num"><AnimatedCounter target={num} suffix={suffix} /></div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label reveal" style={{ justifyContent: 'center', display: 'flex' }}>Our Services</div>
            <h2 className="section-heading reveal">Every home need, covered</h2>
            <p className="section-sub reveal">From cleaning to construction — we've got it all</p>
          </div>
          <div className="grid-4">
            {displayCats.map((cat, i) => (
              <Link to={`/services?category=${encodeURIComponent(cat)}`} key={cat} style={{ textDecoration: 'none' }}>
                <div className="service-card reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                  <div className="service-icon-wrap">{SERVICE_ICONS[cat] || '🔨'}</div>
                  <div className="service-card-name">{cat}</div>
                  <div className="service-card-sub">Tap to explore →</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" className="btn btn-outline">View all services</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section" style={{ background: 'rgba(29,185,84,0.03)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label reveal" style={{ justifyContent: 'center', display: 'flex' }}>Process</div>
            <h2 className="section-heading reveal">How it works</h2>
            <p className="section-sub reveal">Get help in 3 simple steps</p>
          </div>
          <div className="grid-3" style={{ gap: 24 }}>
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={step} className="step-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="step-number">{step}</div>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--subtext)', fontSize: 15, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label reveal" style={{ justifyContent: 'center', display: 'flex' }}>Why Workzy</div>
            <h2 className="section-heading reveal">Trusted by thousands</h2>
          </div>
          <div className="grid-4">
            {WHY_US.map(({ icon, title, desc }, i) => (
              <div key={title} className="feature-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="feature-icon">{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--subtext)', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HELPER CTA ── */}
      <section className="section">
        <div className="container">
          <div style={{
            background: 'var(--card)', borderRadius: 'var(--r-xl)',
            padding: 'clamp(40px,6vw,72px)', textAlign: 'center', position: 'relative', overflow: 'hidden',
          }} className="reveal">
            <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(29,185,84,0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div className="section-label" style={{ justifyContent: 'center', display: 'flex', marginBottom: 16 }}>For Professionals</div>
            <h2 style={{ fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>
              Are you a skilled professional?
            </h2>
            <p style={{ color: 'var(--subtext)', fontSize: 17, marginBottom: 36, maxWidth: 460, margin: '0 auto 36px' }}>
              Join hundreds of helpers earning great income on your own schedule.
            </p>
            <Link to="/register?role=helper" className="btn btn-primary btn-lg">Join as Helper →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label reveal" style={{ justifyContent: 'center', display: 'flex' }}>Reviews</div>
            <h2 className="section-heading reveal">What customers say</h2>
          </div>
          <div className="grid-3" style={{ gap: 20 }}>
            {TESTIMONIALS.map(({ name, service, rating, text }, i) => (
              <div key={name} className="testimonial-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <Stars n={rating} />
                <p style={{ color: 'var(--subtext)', fontSize: 15, lineHeight: 1.8, margin: '14px 0 20px', fontStyle: 'italic' }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="testimonial-avatar">{name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{name}</div>
                    <div style={{ fontSize: 12, color: 'var(--subtext)' }}>Booked: {service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </MainLayout>
  );
}
