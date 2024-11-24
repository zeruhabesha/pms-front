import React from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';
import PropTypes from 'prop-types';

const AgreementDocModal = ({ visible, onClose, documents = [] }) => (
  <CModal visible={visible} onClose={onClose}>
    <CModalHeader closeButton>Agreement Documents</CModalHeader>
    <CModalBody>
      {documents.length > 0 ? (
        <div className="list-group">
          {documents.map((doc, idx) => (
            <a
              key={idx}
              href={doc.url}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              {doc.name || `Document ${idx + 1}`}
              <span className="badge bg-primary rounded-pill">
                {doc.type || 'Download'}
              </span>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted">
          No documents available for this agreement.
        </div>
      )}
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" onClick={onClose}>
        Close
      </CButton>
    </CModalFooter>
  </CModal>
);

AgreementDocModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string
  }))
};

export default AgreementDocModal;