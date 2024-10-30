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

export default propertySlice.reducer;
