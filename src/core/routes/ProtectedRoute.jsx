import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/Auth/stores/authStore';

export default function ProtectedRoute({ children }) {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/" />;
}