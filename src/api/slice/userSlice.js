<<<<<<< HEAD
// api/slice/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, addUser, deleteUser, updateUser } from '../actions/userAction';
=======
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, addUser, updateUser, uploadUserPhoto, deleteUser,updateUserPermissions  } from '../actions/userActions';
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3

const initialState = {
  users: [],
  loading: false,
  error: null,
<<<<<<< HEAD
  totalUsers: 0,
=======
  totalPages: 1,
  currentPage: 1,
  selectedUser: null,
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
};

const userSlice = createSlice({
  name: 'user',
  initialState,
<<<<<<< HEAD
  reducers: {},
  extraReducers: (builder) => {
    builder
=======
  reducers: {
    resetState: () => initialState,
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
<<<<<<< HEAD
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
=======
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.users = [action.payload, ...state.users]; // Add user to the beginning of the list
        } else {
          state.error = 'Failed to add user: No data returned';
        }
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add user';
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upload Photo
      .addCase(uploadUserPhoto.pending, (state) => {
        state.error = null;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        const { id, photoUrl } = action.payload;
        const user = state.users.find((user) => user._id === id);
        if (user) {
          user.photoUrl = photoUrl;
        }
      })
      .addCase(uploadUserPhoto.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPermissions.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUserPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update permissions';
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
      });
  },
});

<<<<<<< HEAD
export default userSlice.reducer;
=======
export const { resetState, setSelectedUser, clearError } = userSlice.actions;
export default userSlice.reducer;
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
