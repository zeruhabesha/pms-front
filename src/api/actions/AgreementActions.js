// actions/AgreementActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import AgreementService from '../services/agreement.service';

export const fetchAgreements = createAsyncThunk(
  'agreement/fetchAgreements',
  async ({ page = 1, limit = 5, searchTerm = '' }, { rejectWithValue }) => {
    try {
      const response = await AgreementService.fetchAgreements(page, limit, searchTerm);

      // Update to match the API response structure
      if (!response || typeof response.totalPages !== 'number' || typeof response.currentPage !== 'number' || !Array.isArray(response.leases)) {
        console.error('Invalid response structure:', response);
        throw new Error('Invalid response structure');
      }

      // Return the expected format
      return {
        agreements: response.leases, // Change from 'agreements' to 'leases'
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      };
    } catch (error) {
      console.error('Fetch agreements failed:', error.message || error);
      return rejectWithValue(error.message || 'Failed to fetch agreements');
    }
  }
);


export const addAgreement = createAsyncThunk(
  'agreement/addAgreement',
  async (agreementData, { rejectWithValue }) => {
    try {
      const response = await AgreementService.addAgreement(agreementData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAgreement = createAsyncThunk(
  'agreement/updateAgreement',
  async ({ id, agreementData }, { rejectWithValue }) => {
    try {
      const response = await AgreementService.updateAgreement(id, agreementData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAgreement = createAsyncThunk(
  'agreement/deleteAgreement',
  async (id, { rejectWithValue }) => {
    try {
      await AgreementService.deleteAgreement(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);