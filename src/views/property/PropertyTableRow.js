<<<<<<< HEAD
// src/components/PropertyTableRow.js
import React from 'react';
import { CTableRow, CTableHeaderCell, CTableDataCell, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';

const PropertyTableRow = ({ index, property, onEdit, onDelete }) => (
  <CTableRow>
    <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
    <CTableDataCell>{property.title}</CTableDataCell>
    <CTableDataCell>{property.description}</CTableDataCell>
    <CTableDataCell>{property.address}</CTableDataCell>
    <CTableDataCell>{property.propertyType}</CTableDataCell>
    <CTableDataCell>
      <CButton color="dark" size="sm" className="me-2" onClick={() => onEdit(property)}>
        <CIcon icon={cilPencil} />
      </CButton>
      <CButton color="danger" size="sm" onClick={() => onDelete(property.id)}>
        <CIcon icon={cilTrash} />
      </CButton>
    </CTableDataCell>
  </CTableRow>
);
=======
import React from 'react';
import { CTableRow, CTableHeaderCell, CTableDataCell, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash, cilSearch } from '@coreui/icons';

const PropertyTableRow = ({ index, property, onEdit, onDelete, onView }) => {
  const isEditable = !!(property && onEdit); // Ensure `property` and `onEdit` are valid

  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
      <CTableDataCell>{property?.title || 'N/A'}</CTableDataCell>
      <CTableDataCell>{property?.price || 'N/A'}</CTableDataCell>
      <CTableDataCell>{property?.address || 'N/A'}</CTableDataCell>
      <CTableDataCell>{property?.propertyType || 'N/A'}</CTableDataCell>
      <CTableDataCell>
        <CButton
          color="light"
          size="sm"
          className="me-2"
          onClick={() => onView(property)}
          title="View Property"
        >
          <CIcon icon={cilSearch} />
        </CButton>
        <CButton
          color="light"
          size="sm"
          className="me-2"
          onClick={() => onEdit(property)}
          title="Edit Property"
          disabled={!isEditable} // Button disabled if `property` or `onEdit` is invalid
        >
          <CIcon icon={cilPencil} />
        </CButton>
        <CButton
          color="light"
          style={{color:`red`}}
          size="sm"
          onClick={() => onDelete(property)}
          title="Delete Property"
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </CTableDataCell>
    </CTableRow>
  );
};
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3

export default PropertyTableRow;
