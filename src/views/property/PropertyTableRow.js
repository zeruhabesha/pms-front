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

export default PropertyTableRow;
