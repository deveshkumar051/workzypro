import MainLayout from '../layouts/MainLayout';
const Section = ({ title, children }) => (<div style={{ marginBottom: 32 }}><h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{title}</h2>{children}</div>);
const P = ({ children }) => (<p style={{ color: 'var(--subtext)', lineHeight: 1.8, marginBottom: 10 }}>{children}</p>);
export default function Terms() {
  return (
    <MainLayout>
      <div style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', padding: '60px 0 48px' }}><div className="container"><h1 style={{ color: 'var(--text)', fontSize: 32, fontWeight: 800 }}>Terms & Conditions</h1><p style={{ color: 'var(--subtext)', marginTop: 8 }}>Last updated: January 2025</p></div></div>
      <div className="container" style={{ padding: '48px 24px', maxWidth: 760 }}>
        <div className="card" style={{ padding: '40px' }}>
          <Section title="Acceptance of Terms"><P>By using the Workzy platform, you agree to these Terms & Conditions. If you do not agree, please do not use the service.</P></Section>
          <Section title="User Accounts"><P>You must provide accurate information when registering. You are responsible for maintaining the confidentiality of your account. Notify us immediately of any unauthorised use.</P></Section>
          <Section title="Booking & Payments"><P>Bookings are a contract between the customer and the helper. The platform facilitates the connection and takes a 10% commission on completed bookings. Prices shown are base rates and may vary.</P></Section>
          <Section title="Cancellations"><P>Customers may cancel pending bookings at no charge. Cancellations of accepted bookings may incur a fee. Helpers who repeatedly reject or fail to complete bookings may be removed.</P></Section>
          <Section title="Prohibited Conduct"><P>Users must not misuse the platform, post false information, or engage in fraudulent activity. Violations may result in immediate account suspension.</P></Section>
          <Section title="Limitation of Liability"><P>Workzy acts as an intermediary platform. We are not responsible for the quality of work performed by helpers, though we do provide a dispute resolution mechanism.</P></Section>
          <Section title="Contact"><P>For questions about these terms, contact legal@workzy.world.</P></Section>
        </div>
      </div>
    </MainLayout>
  );
}
