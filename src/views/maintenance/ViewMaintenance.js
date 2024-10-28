import React, { useState, useEffect } from 'react';
import '../Super.scss';
import {
  CRow,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
} from '@coreui/react';
import AddMaintenance from './AddMaintenance'; // Import the AddMaintenance modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import '../Super.scss';

const ViewMaintenance = () => {
  // State for modal visibility and editing
  const [visible, setVisible] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState(null);
  const [expandedRows, setExpandedRows] = useState({}); // Track which rows are expanded

  // State for search term and maintenance data
  const [searchTerm, setSearchTerm] = useState('');
  const [maintenanceData, setMaintenanceData] = useState([]); // Initialize with an empty array

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define how many items to display per page

  // Sample maintenance data to replace with API call later
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        tenant: 'Tenant A',
        property: 'Property A',
        typeOfRequest: 'Plumbing',
        description: 'Leak in kitchen sink.',
        urgencyLevel: 'Urgent',
        preferredAccessTimes: 'Weekdays 9am-5pm',
        status: 'Pending',
        photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
        video: 'https://example.com/video.mp4',
      },
      {
        id: 2,
        tenant: 'Tenant B',
        property: 'Property B',
        typeOfRequest: 'Electrical',
        description: 'Light fixture repair.',
        urgencyLevel: 'Routine',
        preferredAccessTimes: 'Weekends',
        status: 'Completed',
        photos: ['https://example.com/photo3.jpg'],
        video: 'https://example.com/video2.mp4',
      },
      // Add more sample data as needed...
    ];
    setMaintenanceData(sampleData);
  }, []);

  // Filter maintenance data based on the search term
  const filteredMaintenanceData = maintenanceData.filter(
    (maintenance) =>
      maintenance.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.typeOfRequest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredMaintenanceData.length / itemsPerPage);

  // Get current maintenance entries for the current page
  const indexOfLastMaintenance = currentPage * itemsPerPage;
  const indexOfFirstMaintenance = indexOfLastMaintenance - itemsPerPage;
  const currentMaintenanceData = filteredMaintenanceData.slice(indexOfFirstMaintenance, indexOfLastMaintenance);

  // Function to handle Add button click
  const handleAdd = () => {
    setEditingMaintenance(null); // Clear editing data
    setVisible(true); // Show the modal
  };

  // Function to handle Edit button click
  const handleEdit = (maintenance) => {
    setEditingMaintenance(maintenance); // Set the maintenance being edited
    setVisible(true); // Show the modal
  };

  // Function to handle Delete action
  const handleDelete = (id) => {
    // Implement delete functionality (e.g., filter out the deleted maintenance)
    // console.log(Delete maintenance with id: ${id});
  };

  // Function to toggle the expanded state of a row
  const handleMore = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the boolean for this specific row
    }));
  };

  // Function to get status style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return { backgroundColor: 'orange', color: 'white', padding: '5px 10px', borderRadius: '5px' };
      case 'Completed':
        return { backgroundColor: 'green', color: 'white', padding: '5px 10px', borderRadius: '5px' };
      case 'In Progress':
        return { backgroundColor: 'blue', color: 'white', padding: '5px 10px', borderRadius: '5px' };
      case 'Cancelled':
        return { backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px' };
      default:
        return {};
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Maintenance</strong>
            <div id="container">
            <button
          className="learn-more"
          onClick={handleAdd}>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Add Maintenance</span>
        </button>
        </div>
          </CCardHeader>
          <CCardBody>
            {/* Search Box */}
            <CFormInput
              type="text"
              placeholder="Search by property name, description, or status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <div className="table-responsive">
              <CTable>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tenant</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Property</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Type of Request</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Urgency Level</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentMaintenanceData.map((maintenance, index) => (
                    <React.Fragment key={maintenance.id}>
                      <CTableRow>
                        <CTableHeaderCell scope="row">{index + indexOfFirstMaintenance + 1}</CTableHeaderCell>
                        <CTableDataCell>{maintenance.tenant}</CTableDataCell>
                        <CTableDataCell>{maintenance.property}</CTableDataCell>
                        <CTableDataCell>{maintenance.typeOfRequest}</CTableDataCell>
                        <CTableDataCell>{maintenance.urgencyLevel}</CTableDataCell>
                        <CTableDataCell>
                          <span style={getStatusStyle(maintenance.status)}>
                            {maintenance.status}
                          </span>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton color="secondary"  size="sm" className="me-2" onClick={() => handleMore(maintenance.id)}>
                            <FontAwesomeIcon icon={expandedRows[maintenance.id] ? faEyeSlash : faEye} />
                          </CButton>
                          <CButton color="secondary" size="sm" className="me-2" onClick={() => handleEdit(maintenance)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </CButton>
                          <CButton color="danger" size="sm" onClick={() => handleDelete(maintenance.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </CButton>

                        </CTableDataCell>
                      </CTableRow>

                      {/* Show additional content if the row is expanded */}
                      {expandedRows[maintenance.id] && (
                        <CTableRow>
                          <CTableDataCell colSpan={8} className="more-content">
                          <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                          {maintenance.description}
                            <h4>Photos:</h4>
                            {maintenance.photos.map((photo, index) => (
                              <img key={index} src={photo} alt={`Photo ${index}`} className="maintenance-photo" />
                            ))}
                            <h4>Video:</h4>
                            <video controls className="maintenance-video">
                              <source src={maintenance.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </CTableDataCell>
                        </CTableRow>
                      )}
                    </React.Fragment>
                  ))}
                </CTableBody>
              </CTable>
            </div>
            {/* Pagination Controls */}
            <div className="d-flex justify-content-between mt-3">
              <CButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </CButton>
              <CButton
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </CButton>
            </div>
            <div className="text-center mt-2">
              Page {currentPage} of {totalPages}
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal to Add/Edit Maintenance */}
      <AddMaintenance visible={visible} setVisible={setVisible} editingMaintenance={editingMaintenance} />
    </CRow>
  );
};

export default ViewMaintenance;
