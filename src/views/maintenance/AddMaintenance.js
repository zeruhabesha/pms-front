import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CAlert,
  CSpinner,
} from '@coreui/react';
import { useDispatch } from 'react-redux';
import { addMaintenance, updateMaintenance } from '../../api/actions/MaintenanceActions';

const AddMaintenance = ({ visible, setVisible, editingMaintenance = null }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [maintenanceData, setMaintenanceData] = useState({
    tenant: '',
    property: '',
    typeOfRequest: '',
    description: '',
    urgencyLevel: '',
    preferredAccessTimes: '',
    photosOrVideos: [],
  });

  useEffect(() => {
    if (editingMaintenance) {
      setMaintenanceData({
        tenant: editingMaintenance.tenant || '',
        property: editingMaintenance.property || '',
        typeOfRequest: editingMaintenance.typeOfRequest || '',
        description: editingMaintenance.description || '',
        urgencyLevel: editingMaintenance.urgencyLevel || '',
        preferredAccessTimes: editingMaintenance.preferredAccessTimes || '',
        photosOrVideos: editingMaintenance.photosOrVideos || [],
      });
    } else {
      resetForm();
    }
    setErrorMessage('');
  }, [editingMaintenance]);

  const resetForm = () => {
    setMaintenanceData({
      tenant: '',
      property: '',
      typeOfRequest: '',
      description: '',
      urgencyLevel: '',
      preferredAccessTimes: '',
      photosOrVideos: [],
    });
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMaintenanceData((prev) => ({ ...prev, photosOrVideos: files }));
  };

  const validateForm = () => {
    const errors = {};
    if (!maintenanceData.tenant) errors.tenant = 'Tenant name is required.';
    if (!maintenanceData.property) errors.property = 'Property name is required.';
    if (!maintenanceData.typeOfRequest) errors.typeOfRequest = 'Type of request is required.';
    if (!maintenanceData.description) errors.description = 'Description is required.';
    if (!maintenanceData.urgencyLevel) errors.urgencyLevel = 'Urgency level is required.';
    return errors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      Object.entries(maintenanceData).forEach(([key, value]) => {
        if (key === 'photosOrVideos') {
          value.forEach((file) => formData.append('photosOrVideos', file));
        } else {
          formData.append(key, value);
        }
      });

      if (editingMaintenance) {
        await dispatch(updateMaintenance({ id: editingMaintenance._id, maintenanceData })).unwrap();
      } else {
        await dispatch(addMaintenance(formData)).unwrap();
      }
      handleClose();
    } catch (error) {
      setErrorMessage(error.message || 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    setVisible(false);
  };

  return (
    <CModal visible={visible} onClose={handleClose} alignment="center" backdrop="static" size="lg">
      <CModalHeader className="bg-primary text-white">
        <CModalTitle>{editingMaintenance ? 'Edit Maintenance' : 'Add Maintenance'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            {errorMessage && (
              <CAlert color="danger" className="mb-4">
                {errorMessage}
              </CAlert>
            )}
            <CRow className="g-4">
              <CCol xs={12}>
                <CFormLabel htmlFor="tenant">Tenant Name</CFormLabel>
                <CFormInput
                  id="tenant"
                  name="tenant"
                  type="text"
                  placeholder="Enter tenant name"
                  value={maintenanceData.tenant}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="property">Property Name</CFormLabel>
                <CFormInput
                  id="property"
                  name="property"
                  type="text"
                  placeholder="Enter property name"
                  value={maintenanceData.property}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="typeOfRequest">Type of Request</CFormLabel>
                <CFormInput
                  id="typeOfRequest"
                  name="typeOfRequest"
                  type="text"
                  placeholder="Enter type of request"
                  value={maintenanceData.typeOfRequest}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormInput
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter description"
                  value={maintenanceData.description}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="urgencyLevel">Urgency Level</CFormLabel>
                <CFormInput
                  id="urgencyLevel"
                  name="urgencyLevel"
                  type="text"
                  placeholder="Enter urgency level"
                  value={maintenanceData.urgencyLevel}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="preferredAccessTimes">Preferred Access Times</CFormLabel>
                <CFormInput
                  id="preferredAccessTimes"
                  name="preferredAccessTimes"
                  type="text"
                  placeholder="Enter preferred access times (optional)"
                  value={maintenanceData.preferredAccessTimes}
                  onChange={handleChange}
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="photosOrVideos">Upload Photos/Videos</CFormLabel>
                <CFormInput
                  id="photosOrVideos"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                />
                {maintenanceData.photosOrVideos.length > 0 && (
                  <div className="mt-2">
                    <strong>Selected Files:</strong>
                    <ul>
                      {maintenanceData.photosOrVideos.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter className="border-top-0">
        <CButton color="secondary" variant="ghost" onClick={handleClose} disabled={isLoading}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <CSpinner size="sm" className="me-2" />
              {editingMaintenance ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            editingMaintenance ? 'Update Maintenance' : 'Add Maintenance'
          )}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddMaintenance;
