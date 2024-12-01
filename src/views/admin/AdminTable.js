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
import { cilPencil, cilTrash, cilCheckCircle, cilXCircle, cilPlus, cilMinus } from '@coreui/icons';
import placeholder from '../image/placeholder.png';

const AdminTable = ({
  admins = [],
  currentPage,
  totalPages,
  searchTerm,
  setSearchTerm,
  handleDelete,
  handleEditPhoto,
  handlePageChange,
}) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    if (!id) return;
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString();
    } catch (error) {
      return 'N/A';
    }
  };

  const calculateRemainingDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const now = new Date();

      if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'N/A';

      // If end date has passed
      if (end < now) return 'Expired';

      // If start date hasn't begun
      if (start > now) {
        const daysUntilStart = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
        return `Starts in ${daysUntilStart} days`;
      }

      // Calculate remaining days
      const remainingDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
      return remainingDays > 0 ? `${remainingDays} days remaining` : 'Expired';
    } catch (error) {
      return 'N/A';
    }
  };

  const handleEdit = (admin) => {
    console.log('Selected Admin for Editing:', admin); // Debug log
    setEditingAdmin(admin);
    setAdminModalVisible(true);
  };
  
  
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
        <CTable>
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
            {admins.map((admin, index) => admin && (
              <React.Fragment key={admin._id || `row-${index}`}>
                <CTableRow>
                  <CTableDataCell>{(currentPage - 1) * 5 + index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <img
                      src={admin?.photo ? `http://localhost:4000/api/v1/users/${admin._id}/photo` : placeholder}
                      alt="User"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      className="me-2"
                    />
                    <CButton color="light" size="sm" onClick={() => handleEditPhoto(admin)} title="Edit photo">
                      <CIcon icon={cilPencil} />
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>{admin?.name || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{admin?.email || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{admin?.role || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {admin?.status?.toLowerCase() === 'active' ? (
                      <CIcon icon={cilCheckCircle} className="text-success" title="Active" />
                    ) : (
                      <CIcon icon={cilXCircle} className="text-danger" title="Inactive" />
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="light" size="sm" className="me-2" onClick={() => handleEdit(admin)} title="Edit">
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton color="danger" size="sm" className="me-2" onClick={() => handleDelete(admin)} title="Delete">
                      <CIcon icon={cilTrash} />
                    </CButton>
                    <CButton color="light" size="sm" onClick={() => toggleRow(admin._id)} title="Expand">
                      <CIcon icon={expandedRows[admin._id] ? cilMinus : cilPlus} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>

                <CTableRow>
                  <CTableDataCell colSpan="8" className="p-0 border-0">
                    <CCollapse visible={expandedRows[admin?._id]}>
                      <div className="p-3">
                        <strong>Phone Number:</strong> {admin?.phoneNumber || 'N/A'}
                        <br />
                        <strong>Address:</strong> {admin?.address || 'N/A'}
                        <br />
                        <strong>Active Start Date:</strong> {formatDate(admin?.activeStart)}
                        <br />
                        <strong>Active End Date:</strong> {formatDate(admin?.activeEnd)}
                        <br />
                        <strong>Status:</strong>{' '}
                        <span className={calculateRemainingDays(admin?.activeStart, admin?.activeEnd) === 'Expired' ? 'text-danger' : 'text-success'}>
                          {calculateRemainingDays(admin?.activeStart, admin?.activeEnd)}
                        </span>
                      </div>
                    </CCollapse>
                  </CTableDataCell>
                </CTableRow>
              </React.Fragment>
            ))}
          </CTableBody>
        </CTable>
      </div>

      <CPagination className="mt-3">
        <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
          &laquo;
        </CPaginationItem>
        <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          &lsaquo;
        </CPaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <CPaginationItem
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          &rsaquo;
        </CPaginationItem>
        <CPaginationItem disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
          &raquo;
        </CPaginationItem>
      </CPagination>
    </div>
  );
};

export default AdminTable;