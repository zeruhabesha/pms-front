import React, { useEffect, useState } from 'react';
import {
<<<<<<< HEAD
  CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CTable,
  CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell,
  CFormInput
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import AddUser from './AddUser';
import EditPhotoModal from '../EditPhotoModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../api/actions/userAction';

const ViewUser = () => {
  const dispatch = useDispatch();
  const { users = [], loading, totalUsers } = useSelector((state) => state.user);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editPhotoVisible, setEditPhotoVisible] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
=======
  CRow, CCol, CCard, CCardHeader, CCardBody, CAlert,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers, deleteUser, addUser, updateUser, uploadUserPhoto,
} from '../../api/actions/userActions';
import UserTable from './UserTable';
import UserModal from './UserModal';
import UserDeleteModal from './UserDeleteModal';
import EditPhotoModal from '../EditPhotoModal';
import { ToastContainer, toast } from 'react-toastify';
import './User.scss';
import '../Super.scss';
import 'react-toastify/dist/ReactToastify.css';

const ViewUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editPhotoVisible, setEditPhotoVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const itemsPerPage = 5;
  const [localCurrentPage, setLocalCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { users, loading, totalUsers, totalPages, error } = useSelector((state) => state.user);

  // // Handle page change
  // const handlePageChange = (page) => {
  //   if (page < 1 || page > totalPages) return;
  //   setLocalCurrentPage(page);
  // };

  // Fetch users based on page and search term
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUsers({ 
          page: localCurrentPage, 
          limit: itemsPerPage, 
          search: searchTerm.trim() 
        }));
      } catch (err) {
        setErrorMessage(err?.message || 'Failed to fetch users');
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300); // Add debounce for search

    return () => clearTimeout(timeoutId);
  }, [dispatch, localCurrentPage, searchTerm, itemsPerPage]);
  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setLocalCurrentPage(1); // Reset to the first page on search
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserModalVisible(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteUser(userToDelete._id)).unwrap();
      toast.success('User deleted successfully');
      handlePageChange(localCurrentPage); // Refetch users after deletion
      setDeleteModalVisible(false);
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleEditPhoto = (user) => {
    setUserToEdit(user);
    setEditPhotoVisible(true);
  };

  const handleSavePhoto = async (photoFile) => {
    if (userToEdit) {
      await dispatch(uploadUserPhoto({ id: userToEdit._id, photo: photoFile }));
      await dispatch(fetchUsers({ page: localCurrentPage, limit: itemsPerPage, search: searchTerm }));
      setEditPhotoVisible(false);
      toast.success('Photo updated successfully');
    }
  };

  const handleSave = async (updatedData) => {
    try {
      await dispatch(updateUser({ id: editingUser._id, userData: updatedData })).unwrap();
      dispatch(fetchUsers({ page: localCurrentPage, limit: itemsPerPage, search: searchTerm }));
      setUserModalVisible(false);
      toast.success('User updated successfully');
    } catch (error) {
      setErrorMessage(error.message);
      toast.error('Failed to update user');
      console.error('Failed to update user:', error);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await dispatch(addUser(userData)).unwrap();
      dispatch(fetchUsers({ page: localCurrentPage, limit: itemsPerPage, search: searchTerm }));
      toast.success('User added successfully');
      setUserModalVisible(false);
    } catch (error) {
      console.error('Full error details:', error);
      const detailedError = error.response?.data?.message || error.message || 'An unexpected error occurred';
      setErrorMessage(detailedError);
      toast.error(detailedError);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setLocalCurrentPage(page);
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
  };

  const handleSavePermissions = async (updatedUser) => {
    try {
      // Dispatching action to update user with updated permissions
      await dispatch(updateUser(updatedUser)).unwrap();
  
      // Fetch users again after updating the permissions
      dispatch(fetchUsers({
        page: localCurrentPage,
        limit: itemsPerPage,
        search: searchTerm
      }));
  
      // Close the permissions modal and show a success message
      setPermissionsModalVisible(false);
      toast.success('Permissions updated successfully');
    } catch (error) {
      toast.error('Failed to update permissions');
      console.error('Failed to update permissions:', error);
    }
  };
  
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>User Management</strong>
            <button
              className="learn-more"
<<<<<<< HEAD
              onClick={() => { setEditingUser(null); setVisible(true); }}
=======
              onClick={() => {
                setEditingUser(null);
                setUserModalVisible(true);
              }}
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
            >
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Add User</span>
            </button>
          </CCardHeader>
          <CCardBody>
<<<<<<< HEAD
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
                  {users.map((user, index) => (
                    <CTableRow key={user.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>
                        <img src={user.photo || 'placeholder.png'} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        <CButton color="secondary" size="sm" className="ms-2" onClick={() => setEditPhotoVisible(true)}>
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
                          backgroundColor: user.status === 'active' ? 'green' : 'red',
                          color: 'white', padding: '5px 10px', borderRadius: '5px'
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
            <div className="d-flex justify-content-between mt-3">
              <CButton disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </CButton>
              <CButton disabled={currentPage === Math.ceil(totalUsers / itemsPerPage)} onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </CButton>
            </div>
            <div className="text-center mt-2">Page {currentPage} of {Math.ceil(totalUsers / itemsPerPage)}</div>
=======
            {error && (
              <CAlert color="danger" className="mb-4">
                {error.message || 'An error occurred'}
              </CAlert>
            )}
            {errorMessage && (
              <CAlert color="danger" className="mb-4">
                {errorMessage}
              </CAlert>
            )}
           <UserTable
  users={users || []}
  currentPage={localCurrentPage}
  totalPages={totalPages}
  searchTerm={searchTerm}
  setSearchTerm={handleSearch}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
  handleEditPhoto={handleEditPhoto}
  handlePageChange={handlePageChange}
  loading={loading}
  itemsPerPage={itemsPerPage}
  handleSavePermissions={handleSavePermissions}  // Pass this function
/>

>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modals */}
      {userModalVisible && (
        <UserModal
          visible={userModalVisible}
          setVisible={setUserModalVisible}
          editingUser={editingUser}
          handleSave={handleSave}
          handleAddUser={handleAddUser}
        />
      )}
      <UserDeleteModal
        visible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        userToDelete={userToDelete}
        confirmDelete={confirmDelete}
      />
      <EditPhotoModal
        visible={editPhotoVisible}
        setVisible={setEditPhotoVisible}
        admin={userToEdit}
        onSavePhoto={handleSavePhoto}
      />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </CRow>
  );
};

export default ViewUser;
