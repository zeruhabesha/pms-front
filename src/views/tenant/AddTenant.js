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
import { cilPencil, cilTrash, cilCheckCircle, cilXCircle, cilPlus, cilMinus } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import { useDispatch } from 'react-redux';
import { addTenant } from '../../api/actions/TenantActions';
import TenantService from '../../api/services/tenant.service';

const AddTenant = ({ visible, setVisible, editingTenant = null }) => {
  const dispatch = useDispatch();
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
    paymentMethod: '',
    moveInDate: '',
    emergencyContacts: [''],
    idProofs: [], // To store uploaded ID Proofs
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editingTenant) {
      setTenantData({
        tenantName: editingTenant.tenantName || '',
        email: editingTenant.contactInformation?.email || '',
        phoneNumber: editingTenant.contactInformation?.phoneNumber || '',
        emergencyContact: editingTenant.contactInformation?.emergencyContact || '',
        leaseStartDate: editingTenant.leaseAgreement?.startDate.split('T')[0] || '',
        leaseEndDate: editingTenant.leaseAgreement?.endDate.split('T')[0] || '',
        rentAmount: editingTenant.leaseAgreement?.rentAmount || '',
        securityDeposit: editingTenant.leaseAgreement?.securityDeposit || '',
        specialTerms: editingTenant.leaseAgreement?.specialTerms || '',
        unit: editingTenant.propertyInformation?.unit || '',
        paymentMethod: editingTenant.paymentMethod || '',
        moveInDate: editingTenant.moveInDate || '',
        emergencyContacts: editingTenant.emergencyContacts || [''],
        idProofs: editingTenant.idProof || [], // Set uploaded idProofs
      });
    } else {
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
        paymentMethod: '',
        moveInDate: '',
        emergencyContacts: [''],
        idProofs: [], // Reset ID Proofs
      });
    }
    setErrorMessage('');
  }, [editingTenant]);

  const handleEmergencyContactChange = (index, value) => {
    const updatedContacts = [...tenantData.emergencyContacts];
    updatedContacts[index] = value;
    setTenantData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
  };

  const handleRemoveEmergencyContact = (index) => {
    const updatedContacts = tenantData.emergencyContacts.filter((_, i) => i !== index);
    setTenantData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setTenantData(prev => ({ ...prev, idProofs: [...prev.idProofs, ...fileArray] }));
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = tenantData.idProofs.filter((_, i) => i !== index);
    setTenantData(prev => ({ ...prev, idProofs: updatedFiles }));
  };

  const showNotification = (message, color = 'success') => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  const formatTenantData = (data) => {
    return {
      tenantName: data.tenantName,
      contactInformation: {
        email: data.email,
        phoneNumber: data.phoneNumber,
        emergencyContact: data.emergencyContact,
      },
      leaseAgreement: {
        startDate: data.leaseStartDate,
        endDate: data.leaseEndDate,
        rentAmount: data.rentAmount ? parseFloat(data.rentAmount) : 0, // Ensure it's a number
        securityDeposit: data.securityDeposit ? parseFloat(data.securityDeposit) : 0, // Ensure it's a number
        specialTerms: data.specialTerms,
      },
      propertyInformation: {
        unit: data.unit,
      },
      paymentMethod: data.paymentMethod,
      moveInDate: data.moveInDate,
      emergencyContacts: data.emergencyContacts.filter(contact => contact.trim() !== ''),
      idProofs: data.idProofs, // Include the ID proofs in the payload
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formattedData = formatTenantData(tenantData);
      const result = await TenantService.addTenant(formattedData);

      if (result.success) {
        showNotification('Tenant added successfully');
        dispatch(addTenant(result.data));
        handleClose();
      } else {
        showNotification(result.message || 'Failed to add tenant', 'danger');
      }
    } catch (error) {
      console.error('Error adding tenant:', error);
      showNotification('Failed to add tenant', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenantData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
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
      paymentMethod: '',
      moveInDate: '',
      emergencyContacts: [''],
      idProofs: [],
    });
    setErrorMessage('');
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
        <CModalHeader className="bg-secondary text-white">
          <CModalTitle>{editingTenant ? 'Edit Tenant' : 'Add Tenant'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {errorMessage && <CAlert color="danger" className="mb-4">{errorMessage}</CAlert>}
          <CForm>
            <CRow className="g-4">
              {/* Tenant Name */}
              <CCol xs={12}>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    name="tenantName"
                    value={tenantData.tenantName}
                    onChange={handleChange}
                    placeholder="Enter Tenant Name"
                    required
                  />
                </CInputGroup>
              </CCol>

              {/* Email */}
              <CCol xs={12}>
                <CInputGroup>
                  <CFormInput
                    type="email"
                    name="email"
                    value={tenantData.email}
                    onChange={handleChange}
                    placeholder="Enter Tenant Email"
                    required
                  />
                </CInputGroup>
              </CCol>

              {/* Phone Number */}
              <CCol xs={12}>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    name="phoneNumber"
                    value={tenantData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                  />
                </CInputGroup>
              </CCol>

              {/* Emergency Contact */}
              <CCol xs={12}>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    name="emergencyContact"
                    value={tenantData.emergencyContact}
                    onChange={handleChange}
                    placeholder="Enter Emergency Contact"
                  />
                </CInputGroup>
              </CCol>

              {/* Rent Amount */}
              <CCol xs={12}>
                <CInputGroup>
                  <CFormInput
                    type="number"
                    name="rentAmount"
                    value={tenantData.rentAmount}
                    onChange={handleChange}
                    placeholder="Enter Rent Amount"
                    required
                  />
                </CInputGroup>
              </CCol>

              {/* Payment Method */}
              <CCol xs={12}>
                <CFormSelect name="paymentMethod" value={tenantData.paymentMethod} onChange={handleChange} required>
                  <option value="">Select Payment Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                </CFormSelect>
              </CCol>

              {/* Emergency Contacts */}
              <CCol xs={12}>
                <CButton
                  color="secondary"
                  onClick={() => setTenantData(prev => ({ ...prev, emergencyContacts: [...prev.emergencyContacts, ''] }))}
                >
                  Add More Contacts
                </CButton>
                {tenantData.emergencyContacts.map((contact, idx) => (
                  <CRow key={idx} className="mt-2">
                    <CCol xs={10}>
                      <CFormInput
                        value={contact}
                        onChange={(e) => handleEmergencyContactChange(idx, e.target.value)}
                        className="mt-2"
                        placeholder={`Emergency Contact ${idx + 1}`}
                      />
                    </CCol>
                    <CCol xs={2}>
                      <CButton
                        color="light"
                        onClick={() => handleRemoveEmergencyContact(idx)}
                        className="mt-2"
                      >
                        <CIcon icon={cilXCircle} className="text-danger" title="remove" />
                      </CButton>
                    </CCol>
                  </CRow>
                ))}
              </CCol>

              {/* ID Proofs */}
              <CCol xs={12}>
                <CInputGroup>
                  <CFormInput
                    type="file"
                    name="idProofs"
                    multiple
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </CInputGroup>
                <CRow className="mt-2">
                  {tenantData.idProofs.map((file, idx) => (
                    <CCol key={idx} xs={6}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{file.name}</span>
                        <CButton
                          color="light"
                          onClick={() => handleRemoveFile(idx)}
                        >
                          <CIcon icon={cilTrash} className="text-danger" />
                        </CButton>
                      </div>
                    </CCol>
                  ))}
                </CRow>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose} disabled={isLoading}>Cancel</CButton>
          <CButton color="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                {editingTenant ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              editingTenant ? 'Update Tenant' : 'Add Tenant'
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AddTenant;
