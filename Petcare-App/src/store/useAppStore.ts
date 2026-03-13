import { create } from 'zustand';
import { User } from '../types';

interface AppState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  setAuth: (user: User, token: string) => void;
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  theme: 'light',
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setTheme: (theme) => set({ theme }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

