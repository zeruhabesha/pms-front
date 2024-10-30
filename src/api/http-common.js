// import axios from 'axios'

// export default axios.create({
//   baseURL: 'http://localhost:4000/api/v1',
//   //   baseURL: 'http://localhost:4000/api/v1',
//   headers: {
//     'Content-type': 'application/json',
//   },
// })
// // src/api/http-common.js
// http-common.js
// http-common.js
// src/api/http-common.js
// src/api/http-common.js
// src/api/http-common.js
// src/api/http-common.js
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
  const token = localStorage.getItem('authToken'); // Ensure token key matches your local storage key
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Attach token as Bearer token
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpCommon;

