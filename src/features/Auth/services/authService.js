import axios from 'axios';

const API_BASE_URL = 'https://goldslot-backend.onrender.com/api';

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // { id, email, nombreEscuela, token }
  },

  register: async (email, password, name) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    email,
    password,
    nombreEscuela: name,
  });
  return response.data; // { id, email, nombreEscuela, token }
},

  logout: async () => {
    return Promise.resolve();
  },
};