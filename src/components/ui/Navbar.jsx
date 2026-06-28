import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/hooks/useAuth';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-blue-600">GoldSlot</h1>
          <div className="hidden md:flex gap-6">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="/classes" className="text-gray-600 hover:text-gray-900">Clases</a>
            <a href="/students" className="text-gray-600 hover:text-gray-900">Alumnos</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 hidden sm:inline">{user?.name}</span>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-sm">
            Salir
          </Button>
        </div>
      </div>
    </nav>
  );
}