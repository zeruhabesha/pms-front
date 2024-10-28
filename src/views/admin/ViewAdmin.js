// ViewAdmin.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmins, deleteAdmin } from '../../api/actions/AdminAction';
import AddAdmin from './AddAdmin';
import EditPhotoModal from '../EditPhotoModal';
import placeholder from '../image/placeholder.png';
import {
  CRow, CButton, CCard, CCardBody, CCardHeader, CCol,
  CTable, CTableBody, CTableHead, CTableHeaderCell,
  CTableRow, CTableDataCell, CFormInput,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';

const ViewAdmin = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin?.admins || []);

  const [visible, setVisible] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editPhotoVisible, setEditPhotoVisible] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAdmins({ page: currentPage, limit: itemsPerPage, searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setVisible(true);
  };

  const handleEditPhoto = () => {
    setEditPhotoVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteAdmin(id));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Admin</strong>
            <div>
              <CButton onClick={() => setVisible(true)}>Add Admin</CButton>
            </div>
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
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {admins.map((admin, index) => (
                    <CTableRow key={admin.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>
                        <img src={placeholder} alt="Admin" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        <CButton color="secondary" size="sm" className="ms-2" title="Edit Photo" onClick={handleEditPhoto}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>{admin.name}</CTableDataCell>
                      <CTableDataCell>{admin.email}</CTableDataCell>
                      <CTableDataCell>{admin.role}</CTableDataCell>
                      <CTableDataCell>{admin.status}</CTableDataCell>
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
          </CCardBody>
        </CCard>
      </CCol>
      <AddAdmin visible={visible} setVisible={setVisible} editingAdmin={editingAdmin} />
      <EditPhotoModal visible={editPhotoVisible} setVisible={setEditPhotoVisible} />
    </CRow>
  );
};

export default ViewAdmin;
