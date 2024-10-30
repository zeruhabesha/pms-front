// src/components/ViewProperty.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, deleteProperty } from '../../api/actions/PropertyAction';
import { CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CFormInput } from '@coreui/react';
import PropertyTable from './PropertyTable';
import AddProperty from './AddProperty';

const ViewProperty = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    console.log("Properties from Redux in Component:", properties); // Debug log to check data in component
  }, [properties]);

  const handleAddProperty = () => {
    setEditingProperty(null);
    setVisible(true);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProperty(id));
  };

  // Ensure properties is an array before applying .filter()
  const filteredProperties = Array.isArray(properties)
    ? properties.filter((property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Properties</strong>
            <CButton onClick={handleAddProperty}>Add Property</CButton>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search by title or property type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <PropertyTable
                properties={currentProperties}
                onEdit={handleEdit}
                onDelete={handleDelete}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <AddProperty visible={visible} setVisible={setVisible} editingProperty={editingProperty} />
    </CRow>
  );
};

export default ViewProperty;
