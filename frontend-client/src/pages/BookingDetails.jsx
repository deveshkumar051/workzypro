import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const SC = { pending:{c:'var(--gold)',l:'Pending'}, accepted:{c:'var(--blue)',l:'Accepted'}, completed:{c:'var(--green)',l:'Completed'}, cancelled:{c:'var(--red)',l:'Cancelled'}, rejected:{c:'var(--red)',l:'Rejected'} };

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display:'flex', gap:4 }}>
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button" onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)} onClick={() => onChange(s)}
          style={{ fontSize:32, background:'none', border:'none', cursor:'none', color: s<=(hovered||value) ? 'var(--gold)' : 'var(--border)', transition:'color 0.1s' }}>★</button>
      ))}
    </div>
  );
}

export default function BookingDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [review, setReview] = useState({ rating:0, comment:'' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');

  useEffect(() => { api.get('/bookings/'+id).then(res => setBooking(res.data.data)).catch(() => navigate('/bookings')).finally(() => setLoading(false)); }, [id]);

  const handleCancel = async () => {
    if (!confirm('Cancel this booking?')) return;
    setCancelling(true);
    try { await api.patch('/bookings/'+id+'/cancel'); setBooking(p => ({...p,status:'cancelled'})); }
    catch (err) { alert(err.response?.data?.message || 'Could not cancel.'); } finally { setCancelling(false); }
  };

  const submitReview = async e => {
    e.preventDefault();
    if (!review.rating) return setReviewError('Please select a rating.');
    setReviewError(''); setReviewLoading(true);
    try { await api.post('/reviews', { booking_id:parseInt(id), ...review }); setReviewSubmitted(true); }
    catch (err) { setReviewError(err.response?.data?.message || 'Failed to submit.'); } finally { setReviewLoading(false); }
  };

  if (loading) return <MainLayout><div style={{ display:'flex', justifyContent:'center', padding:100 }}><div className="spinner" /></div></MainLayout>;
  if (!booking) return null;
  const sc = SC[booking.status] || SC.pending;
  const isClient = user?.role === 'client';
  const statuses = ['pending','accepted','completed'];

  return (
    <MainLayout>
      <div style={{ background:'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))', borderBottom:'1px solid var(--border)', padding:'56px 0 40px' }}>
        <div className="container">
          <Link to="/bookings" style={{ color:'var(--subtext)', fontSize:13 }}>← Back to bookings</Link>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:12 }}>
            <h1 style={{ fontFamily:"inherit,sans-serif", fontSize:'clamp(22px,4vw,36px)', fontWeight:800, color:'var(--text)', letterSpacing:'-1px' }}>Booking #{booking.id}</h1>
            <span className="badge" style={{ background:sc.c+'18', color:sc.c, border:`1px solid ${sc.c}33` }}>{sc.l}</span>
          </div>
        </div>
      </div>
      <div className="container" style={{ padding:'40px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:24, alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div className="card reveal">
              <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:17, marginBottom:20, color:'var(--text)' }}>Service Details</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px 24px' }}>
                {[['Service',booking.service_name],['Date',new Date(booking.date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})],['Time',booking.time],['Payment',booking.payment_method==='online'?'Online Payment':'Cash on Delivery']].map(([l,v]) => (
                  <div key={l}><div style={{ fontSize:11, color:'var(--subtext)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>{l}</div><div style={{ fontWeight:600, color:'var(--text)' }}>{v}</div></div>
                ))}
                <div style={{ gridColumn:'1/-1' }}><div style={{ fontSize:11, color:'var(--subtext)', fontWeight:700, textTransform:'uppercase', marginBottom:4 }}>Address</div><div style={{ fontWeight:500, color:'var(--text)' }}>📍 {booking.address}</div></div>
              </div>
            </div>
            <div className="card reveal">
              <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:17, marginBottom:16, color:'var(--text)' }}>People</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                {[{label:'Client',name:booking.client_name,mobile:booking.client_mobile},{label:'Helper',name:booking.helper_name,mobile:booking.helper_mobile}].map(({ label, name, mobile }) => (
                  <div key={label} style={{ padding:16, background:'var(--surface)', borderRadius:'var(--r-sm)', border:'1px solid var(--border)' }}>
                    <div style={{ fontSize:11, color:'var(--subtext)', fontWeight:700, textTransform:'uppercase', marginBottom:10 }}>{label}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent-dim), rgba(139,92,246,0.12))', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'var(--accent)', flexShrink:0 }}>{name?.[0]}</div>
                      <div><div style={{ fontWeight:700, color:'var(--text)', fontSize:14 }}>{name}</div><div style={{ fontSize:12, color:'var(--subtext)' }}>📞 {mobile}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card reveal">
              <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:17, marginBottom:20, color:'var(--text)' }}>Status Timeline</h2>
              {statuses.map((s,i) => {
                const curIdx = statuses.indexOf(booking.status);
                const done = booking.status==='completed' ? true : curIdx > i;
                const cur = booking.status === s;
                return (
                  <div key={s} style={{ display:'flex', gap:14, marginBottom: i<2 ? 14 : 0 }}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                      <div style={{ width:32, height:32, borderRadius:'50%', background: done ? 'var(--green)' : cur ? 'var(--blue)' : 'rgba(255,255,255,0.07)', border: `1px solid ${done ? 'var(--green)' : cur ? 'var(--blue)' : 'var(--border)'}`, color: done||cur ? '#fff' : 'var(--subtext)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, boxShadow: done ? '0 0 10px rgba(16,185,129,0.3)' : cur ? '0 0 10px rgba(59,130,246,0.3)' : 'none' }}>{done ? '✓' : i+1}</div>
                      {i<2 && <div style={{ width:2, height:24, background: done ? 'var(--green)' : 'var(--border)', marginTop:4, transition:'background 0.3s' }} />}
                    </div>
                    <div style={{ paddingTop:4 }}>
                      <div style={{ fontWeight:600, color: done||cur ? 'var(--text)' : 'var(--subtext)', fontSize:14 }}>{['Booking Requested','Helper Accepted','Work Completed'][i]}</div>
                      <div style={{ fontSize:12, color:'rgba(179,179,179,0.45)' }}>{['Waiting for helper to respond','Helper confirmed the booking','Service delivered successfully'][i]}</div>
                    </div>
                  </div>
                );
              })}
              {['cancelled','rejected'].includes(booking.status) && <div style={{ marginTop:12, padding:'12px 16px', background:'rgba(239,68,68,0.08)', borderRadius:'var(--r-sm)', color:'var(--red)', border:'1px solid rgba(239,68,68,0.2)', fontWeight:600 }}>Booking was {booking.status}</div>}
            </div>
            {isClient && booking.status==='completed' && !reviewSubmitted && (
              <div className="card reveal">
                <h2 style={{ fontFamily:"inherit,sans-serif", fontWeight:700, fontSize:17, marginBottom:6, color:'var(--text)' }}>Leave a Review</h2>
                <p style={{ color:'var(--subtext)', fontSize:13, marginBottom:20 }}>How was your experience with {booking.helper_name}?</p>
                {reviewError && <div className="alert alert-error">{reviewError}</div>}
                <form onSubmit={submitReview}>
                  <div className="form-group"><label className="form-label">Rating</label>
                    <StarPicker value={review.rating} onChange={r => setReview(p=>({...p,rating:r}))} />
                    {review.rating>0 && <span style={{ fontSize:12, color:'var(--subtext)', marginTop:4, display:'block' }}>{['','Poor','Fair','Good','Very Good','Excellent'][review.rating]}</span>}
                  </div>
                  <div className="form-group"><label className="form-label">Comment (optional)</label><textarea className="form-input" rows={3} placeholder="Tell others about your experience..." value={review.comment} onChange={e => setReview(p=>({...p,comment:e.target.value}))} /></div>
                  <button type="submit" className="btn btn-gold" disabled={reviewLoading}>{reviewLoading ? 'Submitting...' : 'Submit Review'}</button>
                </form>
              </div>
            )}
            {reviewSubmitted && <div className="alert alert-success">✓ Review submitted! Thank you for your feedback.</div>}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div className="card reveal">
              <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14, color:'var(--text)' }}>Price Summary</h3>
              <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}><span style={{ color:'var(--subtext)' }}>Service charge</span><span>₹{booking.price}</span></div>
              <div style={{ display:'flex', justifyContent:'space-between', padding:'14px 0 0' }}>
                <span style={{ fontWeight:700 }}>Total</span>
                <span style={{ fontFamily:"inherit,sans-serif", fontWeight:800, fontSize:22, color:'var(--accent)' }}>₹{booking.price}</span>
              </div>
              <div style={{ marginTop:10, fontSize:12, color:'rgba(179,179,179,0.45)' }}>{booking.payment_method==='online' ? 'Online payment' : 'Cash on delivery'}</div>
            </div>
            {isClient && booking.status==='pending' && (
              <button onClick={handleCancel} disabled={cancelling} className="btn btn-full reveal" style={{ background:'rgba(239,68,68,0.08)', color:'var(--red)', border:'1px solid rgba(239,68,68,0.2)', padding:'13px', borderRadius:'var(--r-md)', fontWeight:600 }}>
                {cancelling ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            )}
            <Link to="/contact" className="btn btn-dark btn-full btn-sm reveal">Contact Support</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
