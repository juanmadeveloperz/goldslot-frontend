import { useState, useEffect } from 'react';
import { useAuth } from '@/core/hooks/useAuth';
import { lessonService } from '@/features/Dashboard/services/lessonService';
import Button from '@/components/ui/Button';
import { alumnoService } from '@/features/Dashboard/services/alumnoService';

export default function ClasesGestion() {
  const { user } = useAuth();
  const [clases, setClases] = useState([]);
  const [mostrando, setMostrando] = useState('lista');
  const [formData, setFormData] = useState({
    alumnoId: '',
    fecha: '',
    descripcion: '',
  });
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
  const cargarAlumnos = async () => {
    try {
      const data = await alumnoService.obtenerTodos();
      setAlumnos(data);
    } catch (error) {
      console.error('Error al cargar alumnos:', error);
    }
  };
  cargarAlumnos();
}, [mostrando, user?.id]);

  const cargarClases = async () => {
    if (!user?.id) return;
    try {
      const data = await lessonService.obtenerPorUsuario(user.id);
      setClases(data);
    } catch (error) {
      console.error('Error al cargar clases:', error);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    const cargar = async () => {
      try {
        const data = await lessonService.obtenerPorUsuario(user.id);
        setClases(data);
      } catch (error) {
        console.error('Error al cargar clases:', error);
      }
    };

    cargar();
  }, [user?.id]);

  const guardar = async () => {
    if (!formData.alumnoId || !formData.fecha) {
      setMensaje('Completa todos los campos');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    setCargando(true);
    try {
      if (editandoId) {
        await lessonService.actualizarLesson(
          editandoId,
          formData.fecha,
          formData.descripcion
        );
      } else {
        await lessonService.crearLesson(
          user.id,
          formData.alumnoId,
          formData.fecha,
          formData.descripcion
        );
      }

      await cargarClases();
      resetForm();
      setMensaje(editandoId ? '✓ Clase actualizada' : '✓ Clase creada');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al guardar:', error);
      setMensaje('❌ Error al guardar');
      setTimeout(() => setMensaje(''), 3000);
    } finally {
      setCargando(false);
    }
  };

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar clase?')) return;
    try {
      await lessonService.eliminarLesson(id);
      await cargarClases();
      setMensaje('✓ Clase eliminada');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al eliminar:', error);
      setMensaje('❌ Error al eliminar');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const editar = (clase) => {
    setEditandoId(clase.id);
    setFormData({
      alumnoId: clase.alumnoId,
      fecha: clase.fecha,
      descripcion: clase.descripcion,
    });
    setMostrando('form');
  };

  const resetForm = () => {
    setEditandoId(null);
    setFormData({ alumnoId: '', fecha: '', descripcion: '' });
    setMostrando('lista');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <h3 className="text-xl font-bold mb-4">📅 Programar Clase</h3>

      {mensaje && (
        <div className="mb-2 p-2 bg-green-100 text-green-700 rounded">
          {mensaje}
        </div>
      )}

      {mostrando === 'lista' ? (
        <>
          <Button
            onClick={() => setMostrando('form')}
            className="bg-blue-500 hover:bg-blue-600 mb-4 w-full sm:w-auto"
          >
            + Nueva Clase
          </Button>

          {clases.length === 0 ? (
            <p className="text-gray-500">No hay clases registradas</p>
          ) : (
            <>
              {/* Desktop: Tabla */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Alumno</th>
                      <th className="p-2 text-left">Fecha</th>
                      <th className="p-2 text-left">Descripción</th>
                      <th className="p-2 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clases.map((clase) => (
                      <tr key={clase.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          {alumnos.find(a => a.id === clase.alumnoId)?.nombre || 'Desconocido'}
                        </td>
                        <td className="p-2">{new Date(clase.fecha).toLocaleString()}</td>
                        <td className="p-2">{clase.descripcion}</td>
                        <td className="p-2 flex gap-2">
                          <Button
                            onClick={() => editar(clase)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-xs px-2 py-1"
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() => eliminar(clase.id)}
                            className="bg-red-500 hover:bg-red-600 text-xs px-2 py-1"
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile: Cards */}
              <div className="sm:hidden space-y-4">
                {clases.map((clase) => (
                  <div key={clase.id} className="bg-gray-50 p-4 rounded-lg border">
                    <p className="font-bold text-lg mb-2">
                      {alumnos.find(a => a.id === clase.alumnoId)?.nombre || 'Desconocido'}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Fecha:</strong> {new Date(clase.fecha).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Descripción:</strong> {clase.descripcion}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => editar(clase)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-xs px-3 py-1 flex-1"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => eliminar(clase.id)}
                        className="bg-red-500 hover:bg-red-600 text-xs px-3 py-1 flex-1"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <label className="block text-sm font-bold mb-1">Alumno</label>
          <select
            value={formData.alumnoId}
            onChange={(e) =>
              setFormData({ ...formData, alumnoId: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Selecciona un alumno</option>
            {alumnos.map(a => (
              <option key={a.id} value={a.id}>{a.nombre}</option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={formData.fecha}
            onChange={(e) =>
              setFormData({ ...formData, fecha: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
            rows="3"
          />
          <div className="flex gap-2">
            <Button
              onClick={guardar}
              disabled={cargando}
              className="bg-green-500 hover:bg-green-600 flex-1"
            >
              {cargando ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 flex-1"
            >
              Cancelar
            </Button>
          </div>
        </>
      )}
    </div>
  );
}