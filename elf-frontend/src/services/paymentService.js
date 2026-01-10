import axios from 'axios';

const API_URL = 'http://localhost:3000/payments';

export const initiateDonation = async (donationData) => {
  // donationData = { amount: 50000, provider: 'MTN', message: 'Good luck!' }
  const response = await axios.post(`${API_URL}/donation`, donationData);
  return response.data;
};

export const initiateSubscription = async (planId) => {
  const response = await axios.post(`${API_URL}/subscription`, { planId });
  return response.data;
};