import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,

  login: (userData, tokenData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('token', tokenData);
  localStorage.setItem('usuarioId', userData.id); // ← AGREGA ESTO
  set({ user: userData, token: tokenData });
},

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));