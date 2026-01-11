import axios from 'axios';

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'STUDENT' | 'TEACHER';
  schoolCode?: string;
}

const BACKEND_URL = 'http://localhost:3000'; 
const API_URL = import.meta.env.VITE_API_URL || BACKEND_URL;

// 1. Standard Registration
export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// 2. Standard Login
export const loginUser = async (credentials: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.user.role); 
      localStorage.setItem('user_profile', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// 3. Fetch User (THIS WAS MISSING AND CAUSED THE WHITE PAGE)
export const fetchUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

// 4. Social Logins
export const handleSocialLogin = (provider: string) => {
  window.location.href = `${API_URL}/auth/${provider}`;
};