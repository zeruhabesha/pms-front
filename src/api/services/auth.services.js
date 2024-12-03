// AuthService.js
import http from '../http-common';

class AuthService {
<<<<<<< HEAD
  // Login user
  async login(credentials) {
    try {
      const response = await http.post('/auth/login', credentials);
      console.log('Login Response:', response); // Log the full response for debugging
      return response;
    } catch (error) {
      console.error('Service Error:', error.response ? error.response.data : error.message);
      throw error; // Re-throw to catch in action
=======
  async login(credentials) {
    try {
      const response = await http.post('/auth/login', credentials);
      return response;
    } catch (error) {
      console.error('Service Error:', error.response ? error.response.data : error.message);
      throw error;
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
    }
  }

  logout() {
    return http.post('/auth/logout');
  }
}

export default new AuthService();