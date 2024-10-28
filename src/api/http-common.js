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
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

const httpCommon = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor for error handling
httpCommon.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default httpCommon;


