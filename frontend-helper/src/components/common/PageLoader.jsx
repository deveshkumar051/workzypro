import { useEffect, useRef, useState } from 'react';
export default function PageLoader({ onDone }) {
  const barRef = useRef(null); const [p, setP] = useState(0);
  useEffect(() => {
    let cur = 0;
    const steps = [{t:30,d:0,ms:350},{t:65,d:380,ms:400},{t:88,d:820,ms:280},{t:100,d:1150,ms:180}];
    const timers = steps.map(({t,d,ms}) => setTimeout(() => {
      const s=cur, st=Date.now(); const tick = () => { const f=Math.min((Date.now()-st)/ms,1); const v=Math.round(s+(t-s)*f); setP(v); if(barRef.current)barRef.current.style.width=v+'%'; cur=v; if(f<1)requestAnimationFrame(tick); }; requestAnimationFrame(tick);
    }, d));
    const done = setTimeout(() => onDone?.(), 1500);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onDone]);
  return (
    <div style={{ position:'fixed', inset:0, background:'#0a0a0a', zIndex:99999, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}>
      <img src="/logo/BrandmarkLogo.png" alt="Workzy" style={{ width:56, height:56, objectFit:'contain' }} />
      <div style={{ fontSize:14, fontWeight:800, color:'#fff', letterSpacing:'0.1em' }}>WORKZY</div>
      <div style={{ fontSize:11, color:'#B3B3B3', letterSpacing:'0.12em', textTransform:'uppercase' }}>Helper Portal</div>
      <div style={{ width:180, height:3, background:'rgba(255,255,255,0.08)', borderRadius:99, overflow:'hidden', marginTop:4 }}>
        <div ref={barRef} style={{ height:'100%', width:'0%', background:'#1DB954', borderRadius:99 }} />
      </div>
      <div style={{ fontSize:11, color:'#535353', letterSpacing:'0.15em' }}>Loading · {p}%</div>
    </div>
  );
}
