import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      theme: 'light',
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTheme: (theme) => set({ theme }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'pet-care-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: (state) => {
        console.log('Hydration starting');
        return (state, error) => {
          if (error) {
            console.log('An error happened during hydration', error);
          } else {
            console.log('Hydration finished');
          }
        };
      },
    }
  )
);

