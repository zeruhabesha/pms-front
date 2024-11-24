import httpCommon from '../http-common';

class TenantService {
  constructor() {
    this.baseURL = `${httpCommon.defaults.baseURL}/tenants`;
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    if (!token) {
      return this.handleError(new Error('No authentication token found'));
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  handleError(error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    const errorStatus = error.response?.status || 500;
    const errorDetails = error.response?.data?.details || {};
  
    console.error('API Error:', {
      message: errorMessage,
      status: errorStatus,
      details: errorDetails,
      stack: error.stack
    });
  
    if (errorStatus === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
  
    return {
      error: true,
      message: errorMessage,
      status: errorStatus,
      details: errorDetails
    };
  }

  validateTenantData(tenantData) {
    const requiredFields = ['tenantName', 'email'];
    const missingFields = requiredFields.filter(field => !tenantData[field]);
    
    if (missingFields.length > 0) {
      return {
        isValid: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      };
    }

    if (tenantData.email && !this.isValidEmail(tenantData.email)) {
      return {
        isValid: false,
        error: 'Invalid email format'
      };
    }

    return { isValid: true };
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  async fetchTenants(page = 1, limit = 5, searchTerm = '') {
    try {
      const response = await httpCommon.get(this.baseURL, {
        headers: this.getAuthHeader(),
        params: {
          page,
          limit,
          search: searchTerm,
        },
      });

      const { data } = response.data;
      return {
        tenants: data.tenants || [],
        totalPages: data.totalPages || 1,
        totalTenants: data.totalTenants || 0,
        currentPage: data.currentPage || page,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addTenant(tenantData) {
    // Validate tenant data before sending request
    const validation = this.validateTenantData(tenantData);
    if (!validation.isValid) {
      return this.handleError(new Error(validation.error));
    }

    try {
      // Clean and prepare the data
      const cleanedData = {
        ...tenantData,
        email: tenantData.email.toLowerCase().trim(),
        tenantName: tenantData.tenantName.trim(),
        phone: tenantData.phone?.trim() || '',
        address: tenantData.address?.trim() || '',
      };

      const response = await httpCommon.post(this.baseURL, cleanedData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      return {
        success: true,
        data: response.data,
        message: 'Tenant created successfully'
      };
    } catch (error) {
      // Check for specific error types
      if (error.code === 'ECONNABORTED') {
        return this.handleError(new Error('Request timed out. Please try again.'));
      }

      if (error.response?.status === 409) {
        return this.handleError(new Error('A tenant with this email already exists.'));
      }

      if (error.response?.status === 413) {
        return this.handleError(new Error('The data submitted is too large.'));
      }

      return this.handleError(error);
    }
  }

  

  async updateTenant(id, tenantData) {
    if (!id) {
      return this.handleError(new Error('Tenant ID is required'));
    }
  
    try {
      const response = await httpCommon.put(`${this.baseURL}/${id}`, tenantData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  

  async uploadPhoto(id, photo) {
    if (!id || !photo) {
      return this.handleError(new Error('Both tenant ID and photo are required'));
    }
  
    try {
      // Validate photo size and type
      if (photo.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Photo size must be less than 5MB');
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(photo.type)) {
        throw new Error('Only JPG, JPEG, and PNG files are allowed');
      }

      const formData = new FormData();
      formData.append('photo', photo);
  
      const response = await httpCommon.post(`${this.baseURL}/${id}/photo`, formData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('Upload progress:', percentCompleted);
        },
      });
      
      return {
        success: true,
        data: response.data,
        photoUrl: response.data?.photoUrl,
        message: 'Photo uploaded successfully'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  

  async deleteTenant(id) {
    if (!id) {
      return this.handleError(new Error('Tenant ID is required'));
    }
    
    try {
      const response = await httpCommon.delete(`${this.baseURL}/${id}`, {
        headers: this.getAuthHeader(),
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getTenantById(id) {
    if (!id) {
      return this.handleError(new Error('Tenant ID is required'));
    }

    try {
      const response = await httpCommon.get(`${this.baseURL}/${id}`, {
        headers: this.getAuthHeader(),
      });
      return {
        success: true,
        data: response.data?.data
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export default new TenantService();