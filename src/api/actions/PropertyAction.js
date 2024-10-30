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
  