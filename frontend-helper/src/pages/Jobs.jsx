import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';

const SC = { pending:{c:'var(--gold)',l:'Pending'}, accepted:{c:'var(--blue)',l:'Accepted'}, completed:{c:'var(--accent)',l:'Completed'}, cancelled:{c:'var(--red)',l:'Cancelled'}, rejected:{c:'var(--red)',l:'Rejected'} };

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const filterStatus = searchParams.get('status') || 'all';

  const fetchJobs = () => {
    setLoading(true);
    const params = filterStatus !== 'all' ? `?status=${filterStatus}` : '';
    api.get(`/bookings/jobs${params}`).then(res => setJobs(res.data.data)).finally(() => setLoading(false));
  };
  useEffect(() => { fetchJobs(); }, [filterStatus]);

  const handleAction = async (id, status) => {
    setActionLoading(id+status);
    try { await api.patch(`/bookings/${id}/status`, { status }); fetchJobs(); }
    catch (err) { alert(err.response?.data?.message || 'Action failed.'); }
    finally { setActionLoading(null); }
  };

  return (
    <DashboardLayout>
      <div style={{ borderBottom:'1px solid var(--border)', padding:'24px 28px', background:'var(--card)' }}>
        <div style={{ fontSize:11, fontWeight:700, color:'var(--accent)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:6 }}>Work</div>
        <h1 style={{ fontSize:24, fontWeight:800, letterSpacing:'-0.5px' }}>My Jobs</h1>
        <p style={{ color:'var(--subtext)', fontSize:14, marginTop:4 }}>Manage all your booking requests</p>
      </div>
      <div style={{ padding:'28px' }}>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:28 }}>
          {['all','pending','accepted','completed','cancelled'].map(s => (
            <button key={s} onClick={() => setSearchParams(s==='all'?{}:{status:s})}
              className={`btn btn-sm ${filterStatus===s?'btn-primary':'btn-dark'}`}
              style={{ borderRadius:'var(--r-full)', textTransform:'capitalize' }}>
              {s}
            </button>
          ))}
        </div>
        {loading ? <div style={{ display:'flex', justifyContent:'center', padding:80 }}><div className="spinner" /></div>
        : jobs.length === 0 ? (
          <div className="empty-state"><div style={{ fontSize:40, opacity:.4, marginBottom:12 }}>💼</div><h3>No jobs found</h3><p>New booking requests will appear here</p></div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {jobs.map(j => (
              <div key={j.id} className="card" style={{ padding:'20px 22px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:14 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, flexWrap:'wrap' }}>
                      <h3 style={{ fontWeight:800, fontSize:16 }}>{j.service_name}</h3>
                      <span className="badge" style={{ background:SC[j.status]?.c+'20', color:SC[j.status]?.c }}>{SC[j.status]?.l}</span>
                    </div>
                    <div style={{ fontSize:13, color:'var(--subtext)', marginBottom:4 }}>👤 Customer: <strong style={{ color:'var(--text)' }}>{j.client_name}</strong></div>
                    <div style={{ fontSize:13, color:'var(--subtext)', marginBottom:4 }}>📅 {new Date(j.date).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})} · 🕐 {j.time}</div>
                    <div style={{ fontSize:13, color:'var(--subtext)' }}>📍 {j.address}</div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontSize:22, fontWeight:800, color:'var(--accent)', marginBottom:12 }}>₹{j.price}</div>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'flex-end' }}>
                      <Link to={`/jobs/${j.id}`} className="btn btn-dark btn-sm">Details</Link>
                      {j.status==='pending' && <>
                        <button className="btn btn-primary btn-sm" disabled={actionLoading===j.id+'accepted'} onClick={()=>handleAction(j.id,'accepted')}>Accept</button>
                        <button className="btn btn-danger btn-sm" disabled={actionLoading===j.id+'rejected'} onClick={()=>handleAction(j.id,'rejected')}>Reject</button>
                      </>}
                      {j.status==='accepted' && <button className="btn btn-sm" style={{ background:'rgba(29,185,84,0.1)', color:'var(--accent)', border:'1px solid rgba(29,185,84,0.2)' }} disabled={actionLoading===j.id+'completed'} onClick={()=>handleAction(j.id,'completed')}>Mark Done ✓</button>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
