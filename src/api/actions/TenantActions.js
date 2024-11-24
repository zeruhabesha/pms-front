// store/actions/TenantActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import TenantService from '../services/tenant.service';

export const fetchTenants = createAsyncThunk(
  'tenant/fetchTenants',
  async ({ page = 1, limit = 10, searchTerm = '' }, { rejectWithValue }) => {
    try {
      const response = await TenantService.fetchTenants(page, limit, searchTerm);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch tenants');
    }
  }
);


export const addTenant = createAsyncThunk(
  'tenant/addTenant',
  async (tenantData, { rejectWithValue }) => {
    try {
      const response = await TenantService.addTenant(tenantData);
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message || 'Failed to create tenant');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add tenant');
    }
  }
);

export const updateTenant = createAsyncThunk(
  'tenant/updateTenant',
  async ({ id, tenantData }, { rejectWithValue }) => {
    try {
      const response = await TenantService.updateTenant(id, tenantData);
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message || 'Failed to update tenant');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update tenant');
    }
  }
);


  export const deleteTenant = createAsyncThunk(
    'tenant/deleteTenant',
    async (id, { rejectWithValue }) => {
      try {
        await TenantService.deleteTenant(id);
        return id;
      } catch (error) {
        return rejectWithValue(
          error.message || 'Failed to delete tenant'
        );
      }
    }
  );


  export const uploadTenantPhoto = createAsyncThunk(
    'tenant/uploadTenantPhoto',
    async ({ id, photo }, { rejectWithValue }) => {
      try {
        const response = await TenantService.uploadPhoto(id, photo);
        return response.data; // Return the data from the response
      } catch (error) {
        return rejectWithValue(error.message || 'Failed to upload photo');
      }
    }
  );