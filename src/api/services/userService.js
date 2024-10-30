// import httpCommon from '../http-common';

// class UserService {
//   constructor() {
//     this.baseURL = `${httpCommon.defaults.baseURL}/users/user`;
//   }

//   getAuthHeader() {
//     const token = localStorage.getItem('token');
//     return {
//       Authorization: `Bearer ${token}`,
//     };
//   }

//   getUsers(page, limit, search) {
//     return httpCommon.get(`${this.baseURL}?page=${page}&limit=${limit}&search=${search}`, {
//       headers: this.getAuthHeader(),
//     });
//   }

//   addUser(userData) {
//     return httpCommon.post(this.baseURL, userData, {
//       headers: this.getAuthHeader(),
//     });
//   }

//   deleteUser(id) {
//     return httpCommon.delete(`${this.baseURL}/${id}`, {
//       headers: this.getAuthHeader(),
//     });
//   }

//   updateUser(id, userData) {
//     return httpCommon.put(`${this.baseURL}/${id}`, userData, {
//       headers: this.getAuthHeader(),
//     });
//   }
// }

// export default new UserService();


import axios from 'axios';
import httpCommon from '../http-common';
import AuthService from './auth.services'; // Import AuthService here

class SuperUser {
  constructor() {
    this.baseURL = `${httpCommon.defaults.baseURL}/users`; // Use httpCommon.defaults.baseURL
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getUsers(page = 1, limit = 5, searchTerm = '') {
    try {
      const response = await httpCommon.get(`/users/user`, {
        headers: this.getAuthHeader(),
        params: { page, limit, search: searchTerm },
      });
      return {
        users: response.data?.data?.users || [],
        totalPages: response.data?.data?.totalPages || 1,
        totalUsers: response.data?.data?.totalUsers || 0,
        currentPage: response.data?.data?.currentPage || page,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async addUser(superAdminData) {
    try {
      // Check if user is authenticated
      // if (!AuthService.isAuthenticated()) {
      //   throw {
      //     message: 'Not authenticated',
      //     status: 401,
      //     isAuthError: true,
      //   };
      // }
    
      
      // Make the API call to add Super Admin
      const response = await httpCommon.post('/users/user', superAdminData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      })
      return response.data?.data;
    } catch (error) {
      // Throw an error with meaningful message and status
      throw {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status || 500,
        isAuthError: error.response?.status === 401,
      };
    }
  }

  async updateUser(id, superAdminData) {
    if (!superAdminData) {
      throw new Error("No data provided for update");
    }
  
    try {
      const payload = {
        name: superAdminData.name,
        email: superAdminData.email,
        phoneNumber: superAdminData.phoneNumber,
        status: superAdminData.status || 'active',
      };
  
      const response = await httpCommon.put(`/users/${id}`, payload, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.data) {
        throw new Error('No data received from server');
      }
  
      return response.data?.data;
    } catch (error) {
      console.error('SuperAdmin Update Error:', error.response?.data || error);
      throw this.handleError(error);
    }
  }

  async uploadUserPhoto(id, photoFile) {
    try {
      const formData = new FormData();
      formData.append('photo', photoFile);

      const response = await httpCommon.post(`/users/${id}/photo`, formData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data?.photoUrl;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }

  async deleteUser(id) {
    try {
      await httpCommon.delete(`/users/${id}`, {
        headers: this.getAuthHeader(),
      });
      return id;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }
}

export default new SuperUser();
