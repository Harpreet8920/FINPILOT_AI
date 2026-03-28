import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = {
  runLoop: async () => {
    const response = await axios.post(`${API_BASE_URL}/run-full-loop`);
    return response.data;
  },
  getHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  }
};

// This line is what matches your import in Dashboard.jsx
export default api;