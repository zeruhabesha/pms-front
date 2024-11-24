import React, { useState, useEffect } from 'react';
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
  CCollapse,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilPencil, cilTrash, cilPlus, cilMinus } from '@coreui/icons';
import placeholder from '../image/placeholder.png';

const TenantTable = ({
  tenants = [],
  currentPage,
  totalPages,
  searchTerm,
  setSearchTerm,
  handleEditPhoto,
  handleEdit,
  handleDelete,
  handlePageChange,
}) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [tenantPhotos, setTenantPhotos] = useState({});
  const [photoErrors, setPhotoErrors] = useState({});

  useEffect(() => {
    // Clear previous photos when tenants change
    setTenantPhotos({});
    setPhotoErrors({});
    
    // Fetch photos for all tenants
    const fetchPhotos = async () => {
      const validTenants = tenants.filter(tenant => tenant && tenant._id);
      for (const tenant of validTenants) {
        await fetchTenantPhoto(tenant._id);
      }
    };

    fetchPhotos();
  }, [tenants]);


  const fetchTenantPhoto = async (tenantId) => {
    if (photoErrors[tenantId] || tenantPhotos[tenantId]) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:4000/api/v1/tenants/${tenantId}/photos`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        if (blob.size > 0) {
          const imageUrl = URL.createObjectURL(blob);
          setTenantPhotos(prev => ({
            ...prev,
            [tenantId]: imageUrl
          }));
        } else {
          throw new Error('Empty photo response');
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.warn(`Photo fetch failed for tenant ${tenantId}:`, error.message);
      setPhotoErrors(prev => ({
        ...prev,
        [tenantId]: true
      }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(tenantPhotos).forEach(url => {
        URL.revokeObjectURL(url);
      });
    };
  }, [tenantPhotos]);

  const toggleRow = (tenantId) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [tenantId]: !prevState[tenantId],
    }));
  };


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="table-responsive">
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Photo</CTableHeaderCell>
            <CTableHeaderCell>Tenant Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Lease Start</CTableHeaderCell>
            <CTableHeaderCell>Lease End</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tenants.map((tenant, index) => {
            const tenantId = tenant?._id;
            if (!tenantId) return null;

            return (
              <React.Fragment key={tenantId}>
                <CTableRow>
                  <CTableDataCell>{(currentPage - 1) * 5 + index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <img
                      src={tenantPhotos[tenantId] || placeholder}
                      alt={tenant.tenantName || 'Tenant'}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ddd',
                      }}
                      className="me-2"
                      onError={(e) => {
                        e.target.src = placeholder;
                      }}
                    />
                    <CButton 
                      color="light" 
                      size="sm" 
                      onClick={() => handleEditPhoto(tenant)} 
                      title="Edit photo"
                      className="mt-1"
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>{tenant.tenantName}</CTableDataCell>
                  <CTableDataCell>{tenant.contactInformation?.email}</CTableDataCell>
                  <CTableDataCell>{formatDate(tenant.leaseAgreement?.startDate)}</CTableDataCell>
                  <CTableDataCell>{formatDate(tenant.leaseAgreement?.endDate)}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="dark"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(tenant)}
                      title="Edit"
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDelete(tenantId, tenant)}
                      title="Delete"
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                    <CButton
                      color="light"
                      size="sm"
                      onClick={() => toggleRow(tenantId)}
                      title={expandedRows[tenantId] ? 'Collapse' : 'Expand'}
                    >
                      <CIcon icon={expandedRows[tenantId] ? cilMinus : cilPlus} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell colSpan="7" className="p-0">
                    <CCollapse visible={expandedRows[tenantId]}>
                      <div className="p-3 bg-light">
                        <div className="row">
                          <div className="col-md-6">
                            <p><strong>Phone Number:</strong> {tenant.contactInformation?.phoneNumber || 'N/A'}</p>
                            <p><strong>Unit:</strong> {tenant.propertyInformation?.unit || 'N/A'}</p>
                            <p><strong>Rent Amount:</strong> ${tenant.leaseAgreement?.rentAmount || 'N/A'}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Security Deposit:</strong> ${tenant.leaseAgreement?.securityDeposit || 'N/A'}</p>
                            <p><strong>Special Terms:</strong> {tenant.leaseAgreement?.specialTerms || 'N/A'}</p>
                            <p><strong>Move-In Date:</strong> {formatDate(tenant.moveInDate)}</p>
                          </div>
                        </div>
                      </div>
                    </CCollapse>
                  </CTableDataCell>
                </CTableRow>
              </React.Fragment>
            );
          })}
        </CTableBody>
      </CTable>

      <CPagination className="mt-3" aria-label="Page navigation">
        <CPaginationItem 
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </CPaginationItem>
        
        <CPaginationItem
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lsaquo;
        </CPaginationItem>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <CPaginationItem disabled>...</CPaginationItem>
            ) : (
              <CPaginationItem
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </CPaginationItem>
            )}
          </React.Fragment>
        ))}

        <CPaginationItem
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rsaquo;
        </CPaginationItem>
        
        <CPaginationItem
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </CPaginationItem>
      </CPagination>
    </div>
  );
};

export default TenantTable;
