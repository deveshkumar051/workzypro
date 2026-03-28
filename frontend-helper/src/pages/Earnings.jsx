import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';

export default function Earnings() {
  const [data, setData] = useState({ total: 0, data: [] });
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/earnings').then(res => setData(res.data)).finally(() => setLoading(false)); }, []);

  const now = new Date();
  const thisMonth = data.data.filter(e => { const d=new Date(e.date); return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear(); });
  const monthTotal = thisMonth.reduce((s,e) => s+Number(e.amount), 0);

  return (
    <DashboardLayout>
      <div style={{ borderBottom:'1px solid var(--border)', padding:'24px 28px', background:'var(--card)' }}>
        <div style={{ fontSize:11, fontWeight:700, color:'var(--accent)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:6 }}>Finance</div>
        <h1 style={{ fontSize:24, fontWeight:800, letterSpacing:'-0.5px' }}>Earnings</h1>
        <p style={{ color:'var(--subtext)', fontSize:14, marginTop:4 }}>Track your income from completed jobs</p>
      </div>
      <div style={{ padding:'28px' }}>
        <div className="grid-3" style={{ marginBottom:24 }}>
          {[
            { label:'Total Earnings', value:`₹${Number(data.total||0).toFixed(0)}`, sub:'All time', color:'var(--accent)' },
            { label:'This Month',     value:`₹${monthTotal.toFixed(0)}`,            sub:`${thisMonth.length} jobs`, color:'#1ed760' },
            { label:'Completed Jobs', value:data.data.length,                        sub:'Paid out', color:'var(--blue)' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="card reveal" style={{ padding:'22px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:color, borderRadius:'12px 12px 0 0' }} />
              <div style={{ fontSize:13, color:'var(--subtext)', marginBottom:8 }}>{label}</div>
              <div style={{ fontSize:30, fontWeight:800, color }}>{loading ? '—' : value}</div>
              <div style={{ fontSize:12, color:'var(--subtext)', marginTop:6 }}>{sub}</div>
            </div>
          ))}
        </div>
        <div className="alert alert-info" style={{ marginBottom:22, fontSize:14 }}>
          💡 Platform commission: <strong>10%</strong>. You keep <strong>90%</strong> of each service price.
        </div>
        <div className="card reveal">
          <h2 style={{ fontWeight:800, fontSize:16, marginBottom:18 }}>Earnings History</h2>
          {loading ? <div style={{ display:'flex', justifyContent:'center', padding:40 }}><div className="spinner" /></div>
          : data.data.length === 0 ? (
            <div className="empty-state" style={{ padding:32 }}><div style={{ fontSize:36, opacity:.4, marginBottom:10 }}>💰</div><h3>No earnings yet</h3><p>Complete jobs to see earnings here</p></div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {data.data.map((e,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 14px', background:'rgba(255,255,255,0.04)', borderRadius:'var(--r-sm)' }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14 }}>{e.service_name}</div>
                    <div style={{ fontSize:12, color:'var(--subtext)', marginTop:2 }}>{new Date(e.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontWeight:800, color:'var(--accent)', fontSize:16 }}>+₹{Number(e.amount).toFixed(2)}</div>
                    <div style={{ fontSize:11, color:'var(--subtext)', marginTop:2 }}>After 10% commission</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
