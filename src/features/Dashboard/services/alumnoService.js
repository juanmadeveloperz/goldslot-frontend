import axios from 'axios';

const API_BASE_URL = 'https://goldslot-backend.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const alumnoService = {
  obtenerTodos: async () => {
    const response = await apiClient.get(`/alumnos`);
    return response.data;
  },

  crearAlumno: async (nombre, tipoLicencia) => {
     const usuarioId = localStorage.getItem('usuarioId');
     const response = await apiClient.post(`/alumnos`, {
       usuarioId,
       nombre,
       tipoLicencia,
     });
     return response.data;
   },

  actualizarAlumno: async (alumnoId, nombre, tipoLicencia) => {
    const response = await apiClient.put(`/alumnos/${alumnoId}`, {
      nombre,
      tipoLicencia,
    });
    return response.data;
  },

  eliminarAlumno: async (alumnoId) => {
    await apiClient.delete(`/alumnos/${alumnoId}`);
  },
};