import axios from 'axios';

// The base URL of your FastAPI backend
const API_BASE_URL = 'http://localhost:8000';

const api = {
  // 1. Run the full autonomous loop
  runLoop: async () => {
    const response = await axios.post(`${API_BASE_URL}/run-full-loop`);
    return response.data;
  },

  // 2. Fetch the history of actions from logs.json
  getHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  }
};

export default api;