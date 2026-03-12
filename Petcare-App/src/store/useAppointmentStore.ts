import { create } from 'zustand';
import { Appointment } from '../types';
import { dataService } from '../services/dataService';

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: (token: string) => Promise<void>;
  bookAppointment: (apptData: Partial<Appointment>, token: string) => Promise<void>;
  cancelAppointment: (id: string, token: string) => Promise<void>;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  loading: false,
  error: null,
  fetchAppointments: async (token) => {
    set({ loading: true, error: null });
    try {
      const appointments = await dataService.getAppointments(token);
      set({ appointments, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  bookAppointment: async (apptData, token) => {
    set({ loading: true, error: null });
    try {
      const newAppt = await dataService.bookAppointment(apptData, token);
      set({ appointments: [newAppt, ...get().appointments], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  cancelAppointment: async (id, token) => {
    set({ loading: true, error: null });
    try {
      await dataService.cancelAppointment(id, token);
      set({
        appointments: get().appointments.map((a) => 
          a.id === id ? { ...a, status: 'cancelled' } : a
        ),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
