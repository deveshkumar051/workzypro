import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Loader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100vh', background: '#121212', flexDirection: 'column', gap: 20,
  }}>
    <img src="/logo/BrandmarkLogo.png" alt="Workzy" style={{ width: 48, height: 48, objectFit: 'contain', opacity: 0.8 }} />
    <div className="spinner" />
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
