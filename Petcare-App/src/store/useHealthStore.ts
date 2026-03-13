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

export interface MedicalRecord {
  id: string;
  petId: string;
  diagnosis: string;
  medication?: string;
  notes?: string;
  documentUrl?: string;
  recordDate: string;
  vet?: string;
  clinic?: string;
}

interface HealthReview {
  _id: string;
  type: 'appointment' | 'prescription' | 'vaccination' | 'medical_record';
  date: string;
  title: string;
  subtitle?: string;
  notes?: string;
  vet?: string;
  clinic?: string;
  status?: string;
  nextDue?: string;
}

interface HealthState {
  vaccinations: Record<string, Vaccination[]>; // petId -> vaccinations
  upcomingVaccinations: Vaccination[];
  medicalRecords: Record<string, MedicalRecord[]>; // petId -> medicalRecords
  petHealthHistory: Record<string, HealthReview[]>; // petId -> aggregated health history
  loading: boolean;
  error: string | null;
  fetchVaccinations: (petId: string, token: string) => Promise<void>;
  fetchUpcomingVaccinations: (token: string) => Promise<void>;
  addVaccination: (vaccinationData: Partial<Vaccination>, token: string) => Promise<void>;
  deleteVaccination: (id: string, petId: string, token: string) => Promise<void>;
  fetchMedicalRecords: (petId: string, token: string) => Promise<void>;
  addMedicalRecord: (recordData: Partial<MedicalRecord>, token: string) => Promise<void>;
  deleteMedicalRecord: (id: string, petId: string, token: string) => Promise<void>;
  fetchPetHealthHistory: (petId: string, token: string) => Promise<void>;
}

export const useHealthStore = create<HealthState>((set, get) => ({
  vaccinations: {},
  upcomingVaccinations: [],
  medicalRecords: {},
  petHealthHistory: {},
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

  fetchUpcomingVaccinations: async (token) => {
    set({ loading: true, error: null });
    try {
      const results = await dataService.getUpcomingVaccinations(token);
      set({ upcomingVaccinations: results, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  addVaccination: async (vaccinationData, token) => {
    set({ loading: true, error: null });
    try {
      const newRecord = await dataService.addVaccination(vaccinationData, token);
      const petId = vaccinationData.petId as string;
      if (petId) {
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
  },

  deleteVaccination: async (id, petId, token) => {
    set({ loading: true, error: null });
    try {
      await dataService.deleteVaccination(id, token);
      const currentVaccs = get().vaccinations[petId] || [];
      set((state) => ({
        vaccinations: {
          ...state.vaccinations,
          [petId]: currentVaccs.filter(v => v.id !== id)
        },
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchMedicalRecords: async (petId, token) => {
    set({ loading: true, error: null });
    try {
      const results = await dataService.getMedicalRecords(petId, token);
      set((state) => ({
        medicalRecords: {
          ...state.medicalRecords,
          [petId]: results
        },
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addMedicalRecord: async (recordData, token) => {
    set({ loading: true, error: null });
    try {
      const newRecord = await dataService.addMedicalRecord(recordData, token);
      const petId = recordData.petId as string;
      if (petId) {
        const currentRecords = get().medicalRecords[petId] || [];
        set((state) => ({
          medicalRecords: {
            ...state.medicalRecords,
            [petId]: [newRecord, ...currentRecords]
          },
          loading: false
        }));
      } else {
        set({ loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteMedicalRecord: async (id, petId, token) => {
    set({ loading: true, error: null });
    try {
      await dataService.deleteMedicalRecord(id, token);
      const currentRecords = get().medicalRecords[petId] || [];
      set((state) => ({
        medicalRecords: {
          ...state.medicalRecords,
          [petId]: currentRecords.filter(r => r.id !== id)
        },
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPetHealthHistory: async (petId, token) => {
    set({ loading: true, error: null });
    try {
      const results = await dataService.getPetHealth(petId, token);
      set((state) => ({
        petHealthHistory: {
          ...state.petHealthHistory,
          [petId]: results
        },
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));
