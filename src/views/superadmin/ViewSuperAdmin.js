import React, { useEffect, useState } from 'react';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CAlert } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSuperAdmins,
  deleteSuperAdmin,
  addSuperAdmin,
  updateSuperAdmin,
  uploadSuperAdminPhoto,
} from '../../api/actions/superAdminActions';
import SuperAdminTable from './SuperAdminTable';
import SuperAdminModal from './SuperAdminModal';
import SuperAdminDeleteModal from './SuperAdminDeleteModal';
import EditPhotoModal from '../EditPhotoModal';
import '../Super.scss';
import { ToastContainer, toast } from 'react-toastify';

const ViewSuperAdmin = () => {
  const dispatch = useDispatch();
  const { superAdmins, loading, totalPages, currentPage, error } = useSelector((state) => state.superAdmin);
  const [searchTerm, setSearchTerm] = useState('');
  const [superAdminModalVisible, setSuperAdminModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editPhotoVisible, setEditPhotoVisible] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [editingSuperAdmin, setEditingSuperAdmin] = useState(null);
  const [adminToEdit, setAdminToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSuperAdmins({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      dispatch(fetchSuperAdmins({ page, limit: itemsPerPage, search: searchTerm }));
    }
  };

  const filteredSuperAdminData = Array.isArray(superAdmins)
    ? superAdmins.filter(
        (admin) =>
          admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalFilteredPages = Math.ceil(filteredSuperAdminData.length / itemsPerPage);

  const handleDelete = (admin) => {
    setAdminToDelete(admin);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteSuperAdmin(adminToDelete._id)).unwrap();
      dispatch(fetchSuperAdmins({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Failed to delete Super Admin:', error);
    }
  };

  const handleEditPhoto = (admin) => {
    setAdminToEdit(admin);
    setEditPhotoVisible(true);
  };

  const handleSavePhoto = async (photoFile) => {
    if (adminToEdit) {
      await dispatch(uploadSuperAdminPhoto({ id: adminToEdit._id, photo: photoFile }));
      dispatch(fetchSuperAdmins({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
      setEditPhotoVisible(false);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      setErrorMessage(''); // Clear previous error message
      await dispatch(
        updateSuperAdmin({
          id: editingSuperAdmin._id,
          superAdminData: updatedData,
        })
      ).unwrap();
      dispatch(fetchSuperAdmins({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
      setSuperAdminModalVisible(false);
    } catch (error) {
      setErrorMessage(error.message); // Set the error message
      console.error('Failed to update Super Admin:', error.message);
    }
  };

  const handleAddSuperAdmin = async (superAdminData) => {
    try {
      const result = await dispatch(addSuperAdmin(superAdminData)).unwrap();
      toast.success('Super Admin added successfully');
      setSuperAdminModalVisible(false);
      return result;
    } catch (error) {
      const errorMessage = error?.message || 'Failed to add Super Admin';
      toast.error(errorMessage);
      if (error?.status === 401) {
        window.location.href = '/login';
      }
      throw new Error(errorMessage);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Super Admin</strong>
            <div id="container">
              <button
                className="learn-more"
                onClick={() => {
                  setEditingSuperAdmin(null);
                  setSuperAdminModalVisible(true);
                }}
              >
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Add Super-Admin</span>
              </button>
            </div>
          </CCardHeader>
          <CCardBody>
            {error && (
              <CAlert color="danger" className="mb-4">
                {error.message}
              </CAlert>
            )}
            {errorMessage && (
              <CAlert color="danger" className="mb-4">
                {errorMessage}
              </CAlert>
            )}
            <SuperAdminTable
              superAdmins={filteredSuperAdminData}
              currentPage={currentPage}
              totalPages={totalFilteredPages}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleEdit={(admin) => {
                setEditingSuperAdmin(admin);
                setSuperAdminModalVisible(true);
              }}
              handleDelete={handleDelete}
              handleEditPhoto={handleEditPhoto}
              handlePageChange={handlePageChange}
            />
          </CCardBody>
        </CCard>
      </CCol>
      {superAdminModalVisible && (
        <SuperAdminModal
          visible={superAdminModalVisible}
          setVisible={setSuperAdminModalVisible}
          editingSuperAdmin={editingSuperAdmin}
          handleSave={handleSave}
          handleAddSuperAdmin={handleAddSuperAdmin}
        />
      )}
      <SuperAdminDeleteModal
        visible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        adminToDelete={adminToDelete}
        confirmDelete={confirmDelete}
      />
      <EditPhotoModal
        visible={editPhotoVisible}
        setVisible={setEditPhotoVisible}
        admin={adminToEdit}
        onSavePhoto={handleSavePhoto}
      />
      <ToastContainer />
    </CRow>
  );
};

export default ViewSuperAdmin;
