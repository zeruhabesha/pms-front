// store/actions/AdminActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import AdminService from '../services/admin.service';

export const fetchAdmins = createAsyncThunk(
  'Admin/fetchAdmins',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AdminService.fetchAdmins();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const addAdmin = createAsyncThunk(
  'Admin/add',
  async (AdminData, { rejectWithValue }) => {
    try {
      // Call the service method to add a  Admin
      const response = await AdminService.addAdmin(AdminData);
      return response.data; // Return the response data on success
    } catch (error) {
      return rejectWithValue({
        message: error.message || 'Failed to add  Admin',
        status: error.status || 500,
      });
    }
  }
);


export const updateAdmin = createAsyncThunk(
  'Admin/updateAdmin',
  async ({ id, AdminData }, { rejectWithValue }) => {
    try {
      return await AdminService.updateAdmin(id, AdminData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadAdminPhoto = createAsyncThunk(
  'Admin/uploadPhoto',
  async ({ id, photo }, { rejectWithValue }) => {
    try {
      const response = await AdminService.uploadAdminPhoto(id, photo);
      return { id, photoUrl: response };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload photo');
    }
  }
);


export const deleteAdmin = createAsyncThunk(
  'Admin/deleteAdmin',
  async (id, { rejectWithValue }) => {
    try {
      await AdminService.deleteAdmin(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);