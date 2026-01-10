import axios from 'axios';

// Create the instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Export the function
export const getLeaderboard = async (examId: string) => {
  return api.get(`/exams/${examId}/leaderboard`);
};