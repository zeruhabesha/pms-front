import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CForm, CFormLabel, CFormInput, CRow, CCol } from '@coreui/react';
import { addSuperAdmin, updateSuperAdmin } from '../../store/superAdminSlice';
import { useNavigate } from 'react-router-dom';

const AddSuperAdmin = ({ visible, setVisible, editingSuperAdmin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // New password field
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState(''); // New address field
  const [status, setStatus] = useState('Active'); // Default status
  const { error } = useSelector((state) => state.superAdmin); // Capture error from redux

  useEffect(() => {
    setName(editingSuperAdmin?.name || '');
    setEmail(editingSuperAdmin?.email || '');
    setPassword(''); // Password is always empty for editing
    setPhoneNumber(editingSuperAdmin?.phoneNumber || '');
    setAddress(editingSuperAdmin?.address || '');
    setStatus(editingSuperAdmin?.status || 'Active');
  }, [editingSuperAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate input fields
    if (!name || !email || (!editingSuperAdmin && !password) || !phoneNumber) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const superAdminData = { name, email, password, phoneNumber, address, status: status.toLowerCase() };
  
    if (editingSuperAdmin) {
      // Update existing super admin
      dispatch(updateSuperAdmin({ id: editingSuperAdmin._id, superAdminData }))
        .unwrap()
        .then(() => {
          setVisible(false); // Close modal
          dispatch(fetchSuperAdmins()); // Fetch updated list after update
        })
        .catch((err) => {
          if (err === 'Unauthorized. Please log in again.') {
            alert('Your session has expired. Please log in again.');
            navigate('/login');
          } else {
            alert('Failed to update SuperAdmin. ' + err);
          }
        });
    } else {
      // Add new super admin
      dispatch(addSuperAdmin(superAdminData))
        .unwrap()
        .then(() => {
          setVisible(false); // Close modal
          dispatch(fetchSuperAdmins()); // Fetch updated list after adding new admin
        })
        .catch((err) => {
          if (err === 'Email already exists. Please use a different email.') {
            alert('This email is already in use. Please use a different email.');
          } else if (err === 'Unauthorized. Please log in again.') {
            alert('Your session has expired. Please log in again.');
            navigate('/login');
          } else {
            alert('Failed to add SuperAdmin. ' + err);
          }
        });
    }
  };
  

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{editingSuperAdmin ? 'Edit Super Admin' : 'Add Super Admin'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="superAdminName">Name</CFormLabel>
              <CFormInput
                type="text"
                id="superAdminName"
                placeholder="Enter Super Admin Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="superAdminEmail">Email</CFormLabel>
              <CFormInput
                type="email"
                id="superAdminEmail"
                placeholder="Enter Super Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </CCol>
          </CRow>
          {!editingSuperAdmin && (
            <CRow className="mb-3">
              <CCol xs={12}>
                <CFormLabel htmlFor="superAdminPassword">Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="superAdminPassword"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!editingSuperAdmin}
                />
              </CCol>
            </CRow>
          )}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="superAdminPhoneNumber">Phone Number</CFormLabel>
              <CFormInput
                type="text"
                id="superAdminPhoneNumber"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="superAdminAddress">Address</CFormLabel>
              <CFormInput
                type="text"
                id="superAdminAddress"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="superAdminStatus">Status</CFormLabel>
              <CFormInput
                type="text"
                id="superAdminStatus"
                placeholder="Enter Status (Active/Inactive)"
                value={status}
                onChange={(e) => setStatus(e.target.value.toLowerCase())}
                required
              />
            </CCol>
          </CRow>
        </CForm>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          {editingSuperAdmin ? 'Update Super Admin' : 'Add Super Admin'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddSuperAdmin;
