import React, { useState } from 'react';
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
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react'; // Correct import for CIcon
import { cilPencil, cilTrash } from '@coreui/icons'; // Correct icons import
import AddProperty from './AddProperty'; // Import the AddProperty modal component
import '../Super.scss';

const ViewProperty = () => {
  // State for search term, pagination, modal, and expanded property
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null); // Track property being edited
  const [expandedProperties, setExpandedProperties] = useState([]); // Track expanded properties
  const itemsPerPage = 5; // Define items per page

  // Sample property data (you can replace this with actual API data)
  const propertyData = [
    {
      id: 1,
      title: 'Property One',
      description: 'A spacious apartment in the city center',
      address: '123 Main St',
      price: 500000,
      rentPrice: 2000,
      numberOfUnits: 10,
      propertyType: 'Apartment',
      floorPlan: 'https://example.com/floorplan1.jpg',
      amenities: ['Pool', 'Gym'],
      photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
    },
    {
      id: 2,
      title: 'Property Two',
      description: 'Luxury villa with private pool',
      address: '456 Ocean Ave',
      price: 1200000,
      rentPrice: 5000,
      numberOfUnits: 5,
      propertyType: 'Villa',
      floorPlan: 'https://example.com/floorplan2.jpg',
      amenities: ['Private Pool', 'Garden'],
      photos: ['https://example.com/photo3.jpg', 'https://example.com/photo4.jpg'],
    },
    // Add more sample data for testing
  ];

  // Filter property data based on the search term
  const filteredPropertyData = propertyData.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = filteredPropertyData.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredPropertyData.length / itemsPerPage);

  // Function to handle Edit button click and open modal
  const handleEdit = (property) => {
    setEditingProperty(property); // Set the property being edited
    setVisible(true); // Show the modal
  };

  // Function to handle adding a new property
  const handleAddProperty = () => {
    setEditingProperty(null); // Reset editing state
    setVisible(true); // Show the modal
  };

  // Toggle expanded state of a property
  const toggleExpandProperty = (propertyId) => {
    setExpandedProperties((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Properties</strong>
            <div id="container">
            <button
          className="learn-more"
          onClick={handleAddProperty}>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Add Property</span>
        </button>
        </div>
          </CCardHeader>
          <CCardBody>
            {/* Search Box */}
            <CFormInput
              type="text"
              placeholder="Search by title or property type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <div className="table-responsive">
          <CTable>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentProperties.map((property, index) => (
                <React.Fragment key={property.id}>
                  <CTableRow>
                    <CTableHeaderCell scope="row">{index + indexOfFirstProperty + 1}</CTableHeaderCell>
                    <CTableDataCell>{property.title}</CTableDataCell>
                    <CTableDataCell>{property.description}</CTableDataCell>
                    <CTableDataCell>{property.address}</CTableDataCell>
                    <CTableDataCell>{property.propertyType}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="dark" size="sm" className="me-2" onClick={() => handleEdit(property)}>
                        <CIcon icon={cilPencil} /> {/* Edit icon */}
                      </CButton>
                      <CButton color="danger" className="me-2" size="sm" onClick={() => handleDelete(property.id)}>
                        <CIcon icon={cilTrash} /> {/* Delete icon */}
                      </CButton>
                      <CButton color="secondary" size="sm" onClick={() => toggleExpandProperty(property.id)}>
                        {expandedProperties.includes(property.id) ? '-' : '+'}
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                  {/* Expanded section */}
                  {expandedProperties.includes(property.id) && (
                    <CTableRow>
                      <CTableDataCell colSpan="6">
                        <div>
                          <strong>Unit:</strong> {property.numberOfUnits}
                        </div>
                        <div>
                          <strong>Rent Price:</strong> {property.rentPrice ? `$${property.rentPrice.toLocaleString()}` : 'N/A'}
                        </div>
                        <div>
                          <strong>Price:</strong> ${property.price.toLocaleString()}
                        </div>
                        <div>
                          <strong>Floor Plan:</strong> <a href={property.floorPlan} target="_blank" rel="noopener noreferrer">View Floor Plan</a>
                        </div>
                        <div>
                          <strong>Amenities:</strong> {property.amenities.join(', ')}
                        </div>
                        <div>
                          <strong>Photos:</strong> {property.photos.length > 0 ? <a href={property.photos[0]} target="_blank" rel="noopener noreferrer">View Photos</a> : 'No Photos'}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </React.Fragment>
              ))}
            </CTableBody>
          </CTable>
        </div>
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

      {/* Modal to Add/Edit Property */}
      <AddProperty visible={visible} setVisible={setVisible} editingProperty={editingProperty} />
    </CRow>
  );
};

export default ViewProperty;
