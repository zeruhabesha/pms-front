<<<<<<< HEAD
// src/api/actions/PropertyAction.js
import {
    fetchPropertiesSuccess,
    fetchPropertiesFailure,
    addPropertySuccess,
    updatePropertySuccess,
    deletePropertySuccess,
    setLoading,
  } from '../slice/PropertySlice';
  import propertyService from '../services/property.service.js';
  
  export const fetchProperties = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const properties = await propertyService.getAllProperties();
      console.log("Fetched Properties:", properties); // Check response here
      dispatch(fetchPropertiesSuccess(properties));
    } catch (error) {
      console.error("Fetch Properties Error:", error); // Log any errors
      dispatch(fetchPropertiesFailure(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  
  export const addProperty = (propertyData) => async (dispatch) => {
    try {
      const newProperty = await propertyService.createProperty(propertyData);
      dispatch(addPropertySuccess(newProperty));
    } catch (error) {
      console.error("Failed to add property:", error);
    }
  };
  
  export const updateProperty = (id, propertyData) => async (dispatch) => {
    try {
      const updatedProperty = await propertyService.updateProperty(id, propertyData);
      dispatch(updatePropertySuccess(updatedProperty));
    } catch (error) {
      console.error("Failed to update property:", error);
    }
  };
  
  export const deleteProperty = (id) => async (dispatch) => {
    try {
      await propertyService.deleteProperty(id);
      dispatch(deletePropertySuccess(id));
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };
  
=======
// store/actions/propertyActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import propertyService from '../services/property.service';

export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await propertyService.fetchProperties(page, limit, search);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addProperty = createAsyncThunk(
  'property/addProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await propertyService.createProperty(propertyData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const response = await propertyService.updateProperty(id, propertyData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (id, { rejectWithValue }) => {
    try {
      await propertyService.deleteProperty(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const uploadPropertyPhotos = createAsyncThunk(
  'property/uploadPropertyPhotos',
  async ({ propertyId, photos }, { rejectWithValue }) => {
    try {
      const updatedPhotos = await propertyService.uploadPhotos(propertyId, photos);
      return { propertyId, photos: updatedPhotos };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload photos');
    }
  }
);

export const updatePropertyPhoto = createAsyncThunk(
  'property/updatePhoto',
  async ({ propertyId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/properties/${propertyId}/photos`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update photo'
      );
    }
  }
);
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
