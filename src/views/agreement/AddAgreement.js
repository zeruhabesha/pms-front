import React, { useEffect, useState } from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput } from '@coreui/react';

const AddAgreement = ({ visible, setVisible, editingAgreement }) => {
  // State for form fields
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

  // Effect to populate fields when editing
  useEffect(() => {
    if (editingAgreement) {
      setTenant(editingAgreement.tenant);
      setProperty(editingAgreement.property);
      setLeaseStart(editingAgreement.leaseStart);
      setLeaseEnd(editingAgreement.leaseEnd);
      setRentAmount(editingAgreement.rentAmount);
      setSecurityDeposit(editingAgreement.securityDeposit);
      setPaymentTerms(editingAgreement.paymentTerms || { dueDate: '', paymentMethod: '' });
      setRulesAndConditions(editingAgreement.rulesAndConditions || '');
      setAdditionalOccupants(editingAgreement.additionalOccupants?.join(', ') || ''); // Convert array to string
      setUtilitiesAndServices(editingAgreement.utilitiesAndServices || '');
      setDocuments(editingAgreement.documents || []);
    } else {
      resetForm(); // Clear fields when adding new agreement
    }
  }, [editingAgreement, visible]);

  // Reset form function
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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const agreementData = {
      tenant,
      property,
      leaseStart,
      leaseEnd,
      rentAmount: Number(rentAmount),
      securityDeposit: Number(securityDeposit),
      paymentTerms,
      rulesAndConditions,
      additionalOccupants: additionalOccupants.split(',').map(name => name.trim()), // Convert string to array
      utilitiesAndServices,
      documents,
    };

    // Here you would typically call a function to add or update the lease data
    if (editingAgreement) {
      console.log('Updating agreement:', { id: editingAgreement.id, ...agreementData });
    } else {
      console.log('Adding agreement:', agreementData);
    }

    // Close the modal after submission
    setVisible(false);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']; // Example allowed file types
    const newFiles = [];
    const errors = [];

    files.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        newFiles.push(file.name); // Store file name for submission
      } else {
        errors.push(`${file.name} is not a valid file type.`);
      }
    });

    setDocuments((prev) => [...prev, ...newFiles]); // Update documents state
    setFileErrors(errors); // Update errors state
  };

  return (
    <CModal visible={visible} onClose={() => {
      setVisible(false);
      resetForm(); // Reset form when closing modal
    }}>
      <CModalHeader>
        <CModalTitle>{editingAgreement ? 'Edit Lease Agreement' : 'Add Lease Agreement'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <form id="agreementForm" onSubmit={handleSubmit}>
          <CFormInput
            type="text"
            label="Tenant ID"
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
            required
          />
          <CFormInput
            type="text"
            label="Property ID"
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            required
          />
          <CFormInput
            type="date"
            label="Lease Start Date"
            value={leaseStart}
            onChange={(e) => setLeaseStart(e.target.value)}
            required
          />
          <CFormInput
            type="date"
            label="Lease End Date"
            value={leaseEnd}
            onChange={(e) => setLeaseEnd(e.target.value)}
            required
          />
          <CFormInput
            type="number"
            label="Rent Amount"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
            required
          />
          <CFormInput
            type="number"
            label="Security Deposit"
            value={securityDeposit}
            onChange={(e) => setSecurityDeposit(e.target.value)}
            required
          />
          <CFormInput
            type="text"
            label="Payment Due Date"
            value={paymentTerms.dueDate}
            onChange={(e) => setPaymentTerms({ ...paymentTerms, dueDate: e.target.value })}
            required
          />
          <CFormInput
            type="text"
            label="Payment Method"
            value={paymentTerms.paymentMethod}
            onChange={(e) => setPaymentTerms({ ...paymentTerms, paymentMethod: e.target.value })}
            required
          />
          <CFormInput
            type="text"
            label="Rules and Conditions"
            value={rulesAndConditions}
            onChange={(e) => setRulesAndConditions(e.target.value)}
          />
          <CFormInput
            type="text"
            label="Additional Occupants (comma separated)"
            value={additionalOccupants}
            onChange={(e) => setAdditionalOccupants(e.target.value)}
          />
          <CFormInput
            type="text"
            label="Utilities and Services"
            value={utilitiesAndServices}
            onChange={(e) => setUtilitiesAndServices(e.target.value)}
          />
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
              <li key={index}>{doc}</li> // Displaying file names only
            ))}
          </ul>
        </form>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => {
          setVisible(false);
          resetForm(); // Reset form on cancel
        }}>
          Cancel
        </CButton>
        <CButton color="primary" type="submit" form="agreementForm">
          {editingAgreement ? 'Update' : 'Add'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddAgreement;
