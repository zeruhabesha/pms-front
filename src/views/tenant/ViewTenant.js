import React, { useState } from 'react';
import { CRow, CButton, CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CFormInput } from '@coreui/react';
import AddTenant from './AddTenant'; // Import the AddTenant modal component
import { CIcon } from '@coreui/icons-react'; // Correct import for CIcon
import { cilPencil, cilTrash} from '@coreui/icons'; // Import icons
import '../Super.scss';

const ViewTenant = () => {
  // State for search term, pagination, modal visibility, and expanded rows
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null); // State to track which tenant is being edited
  const [expandedRows, setExpandedRows] = useState([]); // State to track expanded rows

  const itemsPerPage = 5; // Define items per page

  // Sample tenant data
  const tenantData = [
    { 
      id: 1, 
      name: 'Mark', 
      email: 'mark@example.com', 
      phoneNumber: '555-1234', 
      leaseStart: '01/01/2023', 
      leaseEnd: '01/01/2024', 
      rentAmount: 1200, 
      securityDeposit: 500, 
      specialTerms: 'No pets allowed', 
      moveInDate: '01/01/2023' 
    },
    { 
      id: 2, 
      name: 'Jacob', 
      email: 'jacob@example.com', 
      phoneNumber: '555-5678', 
      leaseStart: '01/02/2023', 
      leaseEnd: '01/02/2024', 
      rentAmount: 1100, 
      securityDeposit: 550, 
      specialTerms: 'Late fee after 5 days', 
      moveInDate: '01/02/2023' 
    },
    {
      id: 3,
      name: 'Emily',
      email: 'emily@example.com',
      phoneNumber: '555-8765',
      leaseStart: '02/01/2023',
      leaseEnd: '02/01/2024',
      rentAmount: 1300,
      securityDeposit: 600,
      specialTerms: 'No smoking inside',
      moveInDate: '02/01/2023'
    },
    {
      id: 4,
      name: 'Sophia',
      email: 'sophia@example.com',
      phoneNumber: '555-3456',
      leaseStart: '03/01/2023',
      leaseEnd: '03/01/2024',
      rentAmount: 1150,
      securityDeposit: 550,
      specialTerms: 'One pet allowed',
      moveInDate: '03/01/2023'
    },
    {
      id: 5,
      name: 'William',
      email: 'william@example.com',
      phoneNumber: '555-6543',
      leaseStart: '04/01/2023',
      leaseEnd: '04/01/2024',
      rentAmount: 1250,
      securityDeposit: 600,
      specialTerms: 'Requires renter’s insurance',
      moveInDate: '04/01/2023'
    },
    {
      id: 6,
      name: 'Olivia',
      email: 'olivia@example.com',
      phoneNumber: '555-4321',
      leaseStart: '05/01/2023',
      leaseEnd: '05/01/2024',
      rentAmount: 1400,
      securityDeposit: 700,
      specialTerms: 'Must maintain yard',
      moveInDate: '05/01/2023'
    },
    {
      id: 7,
      name: 'James',
      email: 'james@example.com',
      phoneNumber: '555-7890',
      leaseStart: '06/01/2023',
      leaseEnd: '06/01/2024',
      rentAmount: 1350,
      securityDeposit: 650,
      specialTerms: 'Quiet hours after 10 PM',
      moveInDate: '06/01/2023'
    }

  ];
  
  

// Filter tenant data based on the search term
const filteredTenantData = tenantData.filter(
    tenant =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) // Change here to check for email instead of class
  );
  

  // Pagination logic
  const indexOfLastTenant = currentPage * itemsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - itemsPerPage;
  const currentTenants = filteredTenantData.slice(indexOfFirstTenant, indexOfLastTenant);
  const totalPages = Math.ceil(filteredTenantData.length / itemsPerPage);

  // Function to handle Edit button click and open modal
  const handleEdit = (tenant) => {
    setEditingTenant(tenant); // Set the tenant being edited
    setVisible(true); // Show the modal
  };

  // Function to handle row expansion
  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id)); // Collapse
    } else {
      setExpandedRows([...expandedRows, id]); // Expand
    }
  };

  // Function to handle the Delete button (you can add API call for deletion here)
  const handleDelete = (tenantId) => {
    console.log(`Tenant with id ${tenantId} deleted.`);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Tenant List</strong>
            <div id="container">
            <button
          className="learn-more"
          onClick={() => { setEditingTenant(null); setVisible(true); }}>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Add Tenant</span>
        </button>
        </div>
          </CCardHeader>
          <CCardBody>
            {/* Search Box */}
            <CFormInput
              type="text"
              placeholder="Search by name or class"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <CTable>
  <CTableHead color="light">
    <CTableRow>
      <CTableHeaderCell scope="col">#</CTableHeaderCell>
      <CTableHeaderCell scope="col">Tenant Name</CTableHeaderCell>
      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
      <CTableHeaderCell scope="col">Lease Start</CTableHeaderCell>
      <CTableHeaderCell scope="col">Lease End</CTableHeaderCell>
      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    {currentTenants.length > 0 ? (
      currentTenants.map((tenant, index) => (
        <React.Fragment key={tenant.id}>
          <CTableRow>
            <CTableHeaderCell scope="row">{index + indexOfFirstTenant + 1}</CTableHeaderCell>
            <CTableDataCell>{tenant.name}</CTableDataCell>
            <CTableDataCell>{tenant.email}</CTableDataCell>
            <CTableDataCell>{tenant.leaseStart}</CTableDataCell>
            <CTableDataCell>{tenant.leaseEnd}</CTableDataCell>
            <CTableDataCell>
              {/* Edit Button with Icon */}
              <CButton color="dark" size="sm" className="me-2" onClick={() => handleEdit(tenant)}>
                <CIcon icon={cilPencil} /> {/* Edit icon */}
              </CButton>

              {/* Delete Button with Icon */}
              <CButton color="danger" size="sm" onClick={() => handleDelete(tenant.id)}>
                <CIcon icon={cilTrash} /> {/* Delete icon */}
              </CButton>

              {/* Toggle Button with Icon */}
              <CButton color="secondary" size="sm" className="ms-2" onClick={() => toggleRow(tenant.id)}>
              <CIcon 
    icon={expandedRows.includes(tenant.id) ? 'cil-minus' : 'cil-plus'} 
    style={{ color: 'white' }} 
  />              </CButton>
            </CTableDataCell>
          </CTableRow>

          {/* Expanded Row */}
          {expandedRows.includes(tenant.id) && (
            <CTableRow>
              <CTableDataCell colSpan="8">
                <div className="p-3">
                <strong>Rent Amount:</strong> ${tenant.rentAmount}<br />
                <strong>Phone Number:</strong>{tenant.phoneNumber}<br />
                  <strong>Security Deposit:</strong> ${tenant.securityDeposit}<br />
                  <strong>Special Terms:</strong> {tenant.specialTerms || 'N/A'}<br />
                  <strong>Move-In Date:</strong> {tenant.moveInDate}
                </div>
              </CTableDataCell>
            </CTableRow>
          )}
        </React.Fragment>
      ))
    ) : (
      <CTableRow>
        <CTableDataCell colSpan="8" className="text-center">
          No tenants found
        </CTableDataCell>
      </CTableRow>
    )}
  </CTableBody>
</CTable>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between mt-3">
              <CButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </CButton>
              <CButton
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </CButton>
            </div>
            <div className="text-center mt-2">
              Page {currentPage} of {totalPages}
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal to Add/Edit Tenant */}
      <AddTenant visible={visible} setVisible={setVisible} editingTenant={editingTenant} />
    </CRow>
  );
};

export default ViewTenant;
