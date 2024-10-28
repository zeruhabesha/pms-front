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
  CFormFeedback,
} from '@coreui/react';
import axios from 'axios';

const AddMaintenance = ({ visible, setVisible, editingMaintenance }) => {
  const [tenant, setTenant] = useState('');
  const [property, setProperty] = useState('');
  const [typeOfRequest, setTypeOfRequest] = useState('');
  const [description, setDescription] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('');
  const [preferredAccessTimes, setPreferredAccessTimes] = useState('');
  const [photosOrVideos, setPhotosOrVideos] = useState([]);
  const [errors, setErrors] = useState({}); // State for error messages

  useEffect(() => {
    if (editingMaintenance) {
      setTenant(editingMaintenance.tenant);
      setProperty(editingMaintenance.property);
      setTypeOfRequest(editingMaintenance.typeOfRequest);
      setDescription(editingMaintenance.description);
      setUrgencyLevel(editingMaintenance.urgencyLevel);
      setPreferredAccessTimes(editingMaintenance.preferredAccessTimes);
      setPhotosOrVideos(editingMaintenance.photosOrVideos || []);
    } else {
      resetForm();
    }
  }, [editingMaintenance]);

  const resetForm = () => {
    setTenant('');
    setProperty('');
    setTypeOfRequest('');
    setDescription('');
    setUrgencyLevel('');
    setPreferredAccessTimes('');
    setPhotosOrVideos([]);
    setErrors({});
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotosOrVideos(files);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!tenant) newErrors.tenant = 'Tenant name is required.';
    if (!property) newErrors.property = 'Property name is required.';
    if (!typeOfRequest) newErrors.typeOfRequest = 'Type of request is required.';
    if (!description) newErrors.description = 'Description is required.';
    if (!urgencyLevel) newErrors.urgencyLevel = 'Urgency level is required.';
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    formData.append('tenant', tenant);
    formData.append('property', property);
    formData.append('typeOfRequest', typeOfRequest);
    formData.append('description', description);
    formData.append('urgencyLevel', urgencyLevel);
    formData.append('preferredAccessTimes', preferredAccessTimes);
    photosOrVideos.forEach((file) => {
      formData.append('photosOrVideos', file);
    });

    try {
      await axios.post('/api/maintenance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Maintenance submitted successfully');
      setVisible(false); // Close modal after submission
      resetForm(); // Reset the form after submission
    } catch (error) {
      console.error('Error submitting maintenance:', error);
      alert('Failed to submit maintenance');
    }
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} centered>
      <CModalHeader>
        <CModalTitle>{editingMaintenance ? 'Edit Maintenance' : 'Add Maintenance'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="mb-3">
          <CCol xs={12}>
            <CFormLabel htmlFor="tenant">Tenant Name</CFormLabel>
            <CFormInput
              id="tenant"
              type="text"
              placeholder="Enter tenant name"
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
              invalid={!!errors.tenant}
            />
            <CFormFeedback invalid>{errors.tenant}</CFormFeedback>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={12}>
            <CFormLabel htmlFor="property">Property Name</CFormLabel>
            <CFormInput
              id="property"
              type="text"
              placeholder="Enter property name"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              invalid={!!errors.property}
            />
            <CFormFeedback invalid>{errors.property}</CFormFeedback>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={12}>
            <CFormLabel htmlFor="typeOfRequest">Type of Request</CFormLabel>
            <CFormInput
              id="typeOfRequest"
              type="text"
              placeholder="Enter type of request"
              value={typeOfRequest}
              onChange={(e) => setTypeOfRequest(e.target.value)}
              invalid={!!errors.typeOfRequest}
            />
            <CFormFeedback invalid>{errors.typeOfRequest}</CFormFeedback>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={12}>
            <CFormLabel htmlFor="description">Description</CFormLabel>
            <CFormInput
              id="description"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              invalid={!!errors.description}
            />
            <CFormFeedback invalid>{errors.description}</CFormFeedback>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={12}>
            <CFormLabel htmlFor="urgencyLevel">Urgency Level</CFormLabel>
            <CFormInput
              id="urgencyLevel"
              type="text"
              placeholder="Enter urgency level"
              value={urgencyLevel}
              onChange={(e) => setUrgencyLevel(e.target.value)}
              invalid={!!errors.urgencyLevel}
            />
            <CFormFeedback invalid>{errors.urgencyLevel}</CFormFeedback>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={12}>
            <CFormLabel htmlFor="preferredAccessTimes">Preferred Access Times</CFormLabel>
            <CFormInput
              id="preferredAccessTimes"
              type="text"
              placeholder="Enter preferred access times (optional)"
              value={preferredAccessTimes}
              onChange={(e) => setPreferredAccessTimes(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={12}>
            <CFormLabel htmlFor="photosOrVideos">Upload Photos/Videos</CFormLabel>
            <CFormInput
              id="photosOrVideos"
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            {photosOrVideos.length > 0 && (
              <div className="mt-2">
                <strong>Selected Files:</strong>
                <ul>
                  {photosOrVideos.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
        <CButton color="primary" onClick={handleSubmit}>Submit</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddMaintenance;
