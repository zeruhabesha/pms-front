import React, { useState, useEffect } from 'react';
import { 
  CModal, 
  CModalBody, 
  CModalHeader, 
  CModalTitle, 
  CModalFooter, 
  CForm, 
  CFormInput, 
  CRow, 
  CCol,
  CCard,
  CCardBody,
  CInputGroup,
  CButton,
  CAlert
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
<<<<<<< HEAD
import { cilUser, cilEnvelopeClosed, cilLockLocked, cilPhone, cilLocationPin, cilBadge } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';

const AddSuperAdmin = ({ visible, setVisible, editingSuperAdmin = null, onSave }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize state with fallback values using optional chaining
=======
import { cilUser, cilEnvelopeClosed, cilLockLocked, cilPhone, cilLocationPin } from '@coreui/icons';
import CustomSwitch from './CustomSwitch';

const AddSuperAdmin = ({ visible, setVisible, editingSuperAdmin = null, onSave }) => {
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
<<<<<<< HEAD
  const [status, setStatus] = useState('active');
=======
  const [status, setStatus] = useState(true); // true for 'active', false for 'inactive'
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Reset form fields each time editingSuperAdmin changes
    if (editingSuperAdmin) {
      setName(editingSuperAdmin.name || '');
      setEmail(editingSuperAdmin.email || '');
      setPassword(editingSuperAdmin.password || '');
      setPhoneNumber(editingSuperAdmin.phoneNumber || '');
      setAddress(editingSuperAdmin.address || '');
<<<<<<< HEAD
      setStatus(editingSuperAdmin.status === 'inactive' ? 'inactive' : 'active');
=======
      setStatus(editingSuperAdmin.status !== 'inactive'); // true if active
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setAddress('');
<<<<<<< HEAD
      setStatus('Active');
=======
      setStatus(true); // default to active
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
    }
    setErrorMessage('');
  }, [editingSuperAdmin]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || (!editingSuperAdmin && !password) || !phoneNumber) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const formData = {
      name,
      email,
      password: password || undefined,
      phoneNumber,
      address,
      photo: '',
<<<<<<< HEAD
      status: status.toLowerCase(),
=======
      status: status ? 'active' : 'inactive',
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
      ...(editingSuperAdmin ? { id: editingSuperAdmin.id } : {}),
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
    setStatus(true);
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
      <CModalHeader className="bg-dark text-white">
        <CModalTitle>
          {editingSuperAdmin ? 'Edit Super Admin' : 'Add Super Admin'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            {errorMessage && (
              <CAlert color="danger" className="mb-4">
                {errorMessage}
              </CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <CRow className="g-4">
                <CCol xs={12}>
                  <CInputGroup>
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
                    <CFormInput
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>

                <CCol xs={12}>
                  <CInputGroup>
<<<<<<< HEAD
                    <CInputGroupText>
                      <CIcon icon={cilBadge} />
                    </CInputGroupText>
                    <CFormSelect
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </CFormSelect>
=======
                    <CustomSwitch
                      label="Active Status"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                    />
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
                  </CInputGroup>
                </CCol>
              </CRow>

              <CModalFooter className="border-top-0">
                <CButton color="secondary" variant="ghost" onClick={handleClose}>
                  Cancel
                </CButton>
                <CButton color="dark" type="submit">
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
