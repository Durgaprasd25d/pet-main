import { create } from 'zustand';
import { Vet } from '../types';
import { dataService } from '../services/dataService';

interface VetState {
  vets: Vet[];
  loading: boolean;
  error: string | null;
  fetchVets: () => Promise<void>;
}

export const useVetStore = create<VetState>((set) => ({
  vets: [],
  loading: false,
  error: null,
  fetchVets: async () => {
    set({ loading: true, error: null });
    try {
      const vets = await dataService.getVets();
      set({ vets, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
