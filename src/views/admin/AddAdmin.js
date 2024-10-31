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
  CCard,
  CCardBody,
  CInputGroup,
  CFormSelect,
  CAlert,
} from '@coreui/react';
import { useDispatch } from 'react-redux';
import { addAdmin, updateAdmin } from '../../api/actions/AdminActions';

const AddAdmin = ({ visible, setVisible, editingAdmin }) => {
  const dispatch = useDispatch();

  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin',
    phoneNumber: '',
    address: '',
    status: 'active',
    photo: '',
    activeStart: '',
    activeEnd: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editingAdmin) {
      setAdminData({
        ...editingAdmin,
        password: '', // Clear password field for editing
      });
    } else {
      setAdminData({
        name: '',
        email: '',
        password: '',
        role: 'Admin',
        phoneNumber: '',
        address: '',
        status: 'active',
        photo: '',
        activeStart: '',
        activeEnd: '',
      });
    }
    setErrorMessage('');
  }, [editingAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!adminData.name || !adminData.email || (!editingAdmin && !adminData.password)) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (editingAdmin) {
      dispatch(updateAdmin({ id: editingAdmin.id, adminData }));
    } else {
      dispatch(addAdmin(adminData));
    }
    handleClose();
  };

  const handleClose = () => {
    setAdminData({
      name: '',
      email: '',
      password: '',
      role: 'Admin',
      phoneNumber: '',
      address: '',
      status: 'active',
      photo: '',
      activeStart: '',
      activeEnd: '',
    });
    setErrorMessage('');
    setVisible(false);
  };

  return (
    <CModal visible={visible} onClose={handleClose} alignment="center" backdrop="static" size="lg">
      <CModalHeader className="bg-primary text-white">
        <CModalTitle>{editingAdmin ? 'Edit Admin' : 'Add Admin'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            {errorMessage && (
              <CAlert color="danger" className="mb-4">
                {errorMessage}
              </CAlert>
            )}
            <CForm>
              <CRow className="g-4">
                <CCol xs={12}>
                  <CInputGroup>
                    <CFormInput
                      type="text"
                      name="name"
                      value={adminData.name}
                      onChange={handleChange}
                      placeholder="Enter Admin Name"
                      required
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs={12}>
                  <CInputGroup>
                    <CFormInput
                      type="email"
                      name="email"
                      value={adminData.email}
                      onChange={handleChange}
                      placeholder="Enter Admin Email"
                      required
                    />
                  </CInputGroup>
                </CCol>
                {!editingAdmin && (
                  <CCol xs={12}>
                    <CInputGroup>
                      <CFormInput
                        type="password"
                        name="password"
                        value={adminData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                      />
                    </CInputGroup>
                  </CCol>
                )}
                <CCol xs={12}>
                  <CInputGroup>
                    <CFormInput
                      type="text"
                      name="phoneNumber"
                      value={adminData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs={12}>
                  <CInputGroup>
                    <CFormInput
                      type="text"
                      name="address"
                      value={adminData.address}
                      onChange={handleChange}
                      placeholder="Enter Address"
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs={12}>
                  <CFormSelect name="role" value={adminData.role} onChange={handleChange}>
                    <option value="Admin">Admin</option>
                    <option value="SuperAdmin">Super Admin</option>
                    <option value="User">User</option>
                    <option value="Tenant">Tenant</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12}>
                  <CFormSelect name="status" value={adminData.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12}>
                  <CInputGroup>
                    <CFormInput
                      type="date"
                      name="activeStart"
                      value={adminData.activeStart}
                      onChange={handleChange}
                      placeholder="Active Start Date"
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs={12}>
                  <CInputGroup>
                    <CFormInput
                      type="date"
                      name="activeEnd"
                      value={adminData.activeEnd}
                      onChange={handleChange}
                      placeholder="Active End Date"
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs={12}>
                  <CInputGroup>
                    <CFormInput
                      type="text"
                      name="photo"
                      value={adminData.photo}
                      onChange={handleChange}
                      placeholder="Enter Photo URL"
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter className="border-top-0">
        <CButton color="secondary" variant="ghost" onClick={handleClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          {editingAdmin ? 'Update Admin' : 'Add Admin'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddAdmin;
