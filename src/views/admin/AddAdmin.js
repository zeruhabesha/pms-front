import React, { useState, useEffect } from 'react'
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CForm, CFormLabel, CFormInput, CRow, CCol } from '@coreui/react'

const AddAdmin = ({ visible, setVisible, editingAdmin }) => {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: ''
  })

  // Use effect to update form fields if editingAdmin changes (i.e., when editing)
  useEffect(() => {
    if (editingAdmin) {
      setAdminData({
        name: editingAdmin.name,
        email: editingAdmin.email,
        password: '' // You can leave password empty or handle it differently
      })
    } else {
      // If adding new admin, clear the form
      setAdminData({ name: '', email: '', password: '' })
    }
  }, [editingAdmin])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setAdminData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{editingAdmin ? 'Edit Admin' : 'Add Admin'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="adminName">Name</CFormLabel>
              <CFormInput
                type="text"
                id="adminName"
                name="name"
                value={adminData.name}
                onChange={handleChange}
                placeholder="Enter Admin Name"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="adminEmail">Email</CFormLabel>
              <CFormInput
                type="email"
                id="adminEmail"
                name="email"
                value={adminData.email}
                onChange={handleChange}
                placeholder="Enter Admin Email"
              />
            </CCol>
          </CRow>
          {!editingAdmin && ( // Only show password input when adding a new admin
            <CRow className="mb-3">
              <CCol xs={12}>
                <CFormLabel htmlFor="adminPassword">Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="adminPassword"
                  name="password"
                  value={adminData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </CCol>
            </CRow>
          )}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton color="primary">
          {editingAdmin ? 'Update Admin' : 'Add Admin'} {/* Change button text */}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddAdmin
