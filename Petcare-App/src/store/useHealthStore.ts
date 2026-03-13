import { create } from 'zustand';
import { dataService } from '../services/dataService';

export interface Vaccination {
  id: string;
  petId: string;
  vaccineType: string;
  dateAdministered: string;
  nextDueDate: string;
  vetName: string;
  notes: string;
}

interface HealthState {
  vaccinations: Record<string, Vaccination[]>; // petId -> vaccinations
  loading: boolean;
  error: string | null;
  fetchVaccinations: (petId: string, token: string) => Promise<void>;
  addVaccination: (vaccinationData: Partial<Vaccination>, token: string) => Promise<void>;
}

export const useHealthStore = create<HealthState>((set, get) => ({
  vaccinations: {},
  loading: false,
  error: null,
  
  fetchVaccinations: async (petId, token) => {
    set({ loading: true, error: null });
    try {
      const results = await dataService.getVaccinations(petId, token);
      set((state) => ({
        vaccinations: {
          ...state.vaccinations,
          [petId]: results
        },
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  addVaccination: async (vaccinationData, token) => {
    set({ loading: true, error: null });
    try {
      const newRecord = await dataService.addVaccination(vaccinationData, token);
      if (newRecord.petId) {
        const petId = newRecord.petId;
        const currentVaccs = get().vaccinations[petId] || [];
        set((state) => ({
          vaccinations: {
            ...state.vaccinations,
            [petId]: [newRecord, ...currentVaccs]
          },
          loading: false
        }));
      } else {
        set({ loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));
