import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', 
});

export const runLoop = async () => {
  const response = await API.post('/run-full-loop');
  return response.data;
};

export const getHistory = async () => {
  const response = await API.get('/history');
  return response.data;
};