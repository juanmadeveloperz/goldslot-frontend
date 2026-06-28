import { useAuthStore } from '@/features/Auth/stores/authStore';

export const useAuth = () => {
  const { user, login, logout } = useAuthStore();
  return { user, login, logout };
};