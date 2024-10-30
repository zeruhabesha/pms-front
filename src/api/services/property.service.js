// src/api/services/property.service.js
import httpCommon from '../http-common';

class PropertyService {
  // Get the authorization header
  getAuthHeader() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  // Fetch all properties with token
  async getAllProperties() {
    const response = await httpCommon.get('/properties', {
      headers: this.getAuthHeader(), // Attach token if needed
    });
    console.log("API Response Data:", response.data); // Check if response.data is an array
    return response.data; // Adjust as needed if response structure differs
  }
  
  // Fetch a single property by ID with token
  async getPropertyById(id) {
    const response = await httpCommon.get(`/properties/${id}`, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  }

  // Create a new property with token and multipart form data
  async createProperty(propertyData) {
    const formData = new FormData();
    Object.keys(propertyData).forEach((key) => {
      if (key === 'photos') {
        propertyData[key].forEach((file) => formData.append('photos', file));
      } else {
        formData.append(key, propertyData[key]);
      }
    });

    const response = await httpCommon.post('/properties', formData, {
      headers: {
        ...this.getAuthHeader(),
        'Content-Type': 'multipart/form-data', // Only needed for multipart requests
      },
    });
    return response.data;
  }

  // Update an existing property by ID with token
  async updateProperty(id, propertyData) {
    const response = await httpCommon.put(`/properties/${id}`, propertyData, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  }

  // Delete a property by ID with token
  async deleteProperty(id) {
    const response = await httpCommon.delete(`/properties/${id}`, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  }
}

export default new PropertyService();
