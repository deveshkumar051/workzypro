import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const Loader = () => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#121212', flexDirection:'column', gap:20 }}>
    <img src="/logo/BrandmarkLogo.png" alt="Workzy" style={{ width:44, height:44, objectFit:'contain', opacity:.8 }} />
    <div style={{ width:32, height:32, border:'2px solid rgba(255,255,255,0.1)', borderTopColor:'#1DB954', borderRadius:'50%', animation:'spin .65s linear infinite' }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};
export const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};
