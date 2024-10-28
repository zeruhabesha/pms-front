// api/actions/AdminAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../services/admin.service';

// Fetch all admins
export const fetchAdmins = createAsyncThunk('admin/fetchAdmins', async (query, { rejectWithValue }) => {
  try {
    const response = await adminService.fetchAdmins(query.page, query.limit, query.searchTerm);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch admins');
  }
});

// Add a new admin
export const addAdmin = createAsyncThunk('admin/addAdmin', async (adminData, { rejectWithValue }) => {
  try {
    const response = await adminService.addAdmin(adminData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to add admin');
  }
});

// Update an existing admin
export const updateAdmin = createAsyncThunk('admin/updateAdmin', async ({ id, adminData }, { rejectWithValue }) => {
  try {
    const response = await adminService.updateAdmin(id, adminData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to update admin');
  }
});

// Delete an admin
export const deleteAdmin = createAsyncThunk('admin/deleteAdmin', async (id, { rejectWithValue }) => {
  try {
    await adminService.deleteAdmin(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to delete admin');
  }
});
