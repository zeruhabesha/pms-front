// api/slice/Adminslice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchAdmins, addAdmin, updateAdmin, deleteAdmin } from '../actions/AdminAction';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.users;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const index = state.admins.findIndex((admin) => admin.id === action.payload.id);
        if (index !== -1) state.admins[index] = action.payload;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter((admin) => admin.id !== action.payload);
      });
  },
});

export const { setAdmins } = adminSlice.actions;
export default adminSlice.reducer;
