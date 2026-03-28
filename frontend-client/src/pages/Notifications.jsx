import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import api from '../api/axios';
export default function Notifications() {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/notifications').then(res => setNotifs(res.data.data)).finally(() => setLoading(false)); }, []);
  const markAllRead = async () => { await api.patch('/notifications/read-all'); setNotifs(p => p.map(n => ({...n,is_read:true}))); };
  const markOne = async (id) => { await api.patch('/notifications/'+id+'/read'); setNotifs(p => p.map(n => n.id===id ? {...n,is_read:true} : n)); };
  const unread = notifs.filter(n => !n.is_read).length;
  return (
    <MainLayout>
      <div style={{ background:'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', borderBottom:'1px solid var(--border)', padding:'56px 0 40px' }}>
        <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div><div className="section-label">Inbox</div>
            <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:'clamp(26px,4vw,40px)', fontWeight:800, color:'var(--text)', letterSpacing:'-1px' }}>
              Notifications {unread>0 && <span className="badge badge-red" style={{ marginLeft:10 }}>{unread} new</span>}
            </h1>
          </div>
          {unread>0 && <button onClick={markAllRead} className="btn btn-dark btn-sm">Mark all read</button>}
        </div>
      </div>
      <div className="container" style={{ padding:'40px 24px', maxWidth:700 }}>
        {loading ? <div style={{ display:'flex', justifyContent:'center', padding:80 }}><div className="spinner" /></div>
        : notifs.length===0 ? <div className="empty-state"><div style={{ fontSize:48, opacity:.4, marginBottom:16 }}>◎</div><h3>No notifications yet</h3><p>You'll see booking updates here</p></div>
        : <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {notifs.map(n => (
            <div key={n.id} onClick={() => !n.is_read && markOne(n.id)} style={{ padding:'16px 20px', borderRadius:'var(--r-sm)', background: n.is_read ? 'var(--surface)' : 'var(--accent-dim)', border:`1px solid ${n.is_read ? 'var(--border)' : 'rgba(0,229,255,0.2)'}`, cursor: n.is_read ? 'default' : 'none', transition:'all 0.15s' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    {!n.is_read && <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--accent)', display:'inline-block', boxShadow:'0 0 6px var(--accent)' }} />}
                    <span style={{ fontWeight:n.is_read?500:700, fontSize:14, color:'var(--text)' }}>{n.title}</span>
                  </div>
                  <p style={{ color:'var(--subtext)', fontSize:13 }}>{n.message}</p>
                </div>
                <span style={{ fontSize:11, color:'rgba(179,179,179,0.45)', whiteSpace:'nowrap' }}>{new Date(n.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</span>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </MainLayout>
  );
}
