import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ThreeBackground from '../components/common/ThreeBackground';
import PageLoader from '../components/common/PageLoader';

let loaderShown = false;

export default function MainLayout({ children }) {
  const [loading, setLoading] = useState(!loaderShown);

  useEffect(() => {
    if (!loaderShown) loaderShown = true;
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });

  if (loading) return <PageLoader onDone={() => setLoading(false)} />;

  return (
    <>
      <ThreeBackground />
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
