import data from '../mock/data.json';
import { User, Pet, Appointment, Vet, Adoption, Post, LostAndFound } from '../types';

import { API_URL as ENV_API_URL } from '@env';

const API_URL = ENV_API_URL || 'http://10.78.10.236:5000/api';
console.log('[DataService] Using API_URL:', API_URL);




export const dataService = {
  // Auth
  login: async (credentials: any): Promise<any> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },
  register: async (userData: any): Promise<any> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },
  verifyOTP: async (email: string, otp: string): Promise<any> => {
    const response = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    return response.json();
  },
  resendOTP: async (email: string): Promise<any> => {
    const response = await fetch(`${API_URL}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  },


  // Pets
  getPets: async (token: string): Promise<Pet[]> => {
    const response = await fetch(`${API_URL}/pets`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const pets = await response.json();
    return pets.map((p: any) => ({ ...p, id: p._id }));
  },
  getPetById: async (id: string, token: string): Promise<Pet> => {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const pet = await response.json();
    return { ...pet, id: pet._id };
  },
  addPet: async (petData: any, token: string): Promise<Pet> => {
    const response = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(petData)
    });
    return response.json();
  },
  updatePet: async (id: string, petData: any, token: string): Promise<Pet> => {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(petData)
    });
    return response.json();
  },
  deletePet: async (id: string, token: string): Promise<void> => {
    await fetch(`${API_URL}/pets/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Vets
  getVets: async (): Promise<Vet[]> => {
    const response = await fetch(`${API_URL}/vets`);
    const vets = await response.json();
    return vets.map((v: any) => ({ ...v, id: v._id }));
  },
  getVetById: async (id: string): Promise<Vet> => {
    const response = await fetch(`${API_URL}/vets/${id}`);
    const vet = await response.json();
    return { ...vet, id: vet._id };
  },

  // Appointments
  getAppointments: async (token: string): Promise<Appointment[]> => {
    const response = await fetch(`${API_URL}/appointments`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  bookAppointment: async (appointmentData: any, token: string): Promise<Appointment> => {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(appointmentData)
    });
    return response.json();
  },
  cancelAppointment: async (id: string, token: string): Promise<void> => {
    await fetch(`${API_URL}/appointments/${id}/cancel`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },


  // Adoption (Phase 2)
  getAdoptions: async (): Promise<Adoption[]> => {
    const response = await fetch(`${API_URL}/adoptions`);
    const adoptions = await response.json();
    return adoptions.map((a: any) => ({ ...a, id: a._id }));
  },
  applyForAdoption: async (id: string, message: string, token: string): Promise<any> => {
    const response = await fetch(`${API_URL}/adoptions/${id}/apply`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message })
    });
    return response.json();
  },

  // Community (Phase 2)
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${API_URL}/community`);
    const posts = await response.json();
    return posts.map((p: any) => ({ ...p, id: p._id }));
  },
  createPost: async (postData: any, token: string): Promise<Post> => {
    const response = await fetch(`${API_URL}/community`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    return response.json();
  },
  addComment: async (postId: string, text: string, token: string): Promise<any> => {
    const response = await fetch(`${API_URL}/community/${postId}/comments`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });
    return response.json();
  },

  // Lost & Found (Phase 2)
  getLostPets: async (type?: string): Promise<LostAndFound[]> => {
    const url = type ? `${API_URL}/lostpets?type=${type}` : `${API_URL}/lostpets`;
    const response = await fetch(url);
    const results = await response.json();
    return results.map((r: any) => ({ ...r, id: r._id }));
  },
  reportLostPet: async (reportData: any, token: string): Promise<LostAndFound> => {
    const response = await fetch(`${API_URL}/lostpets`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reportData)
    });
    return response.json();
  }
};

