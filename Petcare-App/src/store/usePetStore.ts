import { create } from 'zustand';
import { Pet } from '../types';
import { dataService } from '../services/dataService';

interface PetState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  fetchPets: (token: string) => Promise<void>;
  addPet: (petData: Partial<Pet>, token: string) => Promise<void>;
  updatePet: (id: string, petData: Partial<Pet>, token: string) => Promise<void>;
  deletePet: (id: string, token: string) => Promise<void>;
}

export const usePetStore = create<PetState>((set, get) => ({
  pets: [],
  loading: false,
  error: null,
  fetchPets: async (token) => {
    set({ loading: true, error: null });
    try {
      const pets = await dataService.getPets(token);
      set({ pets, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  addPet: async (petData, token) => {
    set({ loading: true, error: null });
    try {
      const newPet = await dataService.addPet(petData, token);
      set({ pets: [newPet, ...get().pets], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  updatePet: async (id, petData, token) => {
    set({ loading: true, error: null });
    try {
      const updatedPet = await dataService.updatePet(id, petData, token);
      set({
        pets: get().pets.map((p) => (p.id === id ? updatedPet : p)),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  deletePet: async (id, token) => {
    set({ loading: true, error: null });
    try {
      await dataService.deletePet(id, token);
      set({
        pets: get().pets.filter((p) => p.id !== id),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
