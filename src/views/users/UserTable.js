import React, { useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CPagination,
  CPaginationItem,
  CFormInput,
  CCollapse,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react'; 
import { cilPencil, cilTrash, cilCheckCircle, cilXCircle, cilPlus, cilMinus, cilShieldAlt } from '@coreui/icons';
import placeholder from '../image/placeholder.png';
import PermissionsModal from './PermissionsModal'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

const UserTable = ({
  users,
  currentPage,
  totalPages, // Add this prop
  searchTerm,
  setSearchTerm,
  handleEdit,
  handleDelete,
  handleEditPhoto,
  handlePageChange,
  itemsPerPage = 5,
}) => {

  const [expandedRows, setExpandedRows] = useState({});
  const [permissionsModalVisible, setPermissionsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const toggleRow = (userId) => {
    setExpandedRows(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };
  // Calculate total pages based on search term and filtered users
  const calculateTotalPages = () => {
    const filteredUsers = searchTerm
      ? users.filter(user => 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : users; // If no search term, use all users.

    return Math.ceil(filteredUsers.length / itemsPerPage); // Calculate total pages based on filtered list
  };


  const validTotalPages = Math.max(1, totalPages);
  const currentItems = users; // The parent component now sends the correct page of items

  // Get the current page's users (paginated)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  // Render pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (validTotalPages <= maxVisiblePages) {
      for (let i = 1; i <= validTotalPages; i++) {
        items.push(
          <CPaginationItem
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </CPaginationItem>
        );
      }
      return items;
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(validTotalPages, startPage + maxVisiblePages - 1);

    if (endPage === validTotalPages) {
      startPage = Math.max(1, validTotalPages - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <CPaginationItem
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </CPaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <CPaginationItem key="start-ellipsis" disabled>
            ...
          </CPaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <CPaginationItem
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </CPaginationItem>
      );
    }

    if (endPage < validTotalPages) {
      if (endPage < validTotalPages - 1) {
        items.push(
          <CPaginationItem key="end-ellipsis" disabled>
            ...
          </CPaginationItem>
        );
      }
      items.push(
        <CPaginationItem
          key={validTotalPages}
          active={validTotalPages === currentPage}
          onClick={() => handlePageChange(validTotalPages)}
        >
          {validTotalPages}
        </CPaginationItem>
      );
    }

    return items;
  };

  const handlePermissionsClick = (user) => {
    setSelectedUser(user);
    setPermissionsModalVisible(true);
  };

  const handlePermissionsClose = () => {
    setPermissionsModalVisible(false);
    setSelectedUser(null);
  };

  const handlePermissionsSave = async (updatedUser) => {
    try {
      await dispatch(updateUserPermissions({ userId: updatedUser._id, permissions: updatedUser.permissionStatus })).unwrap();
      toast.success('Permissions updated successfully!');
      setPermissionsModalVisible(false);
      dispatch(fetchUsers({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
    } catch (error) {
      toast.error('Failed to update permissions');
    }
  };
  
  
  const renderExpandedContent = (user) => (
    <CTableRow>
      <CTableDataCell colSpan="7">
        <CCollapse visible={expandedRows[user._id]}>
          <div className="p-3 bg-light">
            <h6>Additional User Details</h6>
            <div className="row">
              <div className="col-md-6">
                <p><strong>User ID:</strong> {user._id}</p>
                <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                <p><strong>Department:</strong> {user.department || 'N/A'}</p>
              </div>
            </div>
          </div>
        </CCollapse>
      </CTableDataCell>
    </CTableRow>
  );

  return (
    <div>
       <CFormInput
        type="text"
        placeholder="Search by name, email, or role"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <div className="table-responsive">
        <CTable >
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Photo</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Role</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user, index) => user && (
              <React.Fragment key={user._id || `row-${index}`}>
                <CTableRow>
                  <CTableDataCell>{(currentPage - 1) * itemsPerPage + index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <img
                      src={user?.photo ? `http://localhost:4000/api/v1/users/${user._id}/photo` : placeholder}
                      alt="User"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      className="me-2"
                    />
                    <CButton color="light" size="sm" onClick={() => handleEditPhoto(user)} title="Edit photo">
                      <CIcon icon={cilPencil} />
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>{user?.name || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{user?.email || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{user?.role || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {user?.status?.toLowerCase() === 'active' ? (
                      <CIcon icon={cilCheckCircle} className="text-success" title="Active" />
                    ) : (
                      <CIcon icon={cilXCircle} className="text-danger" title="Inactive" />
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="light" size="sm" className="me-2" onClick={() => handlePermissionsClick(user)} title="Permissions">
                      <CIcon icon={cilShieldAlt} />
                    </CButton>
                    <CButton color="light" size="sm" className="me-2" onClick={() => handleEdit(user)} title="Edit">
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton color="danger" size="sm" className="me-2" onClick={() => handleDelete(user)} title="Delete">
                      <CIcon icon={cilTrash} />
                    </CButton>
                    <CButton 
                      color="light" 
                      size="sm" 
                      onClick={() => toggleRow(user._id)} 
                      title={expandedRows[user._id] ? 'Collapse' : 'Expand'}
                    >
                      <CIcon icon={expandedRows[user._id] ? cilMinus : cilPlus} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
                {renderExpandedContent(user)}
              </React.Fragment>
            ))}
          </CTableBody>
        </CTable>
      </div>

      {/* Pagination */}
      <CPagination className="mt-3" aria-label="Page navigation">
        <CPaginationItem
          aria-label="Previous"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <span aria-hidden="true">&lsaquo;</span>
        </CPaginationItem>

        {renderPaginationItems()}

        <CPaginationItem
          disabled={currentPage === validTotalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span aria-hidden="true">&rsaquo;</span>
        </CPaginationItem>
        <CPaginationItem
          aria-label="Next"
          disabled={currentPage === validTotalPages}
          onClick={() => handlePageChange(validTotalPages)}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>

      {/* Permissions Modal */}
      {selectedUser && (
        // <PermissionsModal
        //   visible={permissionsModalVisible}
        //   user={selectedUser}
        //   onClose={handlePermissionsClose}
        //   onSavePermissions={(user) => {
        //     console.log('Permissions saved for user:', user);
        //     handlePermissionsClose();
        //   }}
        // />
        <PermissionsModal
  visible={permissionsModalVisible}
  user={selectedUser}
  onClose={handlePermissionsClose}
  handleSavePermissions={handlePermissionsSave} // Pass the correct function
/>

      )}

<ToastContainer position="top-right" autoClose={3000} hideProgressBar />

    </div>
  );
};

export default UserTable;
