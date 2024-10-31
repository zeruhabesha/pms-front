import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmins, deleteAdmin, addAdmin, updateAdmin } from '../../api/actions/AdminActions';
import AddAdmin from './AddAdmin';
import AdminTable from './AdminTable';
import EditPhotoModal from '../EditPhotoModal';
import AdminDeleteModal from './AdminDeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  CRow, CCol, CCard, CCardBody, CCardHeader, CAlert, CButton
} from '@coreui/react';

const ViewAdmin = () => {
  const dispatch = useDispatch();
  const { admins = [], loading = false, error = null, totalPages = 0, currentPage = 1 } = useSelector((state) => state.admin || {});

  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editPhotoVisible, setEditPhotoVisible] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAdmins({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      dispatch(fetchAdmins({ page, limit: itemsPerPage, search: searchTerm }));
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setVisible(true);
  };

  const handleEditPhoto = (admin) => {
    setEditingAdmin(admin);
    setEditPhotoVisible(true);
  };

  const handleDelete = (admin) => {
    setAdminToDelete(admin);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteAdmin(adminToDelete.id)).unwrap();
      dispatch(fetchAdmins({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
      setDeleteModalVisible(false);
      toast.success('Admin deleted successfully');
    } catch (error) {
      toast.error('Failed to delete Admin');
      console.error('Failed to delete Admin:', error);
    }
  };

  const handleAddAdmin = async (adminData) => {
    try {
      await dispatch(addAdmin(adminData)).unwrap();
      toast.success('Admin added successfully');
      setVisible(false);
    } catch (error) {
      toast.error(error?.message || 'Failed to add Admin');
    }
  };

  const handleSaveAdmin = async (updatedData) => {
    try {
      await dispatch(updateAdmin({ id: editingAdmin.id, adminData: updatedData })).unwrap();
      dispatch(fetchAdmins({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
      setVisible(false);
      toast.success('Admin updated successfully');
    } catch (error) {
      toast.error('Failed to update Admin');
      console.error('Failed to update Admin:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Admin Management</strong>
            <CButton color="primary" onClick={() => setVisible(true)}>
              Add Admin
            </CButton>
          </CCardHeader>
          <CCardBody>
            {error && (
              <CAlert color="danger" className="mb-4">
                {error.message}
              </CAlert>
            )}
            <AdminTable
              admins={admins}
              currentPage={currentPage}
              totalPages={totalPages}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleEditPhoto={handleEditPhoto}
              handlePageChange={handlePageChange}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modals */}
      <AddAdmin
        visible={visible}
        setVisible={setVisible}
        editingAdmin={editingAdmin}
        onSave={editingAdmin ? handleSaveAdmin : handleAddAdmin}
      />
      <AdminDeleteModal
        visible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        adminToDelete={adminToDelete}
        confirmDelete={confirmDelete}
      />
      <EditPhotoModal
        visible={editPhotoVisible}
        setVisible={setEditPhotoVisible}
        admin={editingAdmin}
      />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </CRow>
  );
};

export default ViewAdmin;
