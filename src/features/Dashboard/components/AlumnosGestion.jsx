import { useState, useEffect } from 'react';
import { useAuth } from '@/core/hooks/useAuth';
import { alumnoService } from '@/features/Dashboard/services/alumnoService';
import Button from '@/components/ui/Button';

export default function AlumnosGestion() {
  const { user } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [mostrando, setMostrando] = useState('lista');
  const [formData, setFormData] = useState({
    nombre: '',
    tipoLicencia: 'B',
  });
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const cargarAlumnos = async () => {
    if (!user?.id) return;
    try {
      const data = await alumnoService.obtenerTodos();
      setAlumnos(data.filter(a => a.usuarioId === user.id));
    } catch (error) {
      console.error('Error al cargar alumnos:', error);
    }
  };

  useEffect(() => {
  if (!user?.id) return;

  const cargar = async () => {
    try {
      const data = await alumnoService.obtenerTodos();
      setAlumnos(data.filter(a => a.usuarioId === user.id));
    } catch (error) {
      console.error('Error al cargar alumnos:', error);
    }
  };

  cargar();
}, [user?.id]);

  const guardar = async () => {
    if (!formData.nombre || !formData.tipoLicencia) {
      setMensaje('Completa todos los campos');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    setCargando(true);
    try {
      if (editandoId) {
        await alumnoService.actualizarAlumno(
          editandoId,
          formData.nombre,
          formData.tipoLicencia
        );
      } else {
        await alumnoService.crearAlumno(
          user.id,
          formData.nombre,
          formData.tipoLicencia
        );
      }

      await cargarAlumnos();
      resetForm();
      setMensaje(editandoId ? '✓ Alumno actualizado' : '✓ Alumno creado');
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
    if (!confirm('¿Eliminar alumno?')) return;
    try {
      await alumnoService.eliminarAlumno(id);
      await cargarAlumnos();
      setMensaje('✓ Alumno eliminado');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al eliminar:', error);
      setMensaje('❌ Error al eliminar');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const editar = (alumno) => {
    setEditandoId(alumno.id);
    setFormData({
      nombre: alumno.nombre,
      tipoLicencia: alumno.tipoLicencia,
    });
    setMostrando('form');
  };

  const resetForm = () => {
    setEditandoId(null);
    setFormData({ nombre: '', tipoLicencia: 'B' });
    setMostrando('lista');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <h3 className="text-xl font-bold mb-4">👥 Mis Alumnos</h3>

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
            + Nuevo Alumno
          </Button>

          {alumnos.length === 0 ? (
            <p className="text-gray-500">No hay alumnos registrados</p>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Nombre</th>
                      <th className="p-2 text-left">Licencia</th>
                      <th className="p-2 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnos.map((alumno) => (
                      <tr key={alumno.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{alumno.nombre}</td>
                        <td className="p-2">{alumno.tipoLicencia}</td>
                        <td className="p-2 flex gap-2">
                          <Button
                            onClick={() => editar(alumno)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-xs px-2 py-1"
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() => eliminar(alumno.id)}
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

              {/* Mobile */}
              <div className="sm:hidden space-y-4">
                {alumnos.map((alumno) => (
                  <div key={alumno.id} className="bg-gray-50 p-4 rounded-lg border">
                    <p className="font-bold text-lg mb-2">{alumno.nombre}</p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Licencia:</strong> {alumno.tipoLicencia}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => editar(alumno)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-xs px-3 py-1 flex-1"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => eliminar(alumno.id)}
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
          <input
            type="text"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={formData.tipoLicencia}
            onChange={(e) =>
              setFormData({ ...formData, tipoLicencia: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          >
            <option value="B">B - Coche</option>
            <option value="C">C - Camión</option>
            <option value="A">A - Moto</option>
          </select>
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