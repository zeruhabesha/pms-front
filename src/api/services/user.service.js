import axios from 'axios';
import httpCommon from '../http-common';
import AuthService from './auth.services';

class UserService {
  constructor() {
    this.baseURL = `${httpCommon.defaults.baseURL}/users`;
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in local storage');
      return {};
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchUsers(page = 1, limit = 5, searchTerm = '') {
    try {
      const response = await httpCommon.get('/users/user', {
        headers: this.getAuthHeader(),
        params: { page, limit, search: searchTerm },
      });
      const { data } = response.data;
      return {
        users: data?.users || [],
        totalPages: data?.totalPages || 1,
        totalUsers: data?.totalUsers || 0,
        currentPage: data?.currentPage || page,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async addUser(UserData) {
    try {
      const response = await httpCommon.post('/users/user', UserData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateUser(id, UserData) {
    if (!UserData) {
      throw new Error("No data provided for update");
    }
    try {
      const payload = {
        name: UserData.name,
        email: UserData.email,
        phoneNumber: UserData.phoneNumber,
        status: UserData.status || 'active',
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
      console.error('User Update Error:', error.response?.data || error);
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
    console.error('API Error:', error.response?.data || error.message);
    return {
      message: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status || 500,
    };
  }
}

export default new UserService();
