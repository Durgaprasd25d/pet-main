import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add Interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const dashboardService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  getRecentAppointments: async () => {
    const response = await api.get("/appointments"); // Could add limit if supported
    return response.data;
  },

  // Pets
  getPets: async () => {
    const response = await api.get("/pets");
    return response.data;
  },
  deletePet: async (id) => {
    await api.delete(`/pets/${id}`);
  },

  // Vets
  getVets: async () => {
    const response = await api.get("/vets");
    return response.data;
  },

  // Appointments
  getAppointments: async () => {
    const response = await api.get("/appointments");
    return response.data;
  },
  cancelAppointment: async (id) => {
    await api.put(`/appointments/${id}/cancel`);
  },

  // Users
  getUsers: async () => {
    const response = await api.get("/auth/users"); // Assuming this exists or needs to be added
    return response.data;
  },

  // Adoption
  getAdoptions: async () => {
    const response = await api.get("/adoptions");
    return response.data;
  },
  deleteAdoption: async (id) => {
    await api.delete(`/adoptions/${id}`);
  },

  // Lost & Found
  getLostPets: async () => {
    const response = await api.get("/lostpets");
    return response.data;
  },
  updateLostPetStatus: async (id, status) => {
    await api.put(`/lostpets/${id}/status`, { status });
  },

  // Community
  getPosts: async () => {
    const response = await api.get("/community");
    return response.data;
  },
  deletePost: async (id) => {
    await api.delete(`/community/${id}`);
  },
};
