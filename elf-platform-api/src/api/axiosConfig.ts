import axios from 'axios';

const api = axios.create({
  // Use the Vite environment variable we set in Render
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add a request interceptor to attach JWT tokens automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;