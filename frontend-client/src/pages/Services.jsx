import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import api from '../api/axios';

const CATEGORIES = ['All', 'Cleaning', 'Plumbing', 'Electrical', 'Appliance Repair', 'Carpenter', 'Construction', 'Moving', 'Home Services'];
const CAT_ICONS = { Cleaning:'🧹', Plumbing:'🔧', Electrical:'⚡', 'Appliance Repair':'🔌', Carpenter:'🪚', Construction:'🏗', Moving:'📦', 'Home Services':'🏠' };

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data.data)).finally(() => setLoading(false));
  }, []);

  const filtered = services.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.service_name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <MainLayout>
      {/* Header */}
      <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', padding: '48px 0 40px' }}>
        <div className="container">
          <div className="section-label" style={{ marginBottom: 12 }}>Explore</div>
          <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 10 }}>All Services</h1>
          <p style={{ color: 'var(--subtext)', fontSize: 16, marginBottom: 24 }}>Find the right helper for any home task</p>
          <div style={{ maxWidth: 460, position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input className="form-input" placeholder="Search services..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 44, borderRadius: 'var(--r-full)', width: '100%' }} />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 32px' }}>
        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {CATEGORIES.map(cat => (
            <button key={cat}
              onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
              className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-dark'}`}
              style={{ borderRadius: 'var(--r-full)' }}
            >
              {CAT_ICONS[cat] || ''} {cat}
            </button>
          ))}
        </div>

        <p style={{ color: 'var(--subtext)', fontSize: 13, marginBottom: 24 }}>
          {filtered.length} service{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && ` in ${activeCategory}`}
        </p>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" style={{ width: 40, height: 40 }} /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: 36, marginBottom: 16, opacity: 0.4 }}>🔍</div>
            <h3>No services found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <div className="grid-4">
            {filtered.map((service, i) => (
              <Link key={service.id} to={`/services/${service.id}`} style={{ textDecoration: 'none' }}>
                <div className="service-card reveal" style={{ transitionDelay: `${(i % 8) * 50}ms`, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="service-icon-wrap">{CAT_ICONS[service.category] || '🔨'}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{service.service_name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--subtext)', marginBottom: 'auto', lineHeight: 1.6, flexGrow: 1 }}>{service.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: 16 }}>₹{service.base_price}</span>
                    <span className="badge badge-green">Book Now</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
