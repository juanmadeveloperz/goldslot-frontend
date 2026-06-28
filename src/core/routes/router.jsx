import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@/features/Auth/pages/Login';
import Register from '@/features/Auth/pages/Register';
import Dashboard from '@/features/Dashboard/pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export default router;