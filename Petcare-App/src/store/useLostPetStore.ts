import { create } from 'zustand';
import { LostAndFound } from '../types';
import { dataService } from '../services/dataService';

interface LostPetState {
  reports: LostAndFound[];
  loading: boolean;
  fetchReports: (type?: string) => Promise<void>;
  reportPet: (data: any, token: string) => Promise<void>;
}

export const useLostPetStore = create<LostPetState>((set) => ({
  reports: [],
  loading: false,
  fetchReports: async (type) => {
    set({ loading: true });
    try {
      const reports = await dataService.getLostPets(type);
      set({ reports, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  reportPet: async (data, token) => {
    await dataService.reportLostPet(data, token);
  }
}));
