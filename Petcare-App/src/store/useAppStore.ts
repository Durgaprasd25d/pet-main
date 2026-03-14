import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AppState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  biometricEnabled: boolean;
  isAppLocked: boolean;
  hasHydrated: boolean;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setBiometricEnabled: (val: boolean) => void;
  setAppLocked: (val: boolean) => void;
  setHasHydrated: (val: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      theme: 'light',
      hasHydrated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTheme: (theme) => set({ theme }),
      setHasHydrated: (val) => set({ hasHydrated: val }),
      biometricEnabled: false,
      isAppLocked: false,
      setBiometricEnabled: (val) => set({ biometricEnabled: val }),
      setAppLocked: (val) => set({ isAppLocked: val }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, isAppLocked: false }),
    }),
    {
      name: 'pet-care-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        biometricEnabled: state.biometricEnabled,
        hasHydrated: state.hasHydrated,
      }),
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (!error && state) {
            state.setHasHydrated(true);
          }
        };
      },
    }
  )
);

