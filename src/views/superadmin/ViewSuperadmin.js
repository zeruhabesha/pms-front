import React, { useEffect, useState } from 'react';
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuperAdmins, deleteSuperAdmin, addSuperAdmin, updateSuperAdmin } from '../../store/superAdminSlice';
import AddSuperAdmin from './AddSuperadmin';
import EditPhotoModal from '../EditPhotoModal';
import placeholder from '../image/placeholder.png';

const ViewSuperAdmin = () => {
  const dispatch = useDispatch();
  const { superAdmins = [], loading } = useSelector((state) => state.superAdmin);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [editingSuperAdmin, setEditingSuperAdmin] = useState(null);
  const [editPhotoVisible, setEditPhotoVisible] = useState(false);
  const [selectedAdminForPhoto, setSelectedAdminForPhoto] = useState(null);
  const [localSuperAdmins, setLocalSuperAdmins] = useState(superAdmins); // Local state for real-time updates
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSuperAdmins());
  }, [dispatch]);

  useEffect(() => {
    setLocalSuperAdmins(superAdmins);
  }, [superAdmins]);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search term changes
  }, [searchTerm]);

  const filteredSuperAdminData = localSuperAdmins.filter(
    (admin) =>
      admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredSuperAdminData.length / itemsPerPage);
  const indexOfLastAdmin = currentPage * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentSuperAdmins = filteredSuperAdminData.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const handleDelete = (admin) => {
    setAdminToDelete(admin);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    dispatch(deleteSuperAdmin(adminToDelete._id));
    setLocalSuperAdmins((prev) => prev.filter((admin) => admin._id !== adminToDelete._id)); // Update local state
    setDeleteModalVisible(false);
  };

  const handleEdit = (admin) => {
    if (!admin || !admin._id) {
      console.error('Admin or Admin ID is missing');
      return;
    }
  
    setEditingSuperAdmin(admin);
    setVisible(true);
  };

  const handleSave = async (updatedData) => {
    if (editingSuperAdmin && editingSuperAdmin._id) {
      const response = await dispatch(updateSuperAdmin({ id: editingSuperAdmin._id, superAdminData: updatedData }));

      if (response.meta.requestStatus === 'fulfilled') {
        setLocalSuperAdmins((prev) =>
          prev.map((admin) => (admin._id === editingSuperAdmin._id ? response.payload : admin)) // Update local state
        );
        setVisible(false); // Close the modal after saving
      } else {
        console.error('Failed to update Super Admin');
      }
    } else {
      console.error('Cannot update super admin without a valid _id');
    }
  };

  const handleAddSuperAdmin = async (newAdminData) => {
    const response = await dispatch(addSuperAdmin(newAdminData));

    if (response.meta.requestStatus === 'fulfilled') {
      setLocalSuperAdmins((prev) => [...prev, response.payload]); // Add new admin to local state
      setVisible(false); // Close the modal after saving
    } else {
      console.error('Failed to add Super Admin');
    }
  };

  const handleEditPhoto = (admin) => {
    setSelectedAdminForPhoto(admin);
    setEditPhotoVisible(true);
  };

  const handleSavePhoto = (photo) => {
    console.log("Saving photo for admin:", selectedAdminForPhoto.name);
    console.log("Photo file:", photo);
    setEditPhotoVisible(false);
  };

  const isValidUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z0-9](?=[a-z0-9-]{0,61}[a-z0-9])?)\\.)+[a-z]{2,6})'+ // domain name
      '|localhost'+ // localhost
      '|\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}'+ // IP
      '|([0-9a-f]{1,4}:){7,7}[0-9a-f]{1,4}|'+ // IPv6
      '([0-9a-f]{1,4}:){1,7}:|'+ // ...
      '([0-9a-f]{1,4}:){1,6}:[0-9a-f]{1,4}|'+
      '([0-9a-f]{1,4}:){1,5}(:[0-9a-f]{1,4}){1,2}|'+
      '([0-9a-f]{1,4}:){1,4}(:[0-9a-f]{1,4}){1,3}|'+
      '([0-9a-f]{1,4}:){1,3}(:[0-9a-f]{1,4}){1,4}|'+
      '([0-9a-f]{1,4}:){1,2}(:[0-9a-f]{1,4}){1,5}|'+
      '[0-9a-f]{1,4}:((:[0-9a-f]{1,4}){1,6})|'+
      ':((:[0-9a-f]{1,4}){1,7}|:)|'+
      'fe80:(:[0-9a-f]{0,4}){0,4}%[0-9a-zA-Z]{1,}|'+
      '::(ffff(:0{1,4}){0,1}:){0,1}'+
      '((25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))\\.){3}'+
      '(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))'+
      ')(:\\d+)?(\\/[-a-z0-9%_.~+]*)*'+
      '(\\?[;&a-z0-9%_.~+=-]*)?'+
      '(\\#[-a-z0-9_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Super Admin</strong>
            <CButton onClick={() => { setEditingSuperAdmin(null); setVisible(true); }}>
              Add Super Admin
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search by name, email, or phone number"
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
                    <CTableHeaderCell>Phone Number</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {!loading && currentSuperAdmins.map((admin, index) => (
                    <CTableRow key={admin._id}>
                      <CTableHeaderCell scope="row">{index + indexOfFirstAdmin + 1}</CTableHeaderCell>
                      <CTableDataCell>
                        <img
                          src={admin.photo && isValidUrl(admin.photo) ? admin.photo : placeholder}
                          alt="superAdmin"
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                        <CButton color="secondary" size="sm" className="ms-2" title="Edit Photo" onClick={() => handleEditPhoto(admin)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>{admin.name}</CTableDataCell>
                      <CTableDataCell>{admin.email}</CTableDataCell>
                      <CTableDataCell>{admin.phoneNumber}</CTableDataCell>
                      <CTableDataCell>
                        <span style={{
                          backgroundColor: admin.status === 'active' ? 'green' : 'red',
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
                        <CButton color="danger" size="sm" onClick={() => handleDelete(admin)}>
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
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1)); // Prevent going below 1
              }}
            >
              Previous
            </CButton>
            <CButton
              disabled={currentPage === totalPages || currentSuperAdmins.length === 0}
              onClick={() => {
                setCurrentPage(prev => Math.min(prev + 1, totalPages)); // Prevent going over total pages
              }}
            >
              Next
            </CButton>
          </div>
          <div className="text-center mt-2">
            Page {currentPage} of {totalPages || 1}
          </div>
        </CCardBody>
        </CCard>
      </CCol>

      {/* Modal to Add/Edit Super Admin */}
      <AddSuperAdmin
        visible={visible}
        setVisible={setVisible}
        editingSuperAdmin={editingSuperAdmin}
        onSave={editingSuperAdmin ? handleSave : handleAddSuperAdmin} // Differentiate between add and edit
      />

      {/* Modal to Edit Photo */}
      <EditPhotoModal
        visible={editPhotoVisible}
        setVisible={setEditPhotoVisible}
        admin={selectedAdminForPhoto}
        onSavePhoto={handleSavePhoto}
      />

      {/* Delete Confirmation Modal */}
      <CModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
        <CModalHeader onClose={() => setDeleteModalVisible(false)}>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete Super Admin: {adminToDelete?.name}?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ViewSuperAdmin;
