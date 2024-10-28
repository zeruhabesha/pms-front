import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  CButton, 
  CModal, 
  CModalBody, 
  CModalHeader, 
  CModalTitle, 
  CModalFooter, 
  CForm, 
  CFormLabel, 
  CFormInput, 
  CRow, 
  CCol,
  CCard,
  CCardBody,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CAlert
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilEnvelopeClosed, cilLockLocked, cilPhone, cilLocationPin, cilBadge } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
// import AuthService from '../../api/services/auth.services'; // Ensure correct import path

const AddSuperAdmin = ({ visible, setVisible, editingSuperAdmin, onSave }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('Active');
  const [errorMessage, setErrorMessage] = useState('');
  const { error } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    if (editingSuperAdmin) {
      setName(editingSuperAdmin.name || '');
      setEmail(editingSuperAdmin.email || '');
      setPassword(''); // Leave password blank for security
      setPhoneNumber(editingSuperAdmin.phoneNumber || '');
      setAddress(editingSuperAdmin.address || '');
      setStatus(editingSuperAdmin.status === 'inactive' ? 'Inactive' : 'Active');
      setErrorMessage('');
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setAddress('');
      setStatus('Active');
      setErrorMessage('');
    }
  }, [editingSuperAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || (!editingSuperAdmin && !password) || !phoneNumber) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Check authentication
    // if (!AuthService.isAuthenticated()) {
    //   setErrorMessage('You must be logged in to perform this action.');
    //   return;
    // }

    const formData = {
      name,
      email,
      password: password || undefined,
      phoneNumber,
      address,
      photo: '',
      status: status.toLowerCase(),
    };

    try {
      await onSave(formData);
      handleClose();
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred while saving');
    }
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setAddress('');
    setStatus('Active');
    setErrorMessage('');
    setVisible(false);
  };

  return (
    <CModal
      visible={visible}
      onClose={handleClose}
      alignment="center"
      backdrop="static"
      size="lg"
    >
      <CModalHeader className="bg-primary text-white">
        <CModalTitle>
          {editingSuperAdmin ? 'Edit Super Admin' : 'Add Super Admin'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            {(error || errorMessage) && (
              <CAlert color="danger" className="mb-4">
                {error?.message || errorMessage}
              </CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <CRow className="g-4">
                <CCol xs={12}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </CInputGroup>
                </CCol>

                <CCol xs={12}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </CInputGroup>
                </CCol>

                {!editingSuperAdmin && (
                  <CCol xs={12}>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                  </CCol>
                )}

                <CCol xs={12}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </CInputGroup>
                </CCol>

                <CCol xs={12}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilLocationPin} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>

                <CCol xs={12}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilBadge} />
                    </CInputGroupText>
                    <CFormSelect
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </CFormSelect>
                  </CInputGroup>
                </CCol>
              </CRow>

              <CModalFooter className="border-top-0">
                <CButton 
                  color="secondary" 
                  variant="ghost"
                  onClick={handleClose}
                >
                  Cancel
                </CButton>
                <CButton 
                  color="primary" 
                  type="submit"
                >
                  {editingSuperAdmin ? 'Update Super Admin' : 'Add Super Admin'}
                </CButton>
              </CModalFooter>
            </CForm>
          </CCardBody>
        </CCard>
      </CModalBody>
    </CModal>
  );
};

export default AddSuperAdmin;