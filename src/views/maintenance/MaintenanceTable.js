import React from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';

const MaintenanceTable = ({ 
  maintenanceData = [], // Provide default empty array
  onEdit, 
  onDelete, 
  expandedRows, 
  toggleRowExpansion 
}) => {
  // Check if maintenanceData is valid and convert to array if needed
  const data = Array.isArray(maintenanceData) ? maintenanceData : [];

  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>ID</CTableHeaderCell>
          <CTableHeaderCell>Tenant</CTableHeaderCell>
          <CTableHeaderCell>Property</CTableHeaderCell>
          <CTableHeaderCell>Type</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan="6" className="text-center">
              No maintenance records found
            </CTableDataCell>
          </CTableRow>
        ) : (
          data.map((maintenance) => (
            <React.Fragment key={maintenance._id}>
              <CTableRow>
                <CTableDataCell>{maintenance._id}</CTableDataCell>
                <CTableDataCell>{maintenance.tenant}</CTableDataCell>
                <CTableDataCell>{maintenance.property}</CTableDataCell>
                <CTableDataCell>{maintenance.typeOfRequest}</CTableDataCell>
                <CTableDataCell>{maintenance.status}</CTableDataCell>
                <CTableDataCell>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEdit(maintenance)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => onDelete(maintenance._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => toggleRowExpansion(maintenance._id)}
                  >
                    {expandedRows[maintenance._id] ? 'Less' : 'More'}
                  </button>
                </CTableDataCell>
              </CTableRow>
              {expandedRows[maintenance._id] && (
                <CTableRow>
                  <CTableDataCell colSpan="6">
                    <div className="p-3">
                      <h6>Description:</h6>
                      <p>{maintenance.description}</p>
                      <h6>Urgency Level:</h6>
                      <p>{maintenance.urgencyLevel}</p>
                      {maintenance.mediaUrl && (
                        <div>
                          <h6>Attached Media:</h6>
                          <img 
                            src={maintenance.mediaUrl} 
                            alt="Maintenance media" 
                            style={{ maxWidth: '200px' }} 
                          />
                        </div>
                      )}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              )}
            </React.Fragment>
          ))
        )}
      </CTableBody>
    </CTable>
  );
};

export default MaintenanceTable;