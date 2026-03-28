import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
export default function NotFound() {
  return (
    <DashboardLayout>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'70vh', textAlign:'center', padding:40 }}>
        <div>
          <div style={{ fontSize:96, fontWeight:900, color:'var(--accent)', lineHeight:1 }}>404</div>
          <h1 style={{ fontSize:24, fontWeight:800, marginTop:16, marginBottom:10 }}>Page Not Found</h1>
          <p style={{ color:'var(--subtext)', marginBottom:32 }}>This page doesn't exist.</p>
          <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
