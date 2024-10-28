// api/services/admin.service.js
import httpCommon from '../http-common';

class AdminService {
  constructor() {
    this.baseURL = `${httpCommon.defaults.baseURL}/users`;
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchAdmins(page = 1, limit = 5, searchTerm = '') {
    try {
      const response = await httpCommon.get(`${this.baseURL}/admin`, {
        headers: this.getAuthHeader(),
        params: { page, limit, search: searchTerm },
      });
      return response.data?.data || { users: [], totalPages: 1, totalUsers: 0, currentPage: page };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async addAdmin(adminData) {
    try {
      const response = await httpCommon.post(`${this.baseURL}/admin`, adminData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data?.data;
    } catch (error) {
      console.error('Admin Service Error:', error.response?.data || error);
      throw this.handleError(error);
    }
  }

  async updateAdmin(id, adminData) {
    try {
      const response = await httpCommon.put(`${this.baseURL}/${id}`, adminData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data?.data;
    } catch (error) {
      console.error('Admin Update Error:', error.response?.data || error);
      throw this.handleError(error);
    }
  }

  async deleteAdmin(id) {
    try {
      await httpCommon.delete(`${this.baseURL}/${id}`, {
        headers: this.getAuthHeader(),
      });
      return id;
    } catch (error) {
      console.error('Admin Delete Error:', error.response?.data || error);
      throw this.handleError(error);
    }
  }

  handleError(error) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
    };
  }
}

export default new AdminService();
