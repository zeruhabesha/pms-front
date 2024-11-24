// MaintenanceTableRow.js
import React, { useState } from 'react';
import {
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const MaintenanceTableRow = ({ maintenance, index, onEdit, onDelete, expandedRows, toggleRowExpansion }) => {
  const [isExpanded, setIsExpanded] = useState(expandedRows[maintenance.id]);

  const handleMore = () => {
    toggleRowExpansion(maintenance.id);
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <CTableRow>
        <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
        <CTableDataCell>{maintenance.tenant}</CTableDataCell>
        <CTableDataCell>{maintenance.property}</CTableDataCell>
        <CTableDataCell>{maintenance.typeOfRequest}</CTableDataCell>
        <CTableDataCell>{maintenance.urgencyLevel}</CTableDataCell>
        <CTableDataCell>
          <span style={{ backgroundColor: maintenance.status === 'Pending' ? 'orange' : 'green', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
            {maintenance.status}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <CButton color="secondary" size="sm" onClick={handleMore}>
            <FontAwesomeIcon icon={isExpanded ? faEyeSlash : faEye} />
          </CButton>
          <CButton color="secondary" size="sm" onClick={() => onEdit(maintenance)}>
            <FontAwesomeIcon icon={faEdit} />
          </CButton>
          <CButton color="danger" size="sm" onClick={() => onDelete(maintenance.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </CButton>
        </CTableDataCell>
      </CTableRow>

      {isExpanded && (
        <CTableRow>
          <CTableDataCell colSpan={8}>
            <h4>Description:</h4>
            {maintenance.description}
            <h4>Photos:</h4>
            {maintenance.photos.map((photo, idx) => (
              <img key={idx} src={photo} alt={`Photo ${idx}`} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            ))}
            <h4>Video:</h4>
            <video controls style={{ width: '100%' }}>
              <source src={maintenance.video} type="video/mp4" />
            </video>
          </CTableDataCell>
        </CTableRow>
      )}
    </>
  );
};

export default MaintenanceTableRow;
