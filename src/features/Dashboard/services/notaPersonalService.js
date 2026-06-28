import axios from 'axios';

const API_BASE_URL = 'https://goldslot-backend.onrender.com/api';

// Crear instancia de axios con configuración
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para añadir el token en cada petición
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const notaPersonalService = {
  obtenerDelDia: async (usuarioId, fecha) => {
    const response = await apiClient.get(
      `/notas-personales/usuario/${usuarioId}/fecha/${fecha}`
    );
    return response.data;
  },

  crearNota: async (usuarioId, fecha, contenido) => {
    const response = await apiClient.post(
      `/notas-personales`,
      { usuarioId, fecha, contenido }
    );
    return response.data;
  },

  actualizarNota: async (notaId, contenido) => {
    const hoy = new Date().toISOString().split('T')[0];
    const response = await apiClient.put(
      `/notas-personales/${notaId}`,
      { usuarioId: 1, fecha: hoy, contenido }
    );
    return response.data;
  },
};