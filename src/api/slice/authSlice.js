import { createSlice } from '@reduxjs/toolkit' // Import createSlice
import { login, logout } from '../actions/authActions'

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'), // Check if token exists in localStorage
  user: JSON.parse(localStorage.getItem('user')) || null, // Parse user info from localStorage
  token: localStorage.getItem('token') || null, // Get token from localStorage
  loading: false,
  error: null,
} // Slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true
      state.error = null
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
  },
})

export const { logout: logoutSync } = authSlice.actions
export default authSlice.reducer
