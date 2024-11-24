import React, { useEffect, useState } from 'react';
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
  CFormSelect, 
  CAlert, 
  CSpinner 
} from '@coreui/react';
import axios from 'axios';
import Select from 'react-select';

const AddAgreement = ({ visible, setVisible, editingAgreement, handleSave }) => {
  const [tenant, setTenant] = useState('');
  const [property, setProperty] = useState('');
  const [leaseStart, setLeaseStart] = useState('');
  const [leaseEnd, setLeaseEnd] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [paymentTerms, setPaymentTerms] = useState({ dueDate: '', paymentMethod: '' });
  const [rulesAndConditions, setRulesAndConditions] = useState('');
  const [additionalOccupants, setAdditionalOccupants] = useState('');
  const [utilitiesAndServices, setUtilitiesAndServices] = useState('');
  const [documents, setDocuments] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);

  // Fetch properties and tenants on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
  
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        const [propertiesResponse, tenantsResponse] = await Promise.all([
          axios.get('http://localhost:4000/api/v1/properties/', { headers }),
          axios.get('http://localhost:4000/api/v1/tenants/', { headers })
        ]);
  
        setProperties(propertiesResponse.data.data.properties);
        setTenants(tenantsResponse.data.data.tenants);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to load properties or tenants');
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if (editingAgreement) {
      // Find the actual tenant and property objects
      const selectedTenant = tenants.find(t => t._id === editingAgreement.tenant._id);
      const selectedProperty = properties.find(p => p._id === editingAgreement.property._id);

      setTenant(selectedTenant?._id || '');
      setProperty(selectedProperty?._id || '');
      setLeaseStart(editingAgreement.leaseStart?.split('T')[0] || '');
      setLeaseEnd(editingAgreement.leaseEnd?.split('T')[0] || '');
      setRentAmount(editingAgreement.rentAmount || '');
      setSecurityDeposit(editingAgreement.securityDeposit || '');
      setPaymentTerms(editingAgreement.paymentTerms || { dueDate: '', paymentMethod: '' });
      setRulesAndConditions(editingAgreement.rulesAndConditions || '');
      setAdditionalOccupants(editingAgreement.additionalOccupants?.join(', ') || '');
      setUtilitiesAndServices(editingAgreement.utilitiesAndServices || '');
      setDocuments(editingAgreement.documents || []);
    } else {
      resetForm();
    }
    setErrorMessage('');
  }, [editingAgreement, tenants, properties]);

  const resetForm = () => {
    setTenant('');
    setProperty('');
    setLeaseStart('');
    setLeaseEnd('');
    setRentAmount('');
    setSecurityDeposit('');
    setPaymentTerms({ dueDate: '', paymentMethod: '' });
    setRulesAndConditions('');
    setAdditionalOccupants('');
    setUtilitiesAndServices('');
    setDocuments([]);
    setFileErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenant || !property || !leaseStart || !leaseEnd || !rentAmount || !securityDeposit) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      const agreementData = {
        tenant,
        property,
        leaseStart,
        leaseEnd,
        rentAmount: Number(rentAmount),
        securityDeposit: Number(securityDeposit),
        paymentTerms,
        rulesAndConditions,
        additionalOccupants: additionalOccupants.split(',').map(name => name.trim()).filter(Boolean),
        utilitiesAndServices,
        documents,
      };
      
      await handleSave(agreementData);
      setVisible(false);
      resetForm();
    } catch (error) {
      setErrorMessage('Failed to save agreement');
      console.error('Error saving agreement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const newFiles = [];
    const errors = [];

    files.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        newFiles.push(file.name);
      } else {
        errors.push(`${file.name} is not a valid file type.`);
      }
    });

    setDocuments((prev) => [...prev, ...newFiles]);
    setFileErrors(errors);
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} alignment="center" backdrop="static" size="lg">
      <CModalHeader className="bg-primary text-white">
        <CModalTitle>{editingAgreement ? 'Edit Lease Agreement' : 'Add Lease Agreement'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {errorMessage && (
          <CAlert color="danger" className="mb-4">
            {errorMessage}
          </CAlert>
        )}
        <CForm onSubmit={handleSubmit}>
          <CRow className="g-4">
          <CCol xs={12}>
              <label>Tenant</label>
              <Select
                options={tenants.map(t => ({ label: `${t.tenantName}`, value: t._id }))}
                value={tenant}
                onChange={setTenant}
                placeholder="Select Tenant"
                isClearable
              />
            </CCol>
            <CCol xs={12}>
              <label>Property</label>
              <Select
                options={properties.map(p => ({ label: p.propertyName || p.address, value: p._id }))}
                value={property}
                onChange={setProperty}
                placeholder="Select Property"
                isClearable
              />
            </CCol>

            <CCol xs={6}>
              <CFormInput
                type="date"
                label="Lease Start Date"
                value={leaseStart}
                onChange={(e) => setLeaseStart(e.target.value)}
                required
              />
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="date"
                label="Lease End Date"
                value={leaseEnd}
                onChange={(e) => setLeaseEnd(e.target.value)}
                required
              />
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="number"
                label="Rent Amount"
                placeholder="Enter Rent Amount"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                required
              />
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="number"
                label="Security Deposit"
                placeholder="Enter Security Deposit"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                required
              />
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="text"
                label="Payment Due Date"
                placeholder="Enter Payment Due Date"
                value={paymentTerms.dueDate}
                onChange={(e) => setPaymentTerms({ ...paymentTerms, dueDate: e.target.value })}
                required
              />
            </CCol>
            <CCol xs={6}>
              <CFormSelect
                label="Payment Method"
                value={paymentTerms.paymentMethod}
                onChange={(e) => setPaymentTerms({ ...paymentTerms, paymentMethod: e.target.value })}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="text"
                label="Rules and Conditions"
                placeholder="Enter any rules and conditions"
                value={rulesAndConditions}
                onChange={(e) => setRulesAndConditions(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="text"
                label="Additional Occupants"
                placeholder="Enter names separated by commas"
                value={additionalOccupants}
                onChange={(e) => setAdditionalOccupants(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="text"
                label="Utilities and Services"
                placeholder="Enter utilities and services details"
                value={utilitiesAndServices}
                onChange={(e) => setUtilitiesAndServices(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="file"
                label="Upload Documents"
                onChange={handleFileChange}
                multiple
              />
              {fileErrors.length > 0 && (
                <ul style={{ color: 'red' }}>
                  {fileErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              <ul>
                {documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => {
          setVisible(false);
          resetForm();
        }} disabled={isLoading}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <CSpinner size="sm" className="me-2" />
              {editingAgreement ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            editingAgreement ? 'Update Agreement' : 'Add Agreement'
          )}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddAgreement;