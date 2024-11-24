import React, { useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CPagination,
  CPaginationItem,
  CCollapse,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilPencil, cilTrash, cilPlus, cilMinus } from '@coreui/icons';
import PropTypes from 'prop-types';

const AgreementTable = ({
  agreements,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  handlePageChange,
  itemsPerPage,
}) => {
  const [expandedRows, setExpandedRows] = useState({});
  const indexOfFirstAgreement = (currentPage - 1) * itemsPerPage; // Use it here


  const toggleRow = (agreementId) => {
    if (!agreementId) return;
    setExpandedRows(prev => ({
      ...prev,
      [agreementId]: !prev[agreementId]
    }));
  };
  

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };


  return (
    <div className="table-responsive">
      <CTable hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Tenant</CTableHeaderCell>
            <CTableHeaderCell>Property</CTableHeaderCell>
            <CTableHeaderCell>Lease Start</CTableHeaderCell>
            <CTableHeaderCell>Lease End</CTableHeaderCell>
            <CTableHeaderCell>Rent Amount</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        {agreements
  .filter((agreement) => agreement && agreement._id) // Filter out invalid entries
  .map((agreement, index) => (
    <React.Fragment key={agreement._id || `row-${index}`}>
      <CTableRow>
        <CTableDataCell>{(currentPage - 1) * itemsPerPage + index + 1}</CTableDataCell>
        <CTableDataCell>{agreement.tenant?.tenantName || 'N/A'}</CTableDataCell>
        <CTableDataCell>{agreement.property?.title || 'N/A'}</CTableDataCell>
        <CTableDataCell>{agreement.leaseStart || 'N/A'}</CTableDataCell>
        <CTableDataCell>{agreement.leaseEnd || 'N/A'}</CTableDataCell>
        <CTableDataCell>${agreement.rentAmount || 'N/A'}</CTableDataCell>
      <CTableDataCell>
  <div className="d-flex gap-2">
    <CButton
      color="light"
      size="sm"
      onClick={() => onEdit(agreement)}
      title="Edit"
    >
      <CIcon icon={cilPencil} />
    </CButton>
    <CButton
      color="danger"
      size="sm"
      onClick={() => onDelete(agreement._id)} // Pass the correct ID here
      title="Delete"
    >
      <CIcon icon={cilTrash} />
    </CButton>
    <CButton
      color="light"
      size="sm"
      onClick={() => toggleRow(agreement._id)}
      title={expandedRows[agreement._id] ? 'Collapse' : 'Expand'}
    >
      <CIcon icon={expandedRows[agreement._id] ? cilMinus : cilPlus} />
    </CButton>
  </div>
</CTableDataCell>
              </CTableRow>
              <CTableRow>
        <CTableDataCell colSpan="7" className="p-0">
          <CCollapse visible={expandedRows[agreement._id]}>
            <div className="p-3 bg-light">
                      <div>
                        <strong>Security Deposit:</strong> ${agreement.securityDeposit || 'N/A'}
                      </div>
                      <div>
                        <strong>Payment Terms:</strong>{' '}
                        {agreement.paymentTerms?.dueDate || 'N/A'} -{' '}
                        {agreement.paymentTerms?.paymentMethod || 'N/A'}
                      </div>
                      <div>
                        <strong>Rules and Conditions:</strong>{' '}
                        {agreement.rulesAndConditions || 'N/A'}
                      </div>
                      <div>
                        <strong>Additional Occupants:</strong>{' '}
                        {agreement.additionalOccupants?.join(', ') || 'N/A'}
                      </div>
                      <div>
                        <strong>Utilities and Services:</strong>{' '}
                        {agreement.utilitiesAndServices || 'N/A'}
                      </div>
                      <div>
                        <strong>Documents:</strong>{' '}
                        {agreement.documents?.map((doc, idx) => (
                          <span key={idx}>
                            <a href={doc} target="_blank" rel="noopener noreferrer">
                              Document {idx + 1}
                            </a>
                            {idx < agreement.documents.length - 1 && ', '}
                          </span>
                        )) || 'N/A'}
                      </div>
                      </div>
          </CCollapse>
        </CTableDataCell>
      </CTableRow>
    </React.Fragment>
  ))}
        </CTableBody>
      </CTable>

      {/* Pagination */}
      <CPagination className="mt-3">
        <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
          &laquo;
        </CPaginationItem>
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lsaquo;
        </CPaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <CPaginationItem
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &rsaquo;
        </CPaginationItem>
        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          &raquo;
        </CPaginationItem>
      </CPagination>
    </div>
  );
};

AgreementTable.propTypes = {
  agreements: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      tenant: PropTypes.shape({
        tenantName: PropTypes.string.isRequired,
      }),
      property: PropTypes.shape({
        propertyName: PropTypes.string.isRequired,
      }),
      leaseStart: PropTypes.string.isRequired,
      leaseEnd: PropTypes.string.isRequired,
      rentAmount: PropTypes.number.isRequired,
      securityDeposit: PropTypes.number,
      paymentTerms: PropTypes.shape({
        dueDate: PropTypes.string,
        paymentMethod: PropTypes.string,
      }),
      rulesAndConditions: PropTypes.string,
      additionalOccupants: PropTypes.arrayOf(PropTypes.string),
      utilitiesAndServices: PropTypes.string,
      documents: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default AgreementTable;
