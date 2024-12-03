// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import superAdminReducer from './slice/superAdminSlice';
<<<<<<< HEAD
import AdminReducer from './slice/Adminslice';
import userReducer from './slice/userSlice';
import propertyReducer from './slice/PropertySlice';
=======
import AdminReducer from './slice/AdminSlice';
import userReducer from './slice/userSlice';
import propertyReducer from './slice/PropertySlice';
import sidebarReducer from '../components/store/sidebarSlice';
import tenantReducer from './slice/TenantSlice';
import agreementReducer from './slice/AgreementSlice';
import maintenanceReducer from './slice/MaintenanceSlice'; // Import MaintenanceSlice reducer
import reportReducer from './slice/ReportSlices'; // Import MaintenanceSlice reducer
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3

export const store = configureStore({
  reducer: {
    auth: authReducer,
    superAdmin: superAdminReducer,
    Admin: AdminReducer,
    user: userReducer,
    property: propertyReducer,
<<<<<<< HEAD
  },
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      serializableCheck: false,
      ignoredActions: ['auth/login/fulfilled', 'auth/login/rejected'],
    },
  }),
=======
    sidebar: sidebarReducer,
    tenant: tenantReducer,
    agreement: agreementReducer,
    maintenance: maintenanceReducer, // Add maintenance reducer
    report: reportReducer, // Add report reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'auth/login/fulfilled',
          'auth/login/rejected',
          'sidebar/setSidebarShow',
          'sidebar/setSidebarUnfoldable',
        ],
        ignoredPaths: ['sidebar.sidebarShow', 'sidebar.sidebarUnfoldable'],
      },
    }),
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
});

export default store;
