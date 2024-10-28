import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import superAdminReducer from './slice/superAdminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    superAdmin: superAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;