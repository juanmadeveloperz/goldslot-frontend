import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/features/Auth/stores/authStore';

const API_BASE_URL = 'https://goldslot-backend.onrender.com/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuthStore();

  const request = async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const config = {
        method,
        url: `${API_BASE_URL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      };

      if (data) config.data = data;

      const response = await axios(config);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la solicitud');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    get: (endpoint) => request('GET', endpoint),
    post: (endpoint, data) => request('POST', endpoint, data),
    put: (endpoint, data) => request('PUT', endpoint, data),
    delete: (endpoint) => request('DELETE', endpoint),
    loading,
    error,
  };
};