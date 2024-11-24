import axios from 'axios';
import httpCommon from '../http-common';

class MaintenanceService {
  constructor() {
    this.baseURL = `${httpCommon.defaults.baseURL}/maintenances`;
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchMaintenance(page = 1, limit = 5, searchTerm = '') {
    try {
      const response = await httpCommon.get('/maintenances', {
        headers: this.getAuthHeader(),
        params: {
          page,
          limit,
          search: searchTerm,
        },
      });
      
      const { data, metadata } = response.data;
      return {
        maintenanceRecords: data || [],
        totalPages: metadata?.totalPages || 1,
        totalRecords: metadata?.totalRecords || 0,
        currentPage: metadata?.currentPage || page,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }
  

  async addMaintenance(maintenanceData) {
    try {
      const response = await httpCommon.post('/maintenances', maintenanceData, {
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

  async updateMaintenance(id, maintenanceData) {
    if (!maintenanceData) {
      throw new Error('No data provided for update');
    }

    try {
      const payload = {
        tenant: maintenanceData.tenant,
        property: maintenanceData.property,
        typeOfRequest: maintenanceData.typeOfRequest,
        description: maintenanceData.description,
        urgencyLevel: maintenanceData.urgencyLevel,
        status: maintenanceData.status || 'Pending',
      };

      const response = await httpCommon.put(`/maintenances/${id}`, payload, {
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
      throw this.handleError(error);
    }
  }

  async uploadMaintenanceMedia(id, mediaFile) {
    try {
      const formData = new FormData();
      formData.append('media', mediaFile);

      const response = await httpCommon.post(`/maintenances/${id}/media`, formData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data?.mediaUrl;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteMaintenance(id) {
    try {
      await httpCommon.delete(`/maintenances/${id}`, {
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
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }
}

export default new MaintenanceService();
