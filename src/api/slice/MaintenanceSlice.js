import { createSlice } from '@reduxjs/toolkit';
import { fetchMaintenance, addMaintenance, updateMaintenance, uploadMaintenanceMedia, deleteMaintenance } from '../actions/MaintenanceActions';

const initialState = {
  maintenanceRecords: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalRecords: 0,
  selectedMaintenance: null,
};

const MaintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedMaintenance: (state, action) => {
      state.selectedMaintenance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaintenance.fulfilled, (state, action) => {
        state.loading = false;
        state.maintenanceRecords = action.payload.maintenanceRecords;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchMaintenance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Maintenance
      .addCase(addMaintenance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMaintenance.fulfilled, (state, action) => {
        state.loading = false;
        state.maintenanceRecords.push(action.payload);
      })
      .addCase(addMaintenance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Maintenance
      .addCase(updateMaintenance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMaintenance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.maintenanceRecords.findIndex(
          (record) => record._id === action.payload._id
        );
        if (index !== -1) {
          state.maintenanceRecords[index] = action.payload;
        }
      })
      .addCase(updateMaintenance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upload Media
      .addCase(uploadMaintenanceMedia.fulfilled, (state, action) => {
        const { id, mediaUrl } = action.payload;
        const maintenance = state.maintenanceRecords.find((record) => record._id === id);
        if (maintenance) {
          maintenance.mediaUrl = mediaUrl;
        }
      })
      .addCase(uploadMaintenanceMedia.rejected, (state, action) => {
        state.error = action.payload || 'Failed to upload media';
      })

      // Delete Maintenance
      .addCase(deleteMaintenance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMaintenance.fulfilled, (state, action) => {
        state.loading = false;
        state.maintenanceRecords = state.maintenanceRecords.filter(
          (record) => record._id !== action.payload
        );
      })
      .addCase(deleteMaintenance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { resetState, setSelectedMaintenance, clearError } = MaintenanceSlice.actions;
export default MaintenanceSlice.reducer;
