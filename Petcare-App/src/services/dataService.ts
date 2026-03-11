import data from '../mock/data.json';
import { User, Pet, Appointment, Vet, Adoption, Post, LostAndFound } from '../types';

// Simulate network delay
const delay = (ms: number = 500) => new Promise<void>(resolve => setTimeout(() => resolve(), ms));

export const dataService = {
  getUsers: async (): Promise<User[]> => {
    await delay();
    return data.users;
  },
  getUserById: async (id: string): Promise<User | undefined> => {
    await delay();
    return data.users.find(u => u.id === id);
  },
  getPets: async (): Promise<Pet[]> => {
    await delay();
    return data.pets;
  },
  getPetById: async (id: string): Promise<Pet | undefined> => {
    await delay();
    return data.pets.find(p => p.id === id);
  },
  getAppointments: async (): Promise<Appointment[]> => {
    await delay();
    return data.appointments as Appointment[];
  },
  getVets: async (): Promise<Vet[]> => {
    await delay();
    return data.vets;
  },
  getAdoptions: async (): Promise<Adoption[]> => {
    await delay();
    return data.adoptions;
  },
  getPosts: async (): Promise<Post[]> => {
    await delay();
    return data.posts;
  },
  getLostAndFound: async (): Promise<LostAndFound[]> => {
    await delay();
    return data.lostAndFound as LostAndFound[];
  }
};
