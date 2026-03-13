import { create } from 'zustand';
import { Emergency } from '../types';
import { dataService } from '../services/dataService';

interface EmergencyState {
  emergencies: Emergency[];
  loading: boolean;
  error: string | null;
  triggerSOS: (sosData: any, token: string) => Promise<Emergency | null>;
  fetchMyEmergencies: (token: string) => Promise<void>;
}

export const useEmergencyStore = create<EmergencyState>((set) => ({
  emergencies: [],
  loading: false,
  error: null,

  triggerSOS: async (sosData, token) => {
    set({ loading: true, error: null });
    try {
      const emergency = await dataService.triggerSOS(sosData, token);
      set((state) => ({ 
        emergencies: [emergency, ...state.emergencies],
        loading: false 
      }));
      return emergency;
    } catch (error: any) {
      set({ loading: false, error: error.message });
      return null;
    }
  },

  fetchMyEmergencies: async (token) => {
    set({ loading: true, error: null });
    try {
      const emergencies = await dataService.getEmergenciesByToken(token);
      set({ emergencies, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));
