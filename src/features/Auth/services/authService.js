import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // { id, email, nombreEscuela, token }
  },

  register: async (email, password, name) => {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, {
      email,
      password,
      nombreEscuela: name,
      plan: 'free',
    });
    return { user: response.data, token: 'temp-token' };
  },

  logout: async () => {
    return Promise.resolve();
  },
};