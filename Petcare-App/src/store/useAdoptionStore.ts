import { create } from 'zustand';
import { Adoption } from '../types';
import { dataService } from '../services/dataService';

interface AdoptionState {
  adoptions: Adoption[];
  loading: boolean;
  fetchAdoptions: () => Promise<void>;
  applyForAdoption: (id: string, message: string, token: string) => Promise<void>;
}

export const useAdoptionStore = create<AdoptionState>((set) => ({
  adoptions: [],
  loading: false,
  fetchAdoptions: async () => {
    set({ loading: true });
    try {
      const adoptions = await dataService.getAdoptions();
      set({ adoptions, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  applyForAdoption: async (id, message, token) => {
    await dataService.applyForAdoption(id, message, token);
  }
}));
