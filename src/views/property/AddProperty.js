import React, { useState, useEffect } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CRow,
  CCol,
} from '@coreui/react';

const AddProperty = ({ visible, setVisible, editingProperty }) => {
  // State for input values based on the property schema
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [numberOfUnits, setNumberOfUnits] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [floorPlan, setFloorPlan] = useState('');
  const [amenities, setAmenities] = useState('');
  const [photos, setPhotos] = useState([]);

  // UseEffect to populate fields if editing
  useEffect(() => {
    if (editingProperty) {
      setTitle(editingProperty.title);
      setDescription(editingProperty.description);
      setAddress(editingProperty.address);
      setPrice(editingProperty.price);
      setRentPrice(editingProperty.rentPrice || '');
      setNumberOfUnits(editingProperty.numberOfUnits);
      setPropertyType(editingProperty.propertyType);
      setFloorPlan(editingProperty.floorPlan || '');
      setAmenities(editingProperty.amenities ? editingProperty.amenities.join(', ') : '');
      setPhotos(editingProperty.photos || []);
    } else {
      clearForm();
    }
  }, [editingProperty]);

  // Function to clear form inputs when adding a new property
  const clearForm = () => {
    setTitle('');
    setDescription('');
    setAddress('');
    setPrice('');
    setRentPrice('');
    setNumberOfUnits('');
    setPropertyType('');
    setFloorPlan('');
    setAmenities('');
    setPhotos([]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const propertyData = {
      title,
      description,
      address,
      price,
      rentPrice,
      numberOfUnits,
      propertyType,
      floorPlan,
      amenities: amenities.split(',').map(amenity => amenity.trim()),
      photos,
    };

    if (editingProperty) {
      console.log('Updating property:', { id: editingProperty.id, ...propertyData });
    } else {
      console.log('Adding new property:', propertyData);
    }

    setVisible(false); // Close modal after submission
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can only upload up to 5 photos.');
      return;
    }
    setPhotos(files);
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{editingProperty ? 'Edit Property' : 'Add Property'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          {/* Title */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyTitle">Title</CFormLabel>
              <CFormInput
                type="text"
                id="propertyTitle"
                placeholder="Enter Property Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* Description */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyDescription">Description</CFormLabel>
              <CFormInput
                type="text"
                id="propertyDescription"
                placeholder="Enter Property Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* Address */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyAddress">Address</CFormLabel>
              <CFormInput
                type="text"
                id="propertyAddress"
                placeholder="Enter Property Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* Price */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyPrice">Price</CFormLabel>
              <CFormInput
                type="number"
                id="propertyPrice"
                placeholder="Enter Property Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* Rent Price (optional) */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyRentPrice">Rent Price (optional)</CFormLabel>
              <CFormInput
                type="number"
                id="propertyRentPrice"
                placeholder="Enter Rent Price"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
              />
            </CCol>
          </CRow>

          {/* Number of Units */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyUnits">Number of Units</CFormLabel>
              <CFormInput
                type="number"
                id="propertyUnits"
                placeholder="Enter Number of Units"
                value={numberOfUnits}
                onChange={(e) => setNumberOfUnits(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* Property Type */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyType">Property Type</CFormLabel>
              <CFormInput
                type="text"
                id="propertyType"
                placeholder="Enter Property Type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* Floor Plan (optional) */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyFloorPlan">Floor Plan (optional)</CFormLabel>
              <CFormInput
                type="text"
                id="propertyFloorPlan"
                placeholder="Enter Floor Plan URL"
                value={floorPlan}
                onChange={(e) => setFloorPlan(e.target.value)}
              />
            </CCol>
          </CRow>

          {/* Amenities */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyAmenities">Amenities (comma-separated)</CFormLabel>
              <CFormInput
                type="text"
                id="propertyAmenities"
                placeholder="e.g., pool, gym, garden"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
              />
            </CCol>
          </CRow>

          {/* Photos (file upload, drag and drop, max 5) */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyPhotos">Photos (Drag & Drop, max 5)</CFormLabel>
              <CFormInput
                type="file"
                id="propertyPhotos"
                multiple
                onChange={handlePhotoUpload}
                accept="image/*"
              />
              {photos.length > 0 && <p>{photos.length} file(s) selected</p>}
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          {editingProperty ? 'Update Property' : 'Add Property'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddProperty;
