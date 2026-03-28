import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const FAQS = [
  { q: 'How do I book a helper?', a: 'Browse services, choose a category, select an available helper, pick a date and time, and confirm your booking. The helper will accept within a few hours.' },
  { q: 'Is there a booking fee?', a: 'There is a small service charge added to the helper\'s base price. All pricing is transparent — no hidden charges.' },
  { q: 'How do I pay?', a: 'You can choose to pay online (card/UPI) or cash on delivery at the time of booking. Payment is made after the work is completed.' },
  { q: 'Can I cancel a booking?', a: 'Yes, you can cancel a pending booking from "My Bookings" at no charge. Once a helper has accepted, please contact support for cancellations.' },
  { q: 'Are helpers verified?', a: 'Yes. All helpers go through a verification process before joining the platform. Customer reviews and ratings are also visible on each helper\'s profile.' },
  { q: 'What if I\'m not satisfied with the service?', a: 'Contact our support team within 24 hours of service completion. We\'ll investigate and help resolve any issues.' },
  { q: 'How do I become a helper?', a: 'Register on helper.workzy.world, fill in your details, and set your availability. Once your profile is approved, you\'ll start receiving job requests.' },
  { q: 'How do helpers get paid?', a: 'Helpers receive 90% of the service price. The platform retains a 10% commission. Earnings are tracked in the helper dashboard.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '18px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontWeight: 600, fontSize: 16 }}>{q}</span>
        <span style={{ fontSize: 20, color: 'var(--subtext)', flexShrink: 0, marginLeft: 16, transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && <p style={{ color: 'var(--subtext)', lineHeight: 1.7, marginTop: 12, paddingRight: 32 }}>{a}</p>}
    </div>
  );
}

export default function FAQ() {
  return (
    <MainLayout>
      <div style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', padding: '60px 0 48px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--text)', fontSize: 34, fontWeight: 800 }}>Frequently Asked Questions</h1>
          <p style={{ color: 'var(--subtext)', marginTop: 10 }}>Everything you need to know about Workzy</p>
        </div>
      </div>
      <div className="container" style={{ padding: '48px 24px', maxWidth: 760 }}>
        <div className="card" style={{ padding: '8px 32px' }}>
          {FAQS.map((f, i) => <FAQItem key={i} {...f} />)}
        </div>
      </div>
    </MainLayout>
  );
}
