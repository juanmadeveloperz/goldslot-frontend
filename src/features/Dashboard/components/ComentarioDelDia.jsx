import { useState, useEffect } from 'react';
import { useAuth } from '@/core/hooks/useAuth';
import { notaPersonalService } from '@/features/Dashboard/services/notaPersonalService';
import Button from '@/components/ui/Button';

export default function ComentarioDelDia() {
  const { user } = useAuth();
  const [nota, setNota] = useState(null);
  const [contenido, setContenido] = useState('');
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarNotaDelDia = async () => {
      try {
        const hoy = new Date().toISOString().split('T')[0];
        const data = await notaPersonalService.obtenerDelDia(user.id, hoy);
        setNota(data);
        setContenido(data.contenido);
      } catch {
        console.log('No hay nota para hoy');
        setNota(null);
        setContenido('');
      }
    };

    cargarNotaDelDia();
  }, [user?.id]);

  const guardar = async () => {
    setCargando(true);
    try {
      const hoy = new Date().toISOString().split('T')[0];
      
      if (nota?.id) {
        await notaPersonalService.actualizarNota(nota.id, contenido);
      } else {
        await notaPersonalService.crearNota(user.id, hoy, contenido);
      }
      
      const data = await notaPersonalService.obtenerDelDia(user.id, hoy);
      setNota(data);
      setEditando(false);
      
      setMensaje('✓ Guardado correctamente');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al guardar:', error);
      setMensaje('❌ Error al guardar');
      setTimeout(() => setMensaje(''), 3000);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
      <h3 className="text-lg font-bold mb-2">💬 Comentario del día</h3>
      
      {mensaje && (
        <div className="mb-2 p-2 bg-green-100 text-green-700 rounded">
          {mensaje}
        </div>
      )}
      
      {!editando ? (
        <>
          <p className="text-gray-700 mb-4 min-h-12">
            {contenido || 'No hay nota para hoy'}
          </p>
          <Button 
            onClick={() => setEditando(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Editar
          </Button>
        </>
      ) : (
        <>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows="4"
            placeholder="Escribe tu nota..."
          />
          <div className="flex gap-2">
            <Button 
              onClick={guardar}
              disabled={cargando}
              className="bg-green-500 hover:bg-green-600"
            >
              {cargando ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button 
              onClick={() => setEditando(false)}
              className="bg-gray-400 hover:bg-gray-500"
            >
              Cancelar
            </Button>
          </div>
        </>
      )}
    </div>
  );
}