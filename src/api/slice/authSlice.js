import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../actions/authActions';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'), // Check if token exists in localStorage
  user: JSON.parse(localStorage.getItem('user')) || null, // Parse user info from localStorage
  token: localStorage.getItem('token') || null, // Get token from localStorage
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSync(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;

        // Store the token and user in localStorage
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to login';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;

        // Clear localStorage on logout
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  },
});

export const { logoutSync } = authSlice.actions;
export default authSlice.reducer;
