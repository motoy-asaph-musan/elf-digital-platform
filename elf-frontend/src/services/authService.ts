import axios from 'axios';

// Define types for better developer experience
interface RegisterData {
  name: string;
  email: string;    // Added Email
  phone: string;
  password: string;
  role: 'STUDENT' | 'TEACHER';
  schoolCode?: string;
}

// Check if we have an environment variable, otherwise fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// 1. Standard Registration (Updated for Email)
export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    // Return specific backend error message if it exists
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// 2. Standard Login
export const loginUser = async (credentials: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_profile', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// 3. Fetch Profile
export const fetchUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.setItem('user_profile', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user_profile');
    return null;
  }
};

// 4. Social Logins
export const handleSocialLogin = (provider: string) => {
  window.location.href = `${API_URL}/auth/${provider}`;
};

// 5. Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_profile');
  window.location.href = '/login';
};