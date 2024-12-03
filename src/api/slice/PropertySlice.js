<<<<<<< HEAD
// src/api/slice/PropertySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    fetchPropertiesSuccess(state, action) {
        state.properties = Array.isArray(action.payload) ? action.payload : []; // Ensure array format
        state.error = null;
      },
      fetchPropertiesFailure(state, action) {
        state.error = action.payload;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
    addPropertySuccess(state, action) {
      state.properties.push(action.payload);
    },
    updatePropertySuccess(state, action) {
      const index = state.properties.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.properties[index] = action.payload;
    },
    deletePropertySuccess(state, action) {
      state.properties = state.properties.filter((p) => p.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
  addPropertySuccess,
  updatePropertySuccess,
  deletePropertySuccess,
  setLoading,
} = propertySlice.actions;

=======
import { createSlice } from '@reduxjs/toolkit'; // Import createSlice
import { 
  fetchProperties, 
  addProperty, 
  updateProperty, 
  deleteProperty 
} from '../actions/PropertyAction';

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    properties: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    selectedProperty: null,
  },
  reducers: {
    resetState: () => initialState,
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.properties = action.payload.properties;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch properties';
      })

      .addCase(addProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.properties.findIndex(
          (property) => property._id === action.payload._id
        );
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })

      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(
          (property) => property._id !== action.payload
        );
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { resetState, setSelectedProperty, clearError } = propertySlice.actions;
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
export default propertySlice.reducer;
