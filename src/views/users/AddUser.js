import React, { useEffect, useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CFormSelect, // Import CFormSelect for dropdowns
} from '@coreui/react';

const AddUser = ({ visible, setVisible, editingUser }) => {
  // State for input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User'); // Default role
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('Active'); // Default status
  const [photo, setPhoto] = useState('');

  // Use effect to populate fields if editing
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.role);
      setPhoneNumber(editingUser.phoneNumber);
      setAddress(editingUser.address);
      setStatus(editingUser.status);
      setPhoto(editingUser.photo);
    } else {
      setName('');
      setEmail('');
      setRole('User');
      setPhoneNumber('');
      setAddress('');
      setStatus('Active');
      setPhoto('');
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here (e.g., API call)
    console.log({ name, email, role, phoneNumber, address, status, photo });
    setVisible(false); // Close the modal after submission
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{editingUser ? 'Edit User' : 'Add User'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="userName">Name</CFormLabel>
              <CFormInput
                type="text"
                id="userName"
                placeholder="Enter User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="userEmail">Email</CFormLabel>
              <CFormInput
                type="email"
                id="userEmail"
                placeholder="Enter User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="userRole">Role</CFormLabel>
              <CFormSelect
                id="userRole"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="SuperAdmin">Super Admin</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="userPhone">Phone Number</CFormLabel>
              <CFormInput
                type="text"
                id="userPhone"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="userAddress">Address</CFormLabel>
              <CFormInput
                type="text"
                id="userAddress"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="userStatus">Status</CFormLabel>
              <CFormSelect
                id="userStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="userPhoto">Photo URL</CFormLabel>
              <CFormInput
                type="text"
                id="userPhoto"
                placeholder="Enter Photo URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          {editingUser ? 'Update User' : 'Add User'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddUser;