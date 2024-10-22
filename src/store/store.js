import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the auth slice
import superAdminReducer from './superAdminSlice'; // Import the superAdmin slice

const store = configureStore({
  reducer: {
    auth: authReducer,         // Handles authentication state
    superAdmin: superAdminReducer, // Handles super admin state
    // Add more slices as needed
  },
});

export default store;
