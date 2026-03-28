import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';

const SC = { pending:{c:'var(--gold)',l:'Pending'}, accepted:{c:'var(--blue)',l:'Accepted'}, completed:{c:'var(--green)',l:'Completed'}, cancelled:{c:'var(--red)',l:'Cancelled'}, rejected:{c:'var(--red)',l:'Rejected'} };

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => { api.get('/bookings/'+id).then(res => setJob(res.data.data)).catch(() => navigate('/jobs')).finally(() => setLoading(false)); }, [id]);

  const handleAction = async (status) => {
    setActionLoading(status);
    try { await api.patch('/bookings/'+id+'/status', { status }); setJob(p => ({...p, status})); }
    catch (err) { alert(err.response?.data?.message || 'Action failed.'); }
    finally { setActionLoading(null); }
  };

  if (loading) return <DashboardLayout><div style={{ display:'flex', justifyContent:'center', padding:100 }}><div className="spinner" /></div></DashboardLayout>;
  if (!job) return null;
  const sc = SC[job.status] || SC.pending;

  return (
    <DashboardLayout>
      <div style={{ borderBottom:'1px solid var(--border)', padding:'24px 32px', background:'var(--card)' }}>
        <Link to="/jobs" style={{ color:'var(--subtext)', fontSize:13 }}>← Back to Jobs</Link>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:10 }}>
          <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-0.5px' }}>Job #{job.id}</h1>
          <span className="badge" style={{ background:sc.c+'18', color:sc.c, border:`1px solid ${sc.c}33` }}>{sc.l}</span>
        </div>
      </div>
      <div style={{ padding:'32px', display:'grid', gridTemplateColumns:'1fr 300px', gap:24, alignItems:'start' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div className="card reveal">
            <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:17, marginBottom:20, color:'var(--text)' }}>Job Details</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px 28px' }}>
              {[['Service',job.service_name],['Date',new Date(job.date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})],['Time',job.time],['Payment',job.payment_method==='online'?'Online Payment':'Cash on Delivery']].map(([l,v]) => (
                <div key={l}><div style={{ fontSize:11, color:'var(--subtext)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>{l}</div><div style={{ fontWeight:600, color:'var(--text)' }}>{v}</div></div>
              ))}
              <div style={{ gridColumn:'1/-1' }}><div style={{ fontSize:11, color:'var(--subtext)', fontWeight:700, textTransform:'uppercase', marginBottom:4 }}>Address</div><div style={{ fontWeight:500, color:'var(--text)' }}>📍 {job.address}</div></div>
            </div>
          </div>
          <div className="card reveal">
            <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:17, marginBottom:16, color:'var(--text)' }}>Customer</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', background:'var(--surface)', borderRadius:'var(--r-sm)', border:'1px solid var(--border)' }}>
              <div style={{ width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent-dim), rgba(139,92,246,0.12))', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'var(--accent)', fontSize:18 }}>{job.client_name?.[0]}</div>
              <div><div style={{ fontWeight:700, color:'var(--text)' }}>{job.client_name}</div><div style={{ fontSize:13, color:'var(--subtext)' }}>📞 {job.client_mobile}</div></div>
            </div>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div className="card reveal">
            <h3 style={{ fontWeight:700, marginBottom:14, color:'var(--text)' }}>Earnings</h3>
            <div style={{ fontFamily:"inherit,sans-serif", fontSize:32, fontWeight:800, color:'var(--accent)', marginBottom:4 }}>₹{(job.price * 0.9).toFixed(0)}</div>
            <div style={{ fontSize:12, color:'rgba(179,179,179,0.45)' }}>After 10% platform commission</div>
            <div style={{ marginTop:12, padding:'10px 14px', background:'var(--surface)', borderRadius:'var(--r-sm)', border:'1px solid var(--border)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                <span style={{ color:'var(--subtext)' }}>Service price</span><span>₹{job.price}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginTop:6 }}>
                <span style={{ color:'var(--subtext)' }}>Commission (10%)</span><span style={{ color:'var(--red)' }}>-₹{(job.price*0.1).toFixed(0)}</span>
              </div>
            </div>
          </div>
          {job.status === 'pending' && (
            <div className="card reveal" style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <button className="btn btn-primary btn-full" disabled={actionLoading==='accepted'} onClick={() => handleAction('accepted')}>
                {actionLoading==='accepted' ? 'Accepting...' : 'Accept Job'}
              </button>
              <button className="btn btn-full" style={{ background:'rgba(239,68,68,0.1)', color:'var(--red)', border:'1px solid rgba(239,68,68,0.2)' }} disabled={actionLoading==='rejected'} onClick={() => handleAction('rejected')}>
                {actionLoading==='rejected' ? 'Rejecting...' : 'Reject Job'}
              </button>
            </div>
          )}
          {job.status === 'accepted' && (
            <button className="btn btn-full reveal" style={{ background:'rgba(16,185,129,0.1)', color:'var(--green)', border:'1px solid rgba(16,185,129,0.2)', padding:'14px', borderRadius:'var(--r-md)' }} disabled={actionLoading==='completed'} onClick={() => handleAction('completed')}>
              {actionLoading==='completed' ? 'Marking...' : '✓ Mark as Completed'}
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
