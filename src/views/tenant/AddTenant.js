import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
} from '@coreui/react';

const AddTenant = ({ visible, setVisible, editingTenant }) => {
  // Initialize state for form fields
  const [tenantName, setTenantName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [leaseStartDate, setLeaseStartDate] = useState('');
  const [leaseEndDate, setLeaseEndDate] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [specialTerms, setSpecialTerms] = useState('');
  const [unit, setUnit] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [idProofs, setIdProofs] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState(['']); // Array for multiple contacts

  // Effect to populate form when editing
  useEffect(() => {
    if (editingTenant) {
      setTenantName(editingTenant.tenantName || '');
      setEmail(editingTenant.contactInformation?.email || '');
      setPhoneNumber(editingTenant.contactInformation?.phoneNumber || '');
      setEmergencyContact(editingTenant.contactInformation?.emergencyContact || '');
      setLeaseStartDate(editingTenant.leaseAgreement?.startDate || '');
      setLeaseEndDate(editingTenant.leaseAgreement?.endDate || '');
      setRentAmount(editingTenant.leaseAgreement?.rentAmount || '');
      setSecurityDeposit(editingTenant.leaseAgreement?.securityDeposit || '');
      setSpecialTerms(editingTenant.leaseAgreement?.specialTerms || '');
      setUnit(editingTenant.propertyInformation?.unit || '');
      setPaymentMethod(editingTenant.paymentMethod || '');
      setMoveInDate(editingTenant.moveInDate || '');
      setIdProofs(editingTenant.idProof || []);
      setEmergencyContacts(editingTenant.emergencyContacts || ['']);
    }
  }, [editingTenant]);

  // Function to handle the form submission
  const handleSubmit = () => {
    // Prepare tenant data object
    const tenantData = {
      tenantName,
      contactInformation: { email, phoneNumber, emergencyContact },
      leaseAgreement: { startDate: leaseStartDate, endDate: leaseEndDate, rentAmount, securityDeposit, specialTerms },
      propertyInformation: { unit },
      paymentMethod,
      moveInDate,
      idProofs,
      emergencyContacts,
    };
    console.log('Tenant Data:', tenantData);
    // Add logic to save tenant data (e.g., API call)
    setVisible(false); // Close modal after submission
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>{editingTenant ? 'Edit Tenant' : 'Add Tenant'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormLabel>Tenant Name</CFormLabel>
          <CFormInput value={tenantName} onChange={(e) => setTenantName(e.target.value)} required />
          
          <CFormLabel>Email</CFormLabel>
          <CFormInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <CFormLabel>Phone Number</CFormLabel>
          <CFormInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          
          <CFormLabel>Emergency Contact</CFormLabel>
          <CFormInput value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />

          <CFormLabel>Lease Start Date</CFormLabel>
          <CFormInput type="date" value={leaseStartDate} onChange={(e) => setLeaseStartDate(e.target.value)} required />
          
          <CFormLabel>Lease End Date</CFormLabel>
          <CFormInput type="date" value={leaseEndDate} onChange={(e) => setLeaseEndDate(e.target.value)} required />

          <CFormLabel>Rent Amount</CFormLabel>
          <CFormInput type="number" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} required />

          <CFormLabel>Security Deposit</CFormLabel>
          <CFormInput type="number" value={securityDeposit} onChange={(e) => setSecurityDeposit(e.target.value)} required />

          <CFormLabel>Special Terms</CFormLabel>
          <CFormInput value={specialTerms} onChange={(e) => setSpecialTerms(e.target.value)} />

          <CFormLabel>Unit</CFormLabel>
          <CFormInput value={unit} onChange={(e) => setUnit(e.target.value)} required />

          <CFormLabel>Payment Method</CFormLabel>
          <CFormSelect value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="">Select Payment Method</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card">Credit Card</option>
          </CFormSelect>

          <CFormLabel>Move-In Date</CFormLabel>
          <CFormInput type="date" value={moveInDate} onChange={(e) => setMoveInDate(e.target.value)} required />

          <CFormLabel>ID Proofs</CFormLabel>
          <CFormInput type="file" multiple onChange={(e) => setIdProofs([...e.target.files])} />
          
          <CFormLabel>Emergency Contacts</CFormLabel>
          {emergencyContacts.map((contact, idx) => (
            <CFormInput key={idx} value={contact} onChange={(e) => {
              const updatedContacts = [...emergencyContacts];
              updatedContacts[idx] = e.target.value;
              setEmergencyContacts(updatedContacts);
            }} className="mb-2" />
          ))}
          <CButton color="secondary" onClick={() => setEmergencyContacts([...emergencyContacts, ''])}>
            Add More Contacts
          </CButton>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSubmit}>{editingTenant ? 'Update' : 'Add'} Tenant</CButton>
        <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddTenant;
