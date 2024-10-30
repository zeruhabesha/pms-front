import React, { useEffect, useState } from 'react';
import {
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
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>User Management</strong>
            <button
              className="learn-more"
              onClick={() => { setEditingUser(null); setVisible(true); }}
            >
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Add User</span>
            </button>
          </CCardHeader>
          <CCardBody>
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
