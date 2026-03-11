import { create } from 'zustand';
import { User } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null, // Will be set on login
  isAuthenticated: false,
  theme: 'light',
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setTheme: (theme) => set({ theme }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
