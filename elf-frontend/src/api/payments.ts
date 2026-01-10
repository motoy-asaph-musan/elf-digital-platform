import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

// Adding an interceptor to automatically include the token if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const donate = (data: { amount: number; provider: string }) => 
  API.post('/payments/donate', data);

export const subscribe = (data: { amount: number; provider: string; plan: string }) => 
  API.post('/payments/subscribe', data);