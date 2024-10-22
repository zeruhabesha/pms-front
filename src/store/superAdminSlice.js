import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:4000/api/v1/users';

// Utility function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token'); // Assuming token is stored in localStorage
};

// Async thunk for fetching super admins with Authorization header
export const fetchSuperAdmins = createAsyncThunk('superAdmin/fetchSuperAdmins', async () => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/super-admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Log the response to understand the structure
  console.log('Full API Response:', response);

  // Extract the users array from the response
  const superAdmins = response.data?.data?.users;

  if (Array.isArray(superAdmins)) {
    return superAdmins; // Return the array of super admins
  } else {
    throw new Error('Invalid data structure from API');
  }
});

// Async thunk for adding a new super admin
export const addSuperAdmin = createAsyncThunk(
  'superAdmin/addSuperAdmin',
  async (superAdminData, { rejectWithValue }) => {
    try {
      const token = getToken();

      // Log the data being sent to the API
      console.log('Sending data to API:', superAdminData);

      const response = await axios.post(`${API_BASE_URL}/superadmin`, superAdminData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Add SuperAdmin Response:', response.data);

      return response.data.superAdmin;
    } catch (error) {
      // Log the error response
      console.error('Error adding super admin:', error.response?.data || error.message);

      // Use rejectWithValue to send the error to the slice
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating a super admin
export const updateSuperAdmin = createAsyncThunk(
  'superAdmin/updateSuperAdmin',
  async ({ id, superAdminData }, { rejectWithValue }) => {
    try {
      const token = getToken();

      // Log the data being sent to the API for debugging
      console.log('Updating SuperAdmin with ID:', id);
      console.log('SuperAdmin Data:', superAdminData);

      const response = await axios.put(`${API_BASE_URL}/${id}`, superAdminData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Log the API response
      console.log('Update SuperAdmin Response:', response.data);

      return response.data.superAdmin; // Ensure the API returns the updated super admin object
    } catch (error) {
      console.error('Error updating super admin:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Async thunk for deleting a super admin
export const deleteSuperAdmin = createAsyncThunk('superAdmin/deleteSuperAdmin', async (id) => {
  const token = getToken();

  await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  return id;
});

// Initial state for the slice
const initialState = {
  superAdmins: [], // Ensure this is an empty array initially
  loading: false,
  error: null,
};

// Create the slice
const superAdminSlice = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {
    resetSuperAdminForm: (state) => {
      state.superAdmins = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch super admins
      .addCase(fetchSuperAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuperAdmins.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Fetched SuperAdmins:', action.payload); // Debug fetched data
        state.superAdmins = action.payload;
      })
      .addCase(fetchSuperAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error('Error fetching super admins:', action.error.message);
      })

      // Add super admin
      .addCase(addSuperAdmin.fulfilled, (state, action) => {
        console.log('New SuperAdmin Added:', action.payload); // Debug added data
        state.superAdmins.push(action.payload);
      })
      .addCase(addSuperAdmin.rejected, (state, action) => {
        state.error = action.error.message;
        console.error('Error adding super admin:', action.error.message);
      })

      // Update super admin
      .addCase(updateSuperAdmin.fulfilled, (state, action) => {
        const updatedAdmin = action.payload;
      
        // Check if the updated super admin is defined
        if (updatedAdmin && updatedAdmin._id) {
          const index = state.superAdmins.findIndex((admin) => admin._id === updatedAdmin._id);
          
          if (index !== -1) {
            state.superAdmins[index] = updatedAdmin; // Update the existing admin
            console.log('SuperAdmin Updated:', updatedAdmin); // Debug updated data
          } else {
            console.error('SuperAdmin not found for update:', updatedAdmin._id);
          }
        } else {
          console.error('Failed to update SuperAdmin. Response payload does not contain valid _id');
        }
      })
      .addCase(updateSuperAdmin.rejected, (state, action) => {
        state.error = action.error.message;
        console.error('Error updating super admin:', action.error.message);
      })

      // Delete super admin
      .addCase(deleteSuperAdmin.fulfilled, (state, action) => {
        console.log('SuperAdmin Deleted:', action.payload); // Debug deleted ID
        state.superAdmins = state.superAdmins.filter((admin) => admin._id !== action.payload);
      })
      .addCase(deleteSuperAdmin.rejected, (state, action) => {
        state.error = action.error.message;
        console.error('Error deleting super admin:', action.error.message);
      });
  },
});

// Export actions and reducer
export const { resetSuperAdminForm } = superAdminSlice.actions;
export default superAdminSlice.reducer;
