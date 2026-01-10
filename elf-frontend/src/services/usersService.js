import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const getUsers = async (role) => {
  const response = await axios.get(API_URL, { params: { role } });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};