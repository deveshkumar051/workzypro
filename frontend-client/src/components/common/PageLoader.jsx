import { useEffect, useRef, useState } from 'react';

export default function PageLoader({ onDone }) {
  const barRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const steps = [
      { target: 30,  delay: 0,    duration: 350 },
      { target: 60,  delay: 380,  duration: 450 },
      { target: 85,  delay: 860,  duration: 300 },
      { target: 100, delay: 1200, duration: 200 },
    ];
    const timers = steps.map(({ target, delay, duration }) =>
      setTimeout(() => {
        const start = p;
        const startTime = Date.now();
        const tick = () => {
          const elapsed = Date.now() - startTime;
          const frac = Math.min(elapsed / duration, 1);
          const current = Math.round(start + (target - start) * frac);
          setProgress(current);
          if (barRef.current) barRef.current.style.width = current + '%';
          p = current;
          if (frac < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay)
    );
    const doneTimer = setTimeout(() => onDone?.(), 1550);
    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0a0a0a', zIndex: 99990,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
    }}>
      <img src="/logo/BrandmarkLogo.png" alt="Workzy" style={{ width: 64, height: 64, objectFit: 'contain' }} />
      <img src="/logo/HorizontalLogo.jpg" alt="Workzy" style={{ height: 28, width: 'auto', borderRadius: 4, opacity: 0.9 }} />
      <div style={{ width: 200, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
        <div ref={barRef} style={{ height: '100%', width: '0%', background: '#1DB954', borderRadius: 99, transition: 'width 0.05s' }} />
      </div>
      <div style={{ fontSize: 11, color: 'var(--subtext)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Loading · {progress}%
      </div>
    </div>
  );
}
