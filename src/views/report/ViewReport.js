import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '@coreui/coreui/dist/css/coreui.min.css';
import './ViewReport.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewReport = () => {
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [leaseAgreements, setLeaseAgreements] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const sampleProperties = [
    { id: 1, name: 'Sunny Apartments', location: 'New York', status: 'Available' },
    { id: 2, name: 'Green Villa', location: 'Los Angeles', status: 'Occupied' },
    { id: 3, name: 'Ocean View', location: 'Miami', status: 'Pending' },
  ];

  const sampleTenants = [
    { id: 1, name: 'John Doe', contact: '(555) 123-4567', property: 'Sunny Apartments' },
    { id: 2, name: 'Jane Smith', contact: '(555) 765-4321', property: 'Green Villa' },
  ];

  const sampleLeaseAgreements = [
    { id: 1, tenantName: 'John Doe', property: 'Sunny Apartments', startDate: '2023-01-01', endDate: '2024-01-01' },
    { id: 2, tenantName: 'Jane Smith', property: 'Green Villa', startDate: '2023-02-01', endDate: '2024-02-01' },
  ];

  const sampleMaintenanceRequests = [
    { id: 1, property: 'Sunny Apartments', issue: 'Leaky Faucet', status: 'Pending' },
    { id: 2, property: 'Green Villa', issue: 'Heating Issue', status: 'In Progress' },
  ];

  useEffect(() => {
    setProperties(sampleProperties);
    setTenants(sampleTenants);
    setLeaseAgreements(sampleLeaseAgreements);
    setMaintenanceRequests(sampleMaintenanceRequests);
  }, []);

  const propertyStatusData = {
    labels: ['Available', 'Occupied', 'Pending'],
    datasets: [
      {
        label: 'Property Status',
        data: [
          properties.filter(property => property.status === 'Available').length,
          properties.filter(property => property.status === 'Occupied').length,
          properties.filter(property => property.status === 'Pending').length,
        ],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Report</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink active={activeTab === 0} onClick={() => setActiveTab(0)}>
                  Manage Properties
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)}>
                  Manage Tenants
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeTab === 2} onClick={() => setActiveTab(2)}>
                  Manage Lease Agreements
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeTab === 3} onClick={() => setActiveTab(3)}>
                  Handle Maintenance
                </CNavLink>
              </CNavItem>
            </CNav>

            {/* Conditional Rendering for Tab Content */}
            {activeTab === 0 && (
              <div>
                <h5>Manage Properties</h5>
                <Bar data={propertyStatusData} />
                <CTable>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Property Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {properties.length > 0 ? (
                      properties.map((property, index) => (
                        <CTableRow key={property.id}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{property.name}</CTableDataCell>
                          <CTableDataCell>{property.location}</CTableDataCell>
                          <CTableDataCell>{property.status}</CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="4" className="text-center">
                          No properties available
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </div>
            )}

            {activeTab === 1 && (
              <div>
                <h5>Manage Tenants</h5>
                <CTable>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tenant Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Property</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {tenants.length > 0 ? (
                      tenants.map((tenant, index) => (
                        <CTableRow key={tenant.id}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{tenant.name}</CTableDataCell>
                          <CTableDataCell>{tenant.contact}</CTableDataCell>
                          <CTableDataCell>{tenant.property}</CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="4" className="text-center">
                          No tenants available
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <h5>Manage Lease Agreements</h5>
                <CTable>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tenant Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Property</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {leaseAgreements.length > 0 ? (
                      leaseAgreements.map((agreement, index) => (
                        <CTableRow key={agreement.id}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{agreement.tenantName}</CTableDataCell>
                          <CTableDataCell>{agreement.property}</CTableDataCell>
                          <CTableDataCell>{agreement.startDate}</CTableDataCell>
                          <CTableDataCell>{agreement.endDate}</CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="5" className="text-center">
                          No lease agreements available
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </div>
            )}

            {activeTab === 3 && (
              <div>
                <h5>Handle Maintenance</h5>
                <CTable>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Property</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Issue</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {maintenanceRequests.length > 0 ? (
                      maintenanceRequests.map((request, index) => (
                        <CTableRow key={request.id}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{request.property}</CTableDataCell>
                          <CTableDataCell>{request.issue}</CTableDataCell>
                          <CTableDataCell>{request.status}</CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="4" className="text-center">
                          No maintenance requests available
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ViewReport;
