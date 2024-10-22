import { createSlice } from '@reduxjs/toolkit'; // Import createSlice

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
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('user');  // Remove user info from localStorage
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
