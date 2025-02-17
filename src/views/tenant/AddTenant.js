import React, { useState, useEffect } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CInputGroup,
  CFormSelect,
  CAlert,
  CSpinner,
  CToaster,
} from '@coreui/react';
import { cilTrash, cilPlus } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import httpCommon from '../../api/http-common';

const AddTenant = ({ visible, setVisible, editingTenant = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('success');
  const [tenantData, setTenantData] = useState({
    tenantName: '',
    email: '',
    phoneNumber: '',
    emergencyContact: '',
    leaseStartDate: '',
    leaseEndDate: '',
    rentAmount: '',
    securityDeposit: '',
    specialTerms: '',
    unit: '',
    propertyId: '',
    password: '',
    paymentMethod: '',
    moveInDate: '',
    emergencyContacts: [''], // Default array
    idProofs: [],
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editingTenant) {
      setTenantData({
        tenantName: editingTenant.tenantName || '',
        email: editingTenant.contactInformation?.email || '',
        phoneNumber: editingTenant.contactInformation?.phoneNumber || '',
        emergencyContact: editingTenant.contactInformation?.emergencyContact || '',
        leaseStartDate: editingTenant.leaseAgreement?.startDate?.split('T')[0] || '',
        leaseEndDate: editingTenant.leaseAgreement?.endDate?.split('T')[0] || '',
        rentAmount: editingTenant.leaseAgreement?.rentAmount || '',
        securityDeposit: editingTenant.leaseAgreement?.securityDeposit || '',
        specialTerms: editingTenant.leaseAgreement?.specialTerms || '',
        unit: editingTenant.propertyInformation?.unit || '',
        propertyId: editingTenant.propertyInformation?.propertyId || '',
        password: '', // Reset password field on edit
        paymentMethod: editingTenant.paymentMethod || '',
        moveInDate: editingTenant.moveInDate || '',
        emergencyContacts: editingTenant.emergencyContacts || [''],
        idProofs: editingTenant.idProof || [],
      });
    } else {
      resetForm();
    }
    setErrorMessage('');
  }, [editingTenant]);

  const resetForm = () => {
    setTenantData({
      tenantName: '',
      email: '',
      phoneNumber: '',
      emergencyContact: '',
      leaseStartDate: '',
      leaseEndDate: '',
      rentAmount: '',
      securityDeposit: '',
      specialTerms: '',
      unit: '',
      propertyId: '',
      password: '',
      paymentMethod: '',
      moveInDate: '',
      emergencyContacts: [''], // Reset to default array
      idProofs: [],
    });
    setErrorMessage('');
  };

  const handleArrayChange = (index, value, field) => {
    const updatedArray = [...tenantData[field]];
    updatedArray[index] = value;
    setTenantData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const handleAddArrayItem = (field) => {
    setTenantData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const handleRemoveArrayItem = (index, field) => {
    const updatedArray = tenantData[field].filter((_, i) => i !== index);
    setTenantData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setTenantData((prev) => ({
      ...prev,
      idProofs: [...prev.idProofs, ...files].slice(0, 3), // Limit to 3 files
    }));
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = tenantData.idProofs.filter((_, i) => i !== index);
    setTenantData((prev) => ({ ...prev, idProofs: updatedFiles }));
  };

  const validateTenantData = () => {
    if (!tenantData.tenantName.trim()) return 'Tenant name is required';
    if (!tenantData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tenantData.email))
      return 'A valid email is required';
    if (!tenantData.phoneNumber.trim()) return 'Phone number is required';
    if (!tenantData.paymentMethod) return 'Payment method is required';
    if (!tenantData.moveInDate) return 'Move-in date is required';
    if (!tenantData.leaseStartDate) return 'Lease start date is required';
    if (!tenantData.leaseEndDate) return 'Lease end date is required';
    if (tenantData.idProofs.length > 3) return 'No more than 3 ID proofs can be uploaded';
    return ''; // No validation errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateTenantData();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(tenantData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      });

      let response;
      if (editingTenant) {
        response = await httpCommon.put(`/tenants/${editingTenant._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await httpCommon.post('/tenants', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (response.status === 201 || response.status === 200) {
        const message = editingTenant ? 'Tenant updated successfully' : 'Tenant added successfully';
        showNotification(message);
        handleClose();
      } else {
        showNotification(response.data.message || 'Failed to save tenant', 'danger');
      }
    } catch (error) {
      console.error('Error saving tenant:', error);
      showNotification('Failed to save tenant', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, color = 'success') => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  const handleClose = () => {
    resetForm();
    setVisible(false);
  };

  return (
    <>
      <CToaster>
        {showToast && (
          <CAlert color={toastColor} visible={showToast} onClose={() => setShowToast(false)} dismissible>
            {toastMessage}
          </CAlert>
        )}
      </CToaster>

      <CModal visible={visible} onClose={handleClose} alignment="center" backdrop="static" size="lg">
        <CModalHeader className="bg-dark text-white">
          <CModalTitle>{editingTenant ? 'Edit Tenant' : 'Add Tenant'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
          <CForm onSubmit={handleSubmit}>
            <CRow className="g-3">
              {/* Tenant Name */}
              <CCol md={6}>
                <CFormInput
                  label="Tenant Name"
                  name="tenantName"
                  value={tenantData.tenantName}
                  onChange={(e) => setTenantData({ ...tenantData, tenantName: e.target.value })}
                  required
                />
              </CCol>
              {/* Email */}
              <CCol md={6}>
                <CFormInput
                  label="Email"
                  type="email"
                  name="email"
                  value={tenantData.email}
                  onChange={(e) => setTenantData({ ...tenantData, email: e.target.value })}
                  required
                />
              </CCol>
              {/* Phone Number */}
              <CCol md={6}>
                <CFormInput
                  label="Phone Number"
                  name="phoneNumber"
                  value={tenantData.phoneNumber}
                  onChange={(e) => setTenantData({ ...tenantData, phoneNumber: e.target.value })}
                  required
                />
              </CCol>
              {/* Payment Method */}
              <CCol md={6}>
                <CFormSelect
                  label="Payment Method"
                  name="paymentMethod"
                  value={tenantData.paymentMethod}
                  onChange={(e) => setTenantData({ ...tenantData, paymentMethod: e.target.value })}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </CFormSelect>
              </CCol>
              {/* Move-in Date */}
              <CCol md={6}>
                <CFormInput
                  label="Move-in Date"
                  type="date"
                  name="moveInDate"
                  value={tenantData.moveInDate}
                  onChange={(e) => setTenantData({ ...tenantData, moveInDate: e.target.value })}
                />
              </CCol>
              {/* Emergency Contacts */}
              <CCol md={12}>
                <label>Emergency Contacts</label>
                {tenantData.emergencyContacts.map((contact, index) => (
                  <CRow key={index} className="align-items-center mb-2">
                    <CCol xs={10}>
                      <CFormInput
                        value={contact}
                        placeholder={`Emergency Contact ${index + 1}`}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'emergencyContacts')}
                      />
                    </CCol>
                    <CCol xs={2}>
                      <CButton
                        size="sm"
                        color="light"
                        onClick={() => handleRemoveArrayItem(index, 'emergencyContacts')}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CCol>
                  </CRow>
                ))}
                <CButton size="sm" color="dark" onClick={() => handleAddArrayItem('emergencyContacts')}>
                  <CIcon icon={cilPlus} className="me-1" />
                  Add Contact
                </CButton>
              </CCol>
              {/* ID Proofs */}
              <CCol md={6}>
                <label>ID Proofs (Max: 3)</label>
                <CInputGroup>
                  <CFormInput
                    type="file"
                    name="idProofs"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />
                </CInputGroup>
                <CRow className="mt-2">
                  {tenantData.idProofs.map((file, idx) => (
                    <CCol key={idx} xs={12} className="d-flex align-items-center justify-content-between">
                      <span>{file.name}</span>
                      <CButton size="sm" color="light" onClick={() => handleRemoveFile(idx)}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CCol>
                  ))}
                </CRow>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose} disabled={isLoading}>
            Cancel
          </CButton>
          <CButton color="dark" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <CSpinner size="sm" /> : editingTenant ? 'Update Tenant' : 'Add Tenant'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AddTenant;
