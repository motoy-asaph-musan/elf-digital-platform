import api from './axiosConfig'; // Adjust the path based on your folder structure

export const getLeaderboard = async (examId: string) => {
  const response = await api.get(`/exams/${examId}/leaderboard`);
  return response.data;
};