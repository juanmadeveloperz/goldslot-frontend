import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

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

export const lessonService = {
  obtenerPorUsuario: async (usuarioId) => {
    const response = await apiClient.get(`/lessons/usuario/${usuarioId}`);
    return response.data;
  },

  crearLesson: async (usuarioId, alumnoId, fecha, descripcion) => {
    const response = await apiClient.post(`/lessons`, {
      usuarioId,
      alumnoId,
      fecha,
      descripcion,
    });
    return response.data;
  },

  actualizarLesson: async (lessonId, fecha, descripcion) => {
    const response = await apiClient.put(`/lessons/${lessonId}`, {
      fecha,
      descripcion,
    });
    return response.data;
  },

  eliminarLesson: async (lessonId) => {
    await apiClient.delete(`/lessons/${lessonId}`);
  },
};