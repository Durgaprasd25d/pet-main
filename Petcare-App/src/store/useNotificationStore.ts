import { create } from 'zustand';
import { Notification } from '../types';
import { dataService } from '../services/dataService';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: (token: string) => Promise<void>;
  markAsRead: (id: string, token: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  fetchNotifications: async (token) => {
    set({ loading: true });
    try {
      const notifications = await dataService.getNotifications(token);
      const unreadCount = notifications.filter(n => !n.isRead).length;
      set({ notifications, unreadCount, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  markAsRead: async (id, token) => {
    try {
      await dataService.markNotificationAsRead(id, token);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
