
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

const httpCommon = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to automatically attach token from localStorage
httpCommon.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Check if the token exists and is valid.
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpCommon;

