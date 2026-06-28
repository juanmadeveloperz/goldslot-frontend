import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const classService = {
  getAll: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/classes`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data;
  },

  getById: async (id, token) => {
    const response = await axios.get(`${API_BASE_URL}/classes/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data;
  },

  create: async (classData, token) => {
    const response = await axios.post(`${API_BASE_URL}/classes`, classData, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data;
  },

  update: async (id, classData, token) => {
    const response = await axios.put(`${API_BASE_URL}/classes/${id}`, classData, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data;
  },

  delete: async (id, token) => {
    const response = await axios.delete(`${API_BASE_URL}/classes/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data;
  },
};