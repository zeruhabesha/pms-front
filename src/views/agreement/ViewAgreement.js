import React, { useState } from 'react';
import '../Super.scss';
import {
  CRow,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CCollapse,
} from '@coreui/react';
import AddAgreement from './AddAgreement'; // Import the AddAgreement modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPrint, faEye, faEyeSlash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import AgreementDetails from './AgreementDetails'; // Import the AgreementDetails modal component

const ViewAgreement = () => {
  // State for modal visibility and editing
  const [visible, setVisible] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState(null);
  
  // State for search term and agreement data
  const [searchTerm, setSearchTerm] = useState('');
  const [agreementData, setAgreementData] = useState([
    { 
      id: 1, 
      tenant: 'Mark', 
      property: 'Property A', 
      leaseStart: '01/01/2023', 
      leaseEnd: '01/01/2024', 
      rentAmount: 1200, 
      securityDeposit: 500,
      paymentTerms: {
        dueDate: 'monthly',
        paymentMethod: 'Bank Transfer'
      },
      rulesAndConditions: 'No pets allowed.',
      additionalOccupants: ['Alice', 'Bob'],
      utilitiesAndServices: 'Tenant pays electricity and water.',
      documents: ['https://example.com/doc1', 'https://example.com/doc2']
    },
    { 
      id: 2, 
      tenant: 'Jacob', 
      property: 'Property B', 
      leaseStart: '01/02/2023', 
      leaseEnd: '01/02/2024', 
      rentAmount: 1100, 
      securityDeposit: 550,
      paymentTerms: {
        dueDate: 'yearly',
        paymentMethod: 'Credit Card'
      },
      rulesAndConditions: 'Late fees apply after the 5th of each month.',
      additionalOccupants: ['Charlie'],
      utilitiesAndServices: 'Landlord covers internet.',
      documents: ['https://example.com/doc3']
    },
    { 
      id: 3, 
      tenant: 'Emma', 
      property: 'Property C', 
      leaseStart: '01/03/2023', 
      leaseEnd: '01/03/2024', 
      rentAmount: 1300, 
      securityDeposit: 600,
      paymentTerms: {
        dueDate: 'monthly',
        paymentMethod: 'PayPal'
      },
      rulesAndConditions: 'No smoking in the property.',
      additionalOccupants: ['David'],
      utilitiesAndServices: 'Tenant pays for gas and water.',
      documents: ['https://example.com/doc4']
    },
    { 
      id: 4, 
      tenant: 'Sophia', 
      property: 'Property D', 
      leaseStart: '01/04/2023', 
      leaseEnd: '01/04/2024', 
      rentAmount: 1150, 
      securityDeposit: 550,
      paymentTerms: {
        dueDate: 'bi-weekly',
        paymentMethod: 'Check'
      },
      rulesAndConditions: 'Quiet hours after 10 PM.',
      additionalOccupants: [],
      utilitiesAndServices: 'Landlord covers all utilities.',
      documents: ['https://example.com/doc5']
    },
    { 
      id: 5, 
      tenant: 'Liam', 
      property: 'Property E', 
      leaseStart: '01/05/2023', 
      leaseEnd: '01/05/2024', 
      rentAmount: 1250, 
      securityDeposit: 700,
      paymentTerms: {
        dueDate: 'monthly',
        paymentMethod: 'Bank Transfer'
      },
      rulesAndConditions: 'No loud music after 9 PM.',
      additionalOccupants: ['Olivia'],
      utilitiesAndServices: 'Tenant pays for internet and cable.',
      documents: ['https://example.com/doc6']
    },
    // Add more lease agreements as needed
  ]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define how many items to display per page

  // State to track expanded rows
  const [expandedRows, setExpandedRows] = useState({});

  // Filter agreement data based on the search term
  const filteredAgreementData = agreementData.filter(
    (agreement) =>
      agreement.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredAgreementData.length / itemsPerPage);

  // Get current agreement entries for the current page
  const indexOfLastAgreement = currentPage * itemsPerPage;
  const indexOfFirstAgreement = indexOfLastAgreement - itemsPerPage;
  const currentAgreementData = filteredAgreementData.slice(indexOfFirstAgreement, indexOfLastAgreement);

  // Function to handle Add button click
  const handleAdd = () => {
    setEditingAgreement(null); // Clear editing data
    setVisible(true); // Show the modal
  };

  // Function to handle Edit button click
  const handleEdit = (agreement) => {
    setEditingAgreement(agreement); // Set the agreement being edited
    setVisible(true); // Show the modal
  };

  // Function to handle Delete action
  const handleDelete = (id) => {
    setAgreementData((prevData) => prevData.filter((agreement) => agreement.id !== id));
  };


  // New state for AgreementDetails modal
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const handleRowToggle = (agreement) => {
    // setExpandedRows((prev) => ({
    //   ...prev,
    //   [agreement.id]: !prev[agreement.id] // Toggle the expanded state for the row
    // }));
    
    // Set selected agreement and open the AgreementDetails modal
    setSelectedAgreement(agreement);
    setDetailsVisible(true);
  };

  // Function to handle print button click
// State to track the content to print
const [printContent, setPrintContent] = useState('');

const handlePrint = () => {
  // Generate the content for printing (e.g., the table or agreement details)
  const contentToPrint = document.getElementById('agreementTable').outerHTML; // Get the content of the table
  
  // Open a new window for printing
  const printWindow = window.open('', '_blank');
  
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

};



  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Agreements</strong>
            <div id="container">
            <button
          className="learn-more"
          onClick={handleAdd}>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Add Agreement</span>
        </button>
        </div>
          </CCardHeader>
          <CCardBody>
            {/* Search Box */}
            <CFormInput
              type="text"
              placeholder="Search by tenant or property"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <div className="table-responsive">
              <CTable>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tenant</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Property</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Lease Start</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Lease End</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rent Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Security Deposit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentAgreementData.map((agreement, index) => (
                    <React.Fragment key={agreement.id}>
                      <CTableRow>
                        <CTableHeaderCell scope="row">{index + indexOfFirstAgreement + 1}</CTableHeaderCell>
                        <CTableDataCell>{agreement.tenant}</CTableDataCell>
                        <CTableDataCell>{agreement.property}</CTableDataCell>
                        <CTableDataCell>{agreement.leaseStart}</CTableDataCell>
                        <CTableDataCell>{agreement.leaseEnd}</CTableDataCell>
                        <CTableDataCell>${agreement.rentAmount}</CTableDataCell>
                        <CTableDataCell>${agreement.securityDeposit}</CTableDataCell>
                        <CTableDataCell>
                        <CButton color="dark" size="sm" className="me-2" onClick={() => handleEdit(agreement)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </CButton>
                        <CButton color="danger" size="sm" className="me-2"  onClick={() => handleDelete(agreement.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </CButton>
                        <CButton color="light" size="sm" onClick={() => handleRowToggle(agreement)}>
                            <FontAwesomeIcon icon={expandedRows[agreement.id] ? faEyeSlash : faEye} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan="8">
                          <CCollapse visible={expandedRows[agreement.id]}>
                            <div className="p-3">
                              <strong>Payment Terms:</strong>
                              <p>Due Date: {agreement.paymentTerms.dueDate}</p>
                              <p>Payment Method: {agreement.paymentTerms.paymentMethod}</p>
                              <strong>Rules and Conditions:</strong>
                              <p>{agreement.rulesAndConditions}</p>
                              <strong>Additional Occupants:</strong>
                              <p>{agreement.additionalOccupants.join(', ') || 'None'}</p>
                              <strong>Utilities and Services:</strong>
                              <p>{agreement.utilitiesAndServices}</p>
                              <strong>Documents:</strong>
                              <ul>
                                {agreement.documents.map((doc, idx) => (
                                  <li key={idx}>
                                    <a href={doc} download rel="noopener noreferrer">
                                      Download Document {idx + 1}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CCollapse>
                        </CTableDataCell>
                      </CTableRow>
                    </React.Fragment>
                  ))}
                </CTableBody>
              </CTable>
            </div>

            <CButton color="primary" onClick={() => handlePrint()} className="mt-3">
            <FontAwesomeIcon icon={faPrint} /> 
          </CButton>
            {/* Pagination Controls */}
            <div className="d-flex justify-content-between mt-3">
              <CButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </CButton>
              <CButton
                disabled={currentPage === totalPages}
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

      {/* Modal to Add/Edit Agreement */}
      <AddAgreement visible={visible} setVisible={setVisible} editingAgreement={editingAgreement} />

       {/* Modal to Show Agreement Details */}
      <AgreementDetails visible={detailsVisible} setVisible={setDetailsVisible} agreement={selectedAgreement} />

    </CRow>
  );
};

export default ViewAgreement;