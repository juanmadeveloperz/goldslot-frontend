import { useState } from 'react';
import ComentarioDelDia from '../components/ComentarioDelDia';
import ClasesGestion from '../components/ClasesGestion';
import AlumnosGestion from '../components/AlumnosGestion';
import Button from '@/components/ui/Button';
import { useAuth } from '@/core/hooks/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [seccion, setSeccion] = useState('clases');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">GoldSlot</h1>
            <p className="text-gray-600">Bienvenido, {user?.email}</p>
          </div>
          <Button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600"
          >
            Salir
          </Button>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Comentario del Día - Fijado */}
        <ComentarioDelDia />

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap mt-8">
          <Button
            onClick={() => setSeccion('clases')}
            className={
              seccion === 'clases'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 hover:bg-gray-500'
            }
          >
            📅 Programar Clase
          </Button>
          <Button
            onClick={() => setSeccion('alumnos')}
            className={
              seccion === 'alumnos'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 hover:bg-gray-500'
            }
          >
            👥 Alumnos
          </Button>
        </div>

        {/* Contenido dinámico */}
        {seccion === 'clases' && <ClasesGestion />}
        {seccion === 'alumnos' && <AlumnosGestion />}
      </div>
    </div>
  );
}