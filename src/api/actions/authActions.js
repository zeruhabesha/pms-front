import { createAsyncThunk } from '@reduxjs/toolkit';
import authServices from '../services/auth.services';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authServices.login(credentials);

    // Log the full response to debug the structure
    console.log('Full Login API Response:', response);

    // Adjust this based on the actual structure of the API response
    const { token, user } = response.data?.data || {};  // Nested under `data` or `data.result`

    // Check if token and user are present
    if (!token || !user) {
      throw new Error('Invalid login response: token or user is missing');
    }

    return { token, user };
  } catch (error) {
    console.error('Login Error:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response?.data?.message || 'Failed to login');
  }
});




// The logout action
export const logout = createAsyncThunk('auth/logout', async () => {
  await authServices.logout();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
});
