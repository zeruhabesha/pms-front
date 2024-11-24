import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilFullscreen } from '@coreui/icons';

const PropertyDetails = ({ viewingProperty, handlePhotoDelete, handlePhotoUpdate }) => {
  const [expandedImage, setExpandedImage] = useState(null); // State to hold the image to be displayed in full-screen
  const [isFullscreenModalVisible, setFullscreenModalVisible] = useState(false); // Modal visibility state

  // Handle expand image to full-screen
  const handleExpandImage = (photo) => {
    setExpandedImage(photo);
    setFullscreenModalVisible(true); // Show the full-screen modal
  };

  // Handle closing the full-screen modal
  const handleCloseFullscreen = () => {
    setFullscreenModalVisible(false);
    setExpandedImage(null); // Reset the expanded image
  };

  return (
    <div>
      {viewingProperty.photos && viewingProperty.photos.length > 0 ? (
        viewingProperty.photos.map((photo, index) => (
          <div key={index} className="photo-container" style={{ marginBottom: '10px' }}>
            <img
              src={`http://localhost:4000/api/v1/properties/${viewingProperty._id}/photos/${photo}`}
              alt={`Property Photo ${index + 1}`}
              style={{ width: '100%', maxWidth: '200px', margin: '5px' }}
            />
            <div className="photo-buttons">
              <CButton
                color="light"
                size="sm"
                onClick={() => handlePhotoDelete(photo)}
                className="me-2"
              >
                <CIcon icon={cilTrash} />
              </CButton>
              <CButton
                color="light"
                size="sm"
                onClick={() => {
                  setPhotoToUpdate(photo);
                  setNewPhoto(null);
                }}
              >
                <CIcon icon={cilPencil} />
              </CButton>
              {/* Add button to expand image */}
              <CButton
                color="light"
                size="sm"
                onClick={() => handleExpandImage(photo)}
              >
                <CIcon icon={cilFullscreen} />
              </CButton>
            </div>
          </div>
        ))
      ) : (
        <p>No photos available</p>
      )}

      {/* Full-Screen Image Modal */}
      <CModal visible={isFullscreenModalVisible} onClose={handleCloseFullscreen} size="lg">
        <CModalHeader>
          <CModalTitle>Full-Screen Image</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {expandedImage && (
            <img
              src={`http://localhost:4000/api/v1/properties/${viewingProperty._id}/photos/${expandedImage}`}
              alt="Expanded Property Photo"
              style={{ width: '100%' }}
            />
          )}
        </CModalBody>
      </CModal>
    </div>
  );
};

export default PropertyDetails;
