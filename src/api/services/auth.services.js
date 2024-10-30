import http from '../http-common';

class AuthService {
  // Login user
  async login(credentials) {
    try {
      const response = await http.post('/auth/login', credentials);
      console.log('Login Response:', response); // Log the full response for debugging
      return response;
    } catch (error) {
      console.error('Service Error:', error.response ? error.response.data : error.message);
      throw error; // Re-throw to catch in action
    }
  }

  // Logout user
  logout() {
    return http.post('/auth/logout');
  }
}

export default new AuthService();