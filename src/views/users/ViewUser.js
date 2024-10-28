import React, { useState } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CFormInput,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react'; // Import CIcon for icons
import { cilPencil, cilTrash } from '@coreui/icons'; // Import necessary icons
import AddUser from './AddUser'; // Import the modal component
import EditPhotoModal from '../EditPhotoModal'; // Import the Edit Photo Modal component
import placeholder from '../image/placeholder.png'; // Placeholder image
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuperAdmins, deleteSuperAdmin, addSuperAdmin, updateSuperAdmin } from '../../api/actions/superAdminActions';

const ViewUser = () => {
  // State variables
  const dispatch = useDispatch();
  const { superAdmins = [], loading, totalUsers } = useSelector((state) => state.superAdmin);

  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // State to track which user is being edited
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [editPhotoVisible, setEditPhotoVisible] = useState(false); // State to control photo edit modal
  const itemsPerPage = 5; // Define items per page
  useEffect(() => {
    dispatch(fetchSuperAdmins(currentPage, 5, searchTerm));
  }, [dispatch, currentPage, searchTerm]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      dispatch(fetchSuperAdmins(page, 5, searchTerm));
    }
  };

  // useEffect(() => {
  //   dispatch(fetchSuperAdmins(currentPage, itemsPerPage, searchTerm));
  // }, [dispatch, currentPage, searchTerm]);

  // Log to check data structure of superAdmins
  useEffect(() => {
    console.log("superAdmins data:", superAdmins);
  }, [superAdmins]);
  // Sample user data reflecting the Mongoose schema
  const userData = [
    { id: 1, name: 'Mark', email: 'mark@example.com', role: 'User', phoneNumber: '123-456-7890', address: '123 Main St', status: 'Active', photo: placeholder },
    { id: 2, name: 'Jacob', email: 'jacob@example.com', role: 'Admin', phoneNumber: '098-765-4321', address: '456 Elm St', status: 'Inactive', photo: placeholder },
    { id: 3, name: 'Larry', email: 'larry@example.com', role: 'User', phoneNumber: '555-555-5555', address: '789 Oak St', status: 'Active', photo: placeholder },
    { id: 4, name: 'Martha', email: 'martha@example.com', role: 'SuperAdmin', phoneNumber: '444-444-4444', address: '321 Pine St', status: 'Active', photo: placeholder },
    { id: 5, name: 'Alice', email: 'alice@example.com', role: 'User', phoneNumber: '333-333-3333', address: '654 Maple St', status: 'Inactive', photo: placeholder },
    { id: 6, name: 'Bob', email: 'bob@example.com', role: 'Admin', phoneNumber: '222-222-2222', address: '987 Birch St', status: 'Active', photo: placeholder },
    // Add more sample data for testing
  ];

  // Filter user data based on the search term
  const filteredUserData = superAdmins.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUserData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUserData.length / itemsPerPage);

  // Function to handle Edit button click and open modal
  const handleEdit = (user) => {
    setEditingUser(user); // Set the user being edited
    setVisible(true); // Show the modal
  };

  // Function to handle photo editing
  const handleEditPhoto = (user) => {
    setEditingUser(user);
    setEditPhotoVisible(true);
  };

  // Function to handle delete action
  const handleDelete = (id) => {
    // Implement delete functionality here (e.g., filter out the deleted user)
    console.log(`Delete user with id: ${id}`);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>User Management</strong>
            <div id="container">
            <button
          className="learn-more"
          onClick={() => { setEditingUser(null); setVisible(true);}}>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Add User</span>
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
                    <CTableHeaderCell>Phone Number</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentUsers.map((user, index) => (
                    <CTableRow key={user.id}>
                      <CTableHeaderCell scope="row">{index + indexOfFirstUser + 1}</CTableHeaderCell>
                      <CTableDataCell>
                        <img src={user.photo} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        <CButton color="secondary" size="sm" className="ms-2" title="Edit Photo" onClick={() => handleEditPhoto(user)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>{user.role}</CTableDataCell>
                      <CTableDataCell>{user.phoneNumber}</CTableDataCell>
                      <CTableDataCell>{user.address}</CTableDataCell>
                      <CTableDataCell>
                        <span style={{
                          backgroundColor: user.status === 'Active' ? 'green' : 'red',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '5px',
                        }}>
                          {user.status}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="dark" size="sm" className="me-2" onClick={() => handleEdit(user)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(user.id)}>
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

      {/* Modal to Add/Edit User */}
      <AddUser visible={visible} setVisible={setVisible} editingUser={editingUser} />

      {/* Modal to Edit Photo */}
      <EditPhotoModal visible={editPhotoVisible} setVisible={setEditPhotoVisible} />
    </CRow>
  );
};

export default ViewUser;