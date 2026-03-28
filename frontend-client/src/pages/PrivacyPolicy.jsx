import MainLayout from '../layouts/MainLayout';
const Section = ({ title, children }) => (<div style={{ marginBottom: 32 }}><h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{title}</h2>{children}</div>);
const P = ({ children }) => (<p style={{ color: 'var(--subtext)', lineHeight: 1.8, marginBottom: 10 }}>{children}</p>);
export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <div style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', padding: '60px 0 48px' }}><div className="container"><h1 style={{ color: 'var(--text)', fontSize: 32, fontWeight: 800 }}>Privacy Policy</h1><p style={{ color: 'var(--subtext)', marginTop: 8 }}>Last updated: January 2025</p></div></div>
      <div className="container" style={{ padding: '48px 24px', maxWidth: 760 }}>
        <div className="card" style={{ padding: '40px' }}>
          <Section title="Information We Collect"><P>We collect information you provide when registering (name, mobile number, location), and usage data when you interact with the platform (bookings, reviews, activity logs).</P></Section>
          <Section title="How We Use Your Information"><P>We use your data to match you with helpers, process bookings, send notifications, improve the platform, and provide customer support. We do not sell your personal data to third parties.</P></Section>
          <Section title="Data Sharing"><P>We share your name and mobile number with the helper you book (and vice versa) to facilitate the service. We do not share your data with advertisers.</P></Section>
          <Section title="Data Security"><P>Your password is securely hashed and never stored in plain text. Sessions are encrypted and stored securely. We use HTTPS for all data transmission.</P></Section>
          <Section title="Your Rights"><P>You can update your profile information at any time. To request account deletion, contact us at support@workzy.world. We will delete your data within 30 days.</P></Section>
          <Section title="Contact"><P>For privacy concerns, email us at privacy@workzy.world or use the Contact page.</P></Section>
        </div>
      </div>
    </MainLayout>
  );
}
