// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import superAdminReducer from './slice/superAdminSlice';
import AdminReducer from './slice/Adminslice';
import userReducer from './slice/userSlice';
import propertyReducer from './slice/PropertySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    superAdmin: superAdminReducer,
    Admin: AdminReducer,
    user: userReducer,
    property: propertyReducer,
  },
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      serializableCheck: false,
      ignoredActions: ['auth/login/fulfilled', 'auth/login/rejected'],
    },
  }),
});

export default store;
