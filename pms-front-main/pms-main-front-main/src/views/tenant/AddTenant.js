import React, { useState } from 'react';
import { CForm, CFormInput, CButton, CSpinner, CToast, CToastBody, CFormSelect } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { addTenant } from '../../api/actions/TenantActions'; // Adjust the import as necessary
import { toast } from 'react-toastify'; // Ensure you have toast notifications set up
import { useNavigate } from 'react-router-dom';

const AddTenant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initial state for tenant data
  const [tenantData, setTenantData] = useState({
    tenantName: '',
    status: 'active',
    registeredByAdmin: 'your_admin_id', // Replace with actual admin ID
    contactInformation: {
      email: '',
      phoneNumber: '',
      emergencyContact: '',
    },
    leaseAgreement: {
      startDate: '',
      endDate: '',
      rentAmount: 0,
      securityDeposit: 0,
      specialTerms: '',
    },
    propertyInformation: {
      propertyId: 'your_property_id', // Replace with actual property ID
    },
    paymentMethod: 'creditCard',
    moveInDate: '',
    emergencyContacts: [],
  });

  const [idProofFiles, setIdProofFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Validate required fields
    if (!tenantData.tenantName || !tenantData.contactInformation.email) {
      setErrorMessage('Tenant name and email are required.');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      // Append tenant information
      formData.append('tenantName', tenantData.tenantName);
      formData.append('status', tenantData.status);
      formData.append('registeredByAdmin', tenantData.registeredByAdmin);

      // Append contact information
      Object.entries(tenantData.contactInformation).forEach(([key, value]) => {
        formData.append(`contactInformation[${key}]`, value);
      });

      // Append lease agreement information
      Object.entries(tenantData.leaseAgreement).forEach(([key, value]) => {
        formData.append(`leaseAgreement[${key}]`, value);
      });

      // Append property information
      formData.append('propertyInformation[propertyId]', tenantData.propertyInformation.propertyId);
      formData.append('paymentMethod', tenantData.paymentMethod);
      formData.append('moveInDate', tenantData.moveInDate);

      // Append emergency contacts
      tenantData.emergencyContacts.forEach((contact, index) => {
        formData.append(`emergencyContacts[${index}]`, contact);
      });

      // Append ID proof files
      idProofFiles.forEach(file => {
        formData.append('idProof', file);
      });

      const response = await dispatch(addTenant(formData)).unwrap();
      toast.success('Tenant added successfully');
      navigate('/tenant');
    } catch (error) {
      console.error('Error adding tenant:', error);
      toast.error(error.message || 'Failed to add tenant');
      setErrorMessage(error.message || 'Failed to add tenant');
    } finally {
      setIsLoading(false);
    }
  };

  // Input change handlers
  const handleInputChange = (field, value) => {
    setTenantData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field, value) => {
    setTenantData(prev => ({
      ...prev,
      contactInformation: {
        ...prev.contactInformation,
        [field]: value,
      },
    }));
  };

  const handleLeaseChange = (field, value) => {
    setTenantData(prev => ({
      ...prev,
      leaseAgreement: {
        ...prev.leaseAgreement,
        [field]: value,
      },
    }));
  };

  const handleEmergencyContactChange = (index, value) => {
    const updatedContacts = [...tenantData.emergencyContacts];
    updatedContacts[index] = value;
    setTenantData(prev => ({
      ...prev,
      emergencyContacts: updatedContacts,
    }));
  };

  const handleIdProofChange = (e) => {
    setIdProofFiles(Array.from(e.target.files));
  };

  return (
    <CForm onSubmit={handleSubmit}>
      <CFormInput
        label="Tenant Name"
        value={tenantData.tenantName}
        onChange={(e) => handleInputChange('tenantName', e.target.value)}
        required
      />
      <CFormInput
        label="Email"
        type="email"
        value={tenantData.contactInformation.email}
        onChange={(e) => handleContactChange('email', e.target.value)}
        required
      />
      <CFormInput
        label="Phone Number"
        value={tenantData.contactInformation.phoneNumber}
        onChange={(e) => handleContactChange('phoneNumber', e.target.value)}
      />
      <CFormInput
        label="Emergency Contact"
        value={tenantData.contactInformation.emergencyContact}
        onChange={(e) => handleContactChange('emergencyContact', e.target.value)}
      />
      <CFormInput
        label="Lease Start Date"
        type="date"
        value={tenantData.leaseAgreement.startDate}
        onChange={(e) => handleLeaseChange('startDate', e.target.value)}
      />
      <CFormInput
        label="Lease End Date"
        type="date"
        value={tenantData.leaseAgreement.endDate}
        onChange={(e) => handleLeaseChange('endDate', e.target.value)}
      />
      <CFormInput
        label="Rent Amount"
        type="number"
        value={tenantData.leaseAgreement.rentAmount}
        onChange={(e) => handleLeaseChange('rentAmount', Number(e.target.value))}
      />
      <CFormInput
        label="Security Deposit"
        type="number"
        value={tenantData.leaseAgreement.securityDeposit}
        onChange={(e) => handleLeaseChange('securityDeposit', Number(e.target.value))}
      />
      <CFormInput
        label="Special Terms"
        value={tenantData.leaseAgreement.specialTerms}
        onChange={(e) => handleLeaseChange('specialTerms', e.target.value)}
      />
      <CFormSelect
        label="Payment Method"
        value={tenantData.paymentMethod}
        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
      >
        <option value="creditCard">Credit Card</option>
        <option value="bankTransfer">Bank Transfer</option>
        <option value="cash">Cash</option>
      </CFormSelect>
      <CFormInput
        label="Move-In Date"
        type="date"
        value={tenantData.moveInDate}
        onChange={(e) => handleInputChange('moveInDate', e.target.value)}
      />
      <CFormInput
        label="Emergency Contacts"
        placeholder="Enter emergency contact"
        onChange={(e) => handleEmergencyContactChange(0, e.target.value)}
      />
      <CFormInput
        label="Upload ID Proof"
        type="file"
        multiple
        onChange={handleIdProofChange}
      />
      <CButton type="submit" disabled={isLoading}>
        {isLoading ? <CSpinner size="sm" /> : 'Add Tenant'}
      </CButton>
      {errorMessage && <CToast><CToastBody>{errorMessage}</CToastBody></CToast>}
    </CForm>
  );
};

export default AddTenant;
