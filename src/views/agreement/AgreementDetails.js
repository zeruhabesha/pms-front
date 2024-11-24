import React from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import PropTypes from 'prop-types';

const AgreementDetails = ({ visible, onClose, agreement }) => {
  if (!agreement) return null;

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Agreement Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row g-3">
          <div className="col-md-6">
            <h6>Basic Information</h6>
            <dl className="row">
              <dt className="col-sm-4">Tenant</dt>
              <dd className="col-sm-8">{agreement.tenant}</dd>

              <dt className="col-sm-4">Property</dt>
              <dd className="col-sm-8">{agreement.property}</dd>

              <dt className="col-sm-4">Lease Period</dt>
              <dd className="col-sm-8">
                {agreement.leaseStart} - {agreement.leaseEnd}
              </dd>
            </dl>
          </div>

          <div className="col-md-6">
            <h6>Financial Details</h6>
            <dl className="row">
              <dt className="col-sm-4">Rent Amount</dt>
              <dd className="col-sm-8">${agreement.rentAmount}</dd>

              <dt className="col-sm-4">Security Deposit</dt>
              <dd className="col-sm-8">${agreement.securityDeposit}</dd>
            </dl>
          </div>

          <div className="col-12">
            <h6>Payment Terms</h6>
            <dl className="row">
              <dt className="col-sm-2">Due Date</dt>
              <dd className="col-sm-10">{agreement.paymentTerms.dueDate}</dd>

              <dt className="col-sm-2">Method</dt>
              <dd className="col-sm-10">{agreement.paymentTerms.paymentMethod}</dd>
            </dl>
          </div>

          <div className="col-12">
            <h6>Additional Details</h6>
            <dl className="row">
              <dt className="col-sm-2">Occupants</dt>
              <dd className="col-sm-10">
                {agreement.additionalOccupants?.length 
                  ? agreement.additionalOccupants.join(', ') 
                  : 'None'}
              </dd>

              <dt className="col-sm-2">Utilities</dt>
              <dd className="col-sm-10">{agreement.utilitiesAndServices}</dd>
            </dl>
          </div>

          <div className="col-12">
            <h6>Rules and Conditions</h6>
            <p className="mb-0">{agreement.rulesAndConditions}</p>
          </div>

          {agreement.documents?.length > 0 && (
            <div className="col-12">
              <h6>Documents</h6>
              <div className="list-group">
                {agreement.documents.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc}
                    className="list-group-item list-group-item-action"
                    download
                    rel="noopener noreferrer"
                  >
                    Document {idx + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

AgreementDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  agreement: PropTypes.shape({
    tenant: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    leaseStart: PropTypes.string.isRequired,
    leaseEnd: PropTypes.string.isRequired,
    rentAmount: PropTypes.number.isRequired,
    securityDeposit: PropTypes.number.isRequired,
    paymentTerms: PropTypes.shape({
      dueDate: PropTypes.string.isRequired,
      paymentMethod: PropTypes.string.isRequired
    }).isRequired,
    rulesAndConditions: PropTypes.string.isRequired,
    additionalOccupants: PropTypes.arrayOf(PropTypes.string),
    utilitiesAndServices: PropTypes.string,
    documents: PropTypes.arrayOf(PropTypes.string)
  })
};

export default AgreementDetails;