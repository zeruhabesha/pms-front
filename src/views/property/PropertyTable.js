<<<<<<< HEAD
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
=======
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import PropertyTableRow from './PropertyTableRow';

const PropertyTable = ({
  properties,
  onEdit,
  onDelete,
  onView,
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
}) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationItems = () => {
    const range = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const end = Math.min(start + maxPagesToShow - 1, totalPages);

    if (start > 1) {
      range.push(
        <CPaginationItem key="start-ellipsis" disabled>
          ...
        </CPaginationItem>
      );
    }

    for (let i = start; i <= end; i++) {
      range.push(
        <CPaginationItem
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </CPaginationItem>
      );
    }

    if (end < totalPages) {
      range.push(
        <CPaginationItem key="end-ellipsis" disabled>
          ...
        </CPaginationItem>
      );
    }

    return range;
  };

>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
  return (
    <>
      <CTable>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Title</CTableHeaderCell>
<<<<<<< HEAD
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Type</CTableHeaderCell>
=======
            <CTableHeaderCell>Price</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Property Type</CTableHeaderCell>
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {properties.map((property, index) => (
            <PropertyTableRow
<<<<<<< HEAD
              key={property.id}
              index={index + 1 + (currentPage - 1) * 5}
              property={property}
              onEdit={onEdit}
              onDelete={onDelete}
=======
              key={property._id || index}
              index={index + 1 + (currentPage - 1) * itemsPerPage}
              property={property}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
            />
          ))}
        </CTableBody>
      </CTable>
<<<<<<< HEAD
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
=======

      <CPagination className="mt-3">
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          &laquo;
        </CPaginationItem>
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lsaquo;
        </CPaginationItem>

        {getPaginationItems()}

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
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
    </>
  );
};

export default PropertyTable;
