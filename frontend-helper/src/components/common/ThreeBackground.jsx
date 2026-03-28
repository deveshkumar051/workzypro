import { useEffect, useRef } from 'react';
export default function ThreeBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); let animId;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const P = Array.from({ length: 50 }, () => ({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.2+0.3, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25, a: Math.random()*.2+.04 }));
    const onResize = () => { W=window.innerWidth; H=window.innerHeight; canvas.width=W; canvas.height=H; };
    window.addEventListener('resize', onResize);
    const draw = () => { ctx.clearRect(0,0,W,H); P.forEach(p => { p.x+=p.vx; p.y+=p.vy; if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(29,185,84,${p.a})`; ctx.fill(); }); animId=requestAnimationFrame(draw); };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none', opacity:.5 }} />;
}
