import React, { useState } from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput } from '@coreui/react';

const EditPhotoModal = ({ visible, setVisible, admin, onSavePhoto }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State to store the selected photo

  // Handle photo file selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file); // Store the selected file
    }
  };

  // Handle save photo logic (e.g., uploading the photo)
  const handleSave = () => {
    if (selectedPhoto) {
      // Call the provided onSavePhoto function (passed as prop) with the selected file
      onSavePhoto(selectedPhoto);
      setVisible(false); // Close the modal after saving
    } else {
      alert('Please select a photo to upload.');
    }
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Edit Photo for {admin?.name}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput type="file" onChange={handlePhotoChange} accept="image/*" />
        {selectedPhoto && (
          <div className="mt-3">
            <img
              src={URL.createObjectURL(selectedPhoto)}
              alt="Selected"
              style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
        <CButton color="primary" onClick={handleSave}>Save</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditPhotoModal;
