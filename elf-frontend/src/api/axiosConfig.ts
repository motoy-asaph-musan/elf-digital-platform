import axios from 'axios';

const api = axios.create({
  // Vite uses import.meta.env for frontend variables
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    // Check if window is defined (prevents errors during builds)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;