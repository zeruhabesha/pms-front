// src/components/PropertyTable.js
import React from 'react';
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
} from '@coreui/react';
import PropertyTableRow from './PropertyTableRow';

const PropertyTable = ({ properties, onEdit, onDelete, currentPage, setCurrentPage, totalPages }) => {
  return (
    <>
      <CTable>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Title</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {properties.map((property, index) => (
            <PropertyTableRow
              key={property.id}
              index={index + 1 + (currentPage - 1) * 5}
              property={property}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </CTableBody>
      </CTable>
      <div className="d-flex justify-content-between mt-3">
        <CButton disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </CButton>
        <CButton disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
          Next
        </CButton>
      </div>
      <div className="text-center mt-2">
        Page {currentPage} of {totalPages}
      </div>
    </>
  );
};

export default PropertyTable;
