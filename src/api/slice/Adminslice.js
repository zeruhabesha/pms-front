import { createSlice } from '@reduxjs/toolkit';
import { fetchAdmins, addAdmin, updateAdmin, uploadAdminPhoto, deleteAdmin } from '../actions/AdminActions';


const initialState = {
  Admins: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  selectedAdmin: null,
};

const AdminSlice = createSlice({
  name: 'Admin',
  initialState,
  reducers: {
    resetState: () => initialState,
    setSelectedAdmin: (state, action) => {
      state.selectedAdmin = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch  Admins
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.Admins = action.payload.users;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch  admins';
      })

      // Add  Admin
      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.Admins.push(action.payload);
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  

      // Update  Admin case in the extraReducers
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        // Find the index of the updated admin
        const index = state.Admins.findIndex(admin => admin._id === action.payload._id);
        
        if (index !== -1) {
          // Replace the old entry with the new data
          state.Admins[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })

      // Upload Photo
      .addCase(uploadAdminPhoto.fulfilled, (state, action) => {
        const { id, photoUrl } = action.payload;
        const admin = state.Admins.find((admin) => admin._id === id);
        if (admin) {
          admin.photoUrl = photoUrl;
        }
      })
      .addCase(uploadAdminPhoto.rejected, (state, action) => {
        state.error = action.payload || 'Failed to upload photo';
      })

      // Delete  Admin
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.Admins = state.Admins.filter(
          (admin) => admin._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { resetState, setSelectedAdmin, clearError } = AdminSlice.actions;
export default AdminSlice.reducer;