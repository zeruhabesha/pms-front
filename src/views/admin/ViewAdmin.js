import React, { useState } from 'react';
import '../Super.scss';
import { 
  CRow, 
  CButton, 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CCol, 
  CTable, 
  CTableBody, 
  CTableHead, 
  CTableHeaderCell, 
  CTableRow, 
  CTableDataCell, 
  CFormInput,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react'; // Correct import for CIcon
import { cilPencil, cilTrash } from '@coreui/icons'; // Correct icons import
import AddAdmin from './AddAdmin'; // Import the AddAdmin modal component
import EditPhotoModal from '../EditPhotoModal'; // Import the Edit Photo Modal component
import placeholder from '../image/placeholder.png';

const ViewAdmin = () => {
  // State to control the modal visibility
  const [visible, setVisible] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null); // State to track which admin is being edited
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [editPhotoVisible, setEditPhotoVisible] = useState(false); // State to control photo edit modal
  const itemsPerPage = 5; // Define items per page

  // Sample admin data
  const adminData = [
    { id: 1, name: 'Mark', email: 'mark@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jacob', email: 'jacob@example.com', role: 'Admin', status: 'Inactive' },
    { id: 3, name: 'Larry', email: 'larry@example.com', role: 'Admin', status: 'Active' },
    { id: 4, name: 'Martha', email: 'martha@example.com', role: 'Admin', status: 'Active' },
    { id: 5, name: 'Alice', email: 'alice@example.com', role: 'Admin', status: 'Inactive' },
    { id: 6, name: 'Bob', email: 'bob@example.com', role: 'Admin', status: 'Active' },
  ];

  // Filtered admin data based on search term
  const filteredAdminData = adminData.filter(
    admin =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastAdmin = currentPage * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentAdmins = filteredAdminData.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdminData.length / itemsPerPage);

  // Function to handle Edit button click and open modal
  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setVisible(true);
  };

  // Function to handle photo edit action
  const handleEditPhoto = () => {
    setEditPhotoVisible(true);
  };

  // Function to handle delete action
  const handleDelete = (id) => {
    // Implement delete functionality here (e.g., filter out the deleted admin)
    console.log(`Delete admin with id: ${id}`);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Admin</strong>
            <div id="container">
            <button
          className="learn-more"
          onClick={() => setVisible(true)}>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Add Admin</span>
        </button>
        </div>
          </CCardHeader>
          <CCardBody>
            {/* Search Box */}
            <CFormInput
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <div className="table-responsive">
              <CTable>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Photo</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentAdmins.map((admin, index) => (
                    <CTableRow key={admin.id}>
                      <CTableHeaderCell scope="row">{index + indexOfFirstAdmin + 1}</CTableHeaderCell>
                      <CTableDataCell>
                        <img src={placeholder} alt="Admin" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        <CButton color="secondary" size="sm" className="ms-2" title="Edit Photo" onClick={handleEditPhoto}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>{admin.name}</CTableDataCell>
                      <CTableDataCell>{admin.email}</CTableDataCell>
                      <CTableDataCell>{admin.role}</CTableDataCell>
                      <CTableDataCell>
                        <span style={{
                          backgroundColor: admin.status === 'Active' ? 'green' : 'red',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '5px',
                        }}>
                          {admin.status}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="dark" size="sm" className="me-2" onClick={() => handleEdit(admin)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(admin.id)}>
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
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

      {/* Modal to Add/Edit Admin */}
      <AddAdmin visible={visible} setVisible={setVisible} editingAdmin={editingAdmin} />

      {/* Modal to Edit Photo */}
      <EditPhotoModal visible={editPhotoVisible} setVisible={setEditPhotoVisible} />
    </CRow>
  );
};

export default ViewAdmin;