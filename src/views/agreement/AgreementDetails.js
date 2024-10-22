import React from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

const AgreementDetails = ({ visible, setVisible, agreement }) => {
  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Agreement Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {agreement && (
          <div>
            <strong>Tenant:</strong> {agreement.tenant}<br />
            <strong>Property:</strong> {agreement.property}<br />
            <strong>Lease Start:</strong> {agreement.leaseStart}<br />
            <strong>Lease End:</strong> {agreement.leaseEnd}<br />
            <strong>Rent Amount:</strong> ${agreement.rentAmount}<br />
            <strong>Security Deposit:</strong> ${agreement.securityDeposit}<br />
            <strong>Payment Terms:</strong><br />
            <p>Due Date: {agreement.paymentTerms.dueDate}</p>
            <p>Payment Method: {agreement.paymentTerms.paymentMethod}</p>
            <strong>Rules and Conditions:</strong>
            <p>{agreement.rulesAndConditions}</p>
            <strong>Additional Occupants:</strong>
            <p>{agreement.additionalOccupants.join(', ') || 'None'}</p>
            <strong>Utilities and Services:</strong>
            <p>{agreement.utilitiesAndServices}</p>
            <strong>Documents:</strong>
            <ul>
              {agreement.documents.map((doc, idx) => (
                <li key={idx}>
                  <a href={doc} download rel="noopener noreferrer">
                    Download Document {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AgreementDetails;
