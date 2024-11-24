// AgreementDocModal.js
import React from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

const AgreementDocModal = ({ visible, onClose, documents }) => (
  <CModal visible={visible} onClose={onClose}>
    <CModalHeader>Documents</CModalHeader>
    <CModalBody>
      {documents && documents.length > 0 ? (
        documents.map((doc, idx) => (
          <p key={idx}>
            <a href={doc} target="_blank" rel="noopener noreferrer">
              Document {idx + 1}
            </a>
          </p>
        ))
      ) : (
        <p>No documents available.</p>
      )}
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" onClick={onClose}>Close</CButton>
    </CModalFooter>
  </CModal>
);

export default AgreementDocModal;
