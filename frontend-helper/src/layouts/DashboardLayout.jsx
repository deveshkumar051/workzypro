import { useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import ThreeBackground from '../components/common/ThreeBackground';

export default function DashboardLayout({ children }) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });

  return (
    <>
      <ThreeBackground />
      <div style={{ display:'flex', minHeight:'100vh', position:'relative', zIndex:2 }}>
        <Sidebar />
        <main style={{
          marginLeft: 'var(--sidebar-w, 240px)',
          flex: 1, minHeight: '100vh',
          background: 'var(--bg)',
          transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}>
          {children}
        </main>
      </div>
    </>
  );
}
