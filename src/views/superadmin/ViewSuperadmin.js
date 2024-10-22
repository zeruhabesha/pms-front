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
import { fetchSuperAdmins, deleteSuperAdmin, addSuperAdmin, updateSuperAdmin } from '../../api/slice/superAdminSlice';
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
    dispatch(deleteSuperAdmin(adminToDelete._id))
      .unwrap()
      .then(() => {
        // Remove the deleted admin from the local state
        setLocalSuperAdmins((prev) => prev.filter((admin) => admin._id !== adminToDelete._id));
  
        setDeleteModalVisible(false); // Close the modal after deletion
      })
      .catch((error) => {
        console.error('Failed to delete Super Admin:', error);
      });
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
        // Update the local state with the new data
        setLocalSuperAdmins((prev) =>
          prev.map((admin) => (admin._id === editingSuperAdmin._id ? response.payload : admin))
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
      // Add the newly created super admin to the local state for real-time update
      setLocalSuperAdmins((prev) => [...prev, response.payload]);
  
      setVisible(false); // Close the modal after saving
    } else {
      console.error('Failed to add Super Admin');
    }
  };
  

  const handleEditPhoto = (admin) => {
    setSelectedAdminForPhoto(admin);
    setEditPhotoVisible(true);
  };

  const handleSavePhoto = async (photoFile) => {
    try {
      // Ensure the file is selected
      if (!photoFile) {
        alert('Please select a photo to upload.');
        return;
      }
  
      const formData = new FormData();
      formData.append('photo', photoFile);
  
      // Send a PUT request to upload the photo
      const response = await axios.put(
        `${API_BASE_URL}/superadmin/${selectedAdminForPhoto._id}/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Include token for authorization
            'Content-Type': 'multipart/form-data', // Ensure correct content type
          },
        }
      );
  
      // Update the local state with the new photo URL returned from the API
      const updatedPhotoUrl = response.data.photo; // Assuming the API returns the updated photo URL in response.data.photo
  
      setLocalSuperAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === selectedAdminForPhoto._id ? { ...admin, photo: updatedPhotoUrl } : admin
        )
      );
  
      setEditPhotoVisible(false); // Close the modal after saving
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
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
                          src={admin.photo ? admin.photo : placeholder}
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
