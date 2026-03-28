import { Link } from 'react-router-dom';

const LINKS = {
  Platform: [
    { to: '/services', label: 'Browse Services' },
    { to: '/register', label: 'Become a Helper' },
    { to: '/about',    label: 'About Us' },
  ],
  Support: [
    { to: '/faq',     label: 'FAQ' },
    { to: '/contact', label: 'Contact Us' },
  ],
  Legal: [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms',   label: 'Terms & Conditions' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div className="footer-logo">
              <img src="/logo/HorizontalLogo.jpg" alt="Workzy" style={{ height: 28, width: 'auto', borderRadius: 4 }} />
            </div>
            <p style={{ fontSize: 14, color: 'var(--subtext)', lineHeight: 1.8, maxWidth: 280, marginTop: 12 }}>
              Your home services, on demand. Book trusted local helpers in minutes.
            </p>
            <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
              {[['500+', 'Helpers'], ['2K+', 'Jobs Done'], ['4.8★', 'Rating']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--accent)' }}>{n}</div>
                  <div style={{ fontSize: 12, color: 'var(--subtext)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <div className="footer-heading">{heading}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(({ to, label }) => (
                  <Link key={to} to={to} className="footer-link">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 13, color: 'var(--subtext)' }}>
            © {new Date().getFullYear()} Workzy Platform. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span className="dot dot-green" />
            <span style={{ fontSize: 12, color: 'var(--subtext)' }}>All systems operational</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer .container > div:first-child { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
