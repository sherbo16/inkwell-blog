import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="py-20 text-center text-slate-500">Loading your studio...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
