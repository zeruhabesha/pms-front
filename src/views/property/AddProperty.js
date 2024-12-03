// src/components/AddProperty.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { addProperty, updateProperty } from '../../api/actions/PropertyAction';
=======
import { addProperty, updateProperty, fetchProperties } from '../../api/actions/PropertyAction';
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CRow,
  CCol,
  CButton,
<<<<<<< HEAD
=======
  CCard,
  CCardBody,
  CAlert,
  // CIcon,
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
} from '@coreui/react';

const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' },
];

const AddProperty = ({ visible, setVisible, editingProperty }) => {
  const dispatch = useDispatch();
<<<<<<< HEAD
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

  // Populate form fields if editing an existing property
=======
  const initialState = {
    title: '',
    description: '',
    address: '',
    price: '',
    rentPrice: '',
    numberOfUnits: '',
    propertyType: '',
    floorPlan: '',
    amenities: '',
    photos: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
  useEffect(() => {
    if (editingProperty) {
      setFormData({
        ...editingProperty,
        amenities: editingProperty.amenities?.join(', ') || '',
        photos: editingProperty.photos || [],
      });
    } else {
      setFormData(initialState);
    }
    setErrorMessage('');
  }, [editingProperty]);

<<<<<<< HEAD
  // Clear form fields for adding a new property
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

  // Handle form submission for adding or updating property
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
      amenities: amenities.split(',').map((a) => a.trim()),
      photos,
    };

    if (editingProperty) {
      dispatch(updateProperty(editingProperty.id, propertyData));
    } else {
      dispatch(addProperty(propertyData));
    }
=======
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.numberOfUnits || formData.numberOfUnits <= 0) newErrors.numberOfUnits = 'Valid number of units is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setErrors((prev) => ({ ...prev, photos: 'Maximum 5 photos allowed' }));
      return;
    }
    setFormData((prev) => ({ ...prev, photos: files }));
    setErrors((prev) => ({ ...prev, photos: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
  
    try {
      const propertyData = { ...formData, amenities: formData.amenities.split(',').map(item => item.trim()) };
  
      if (editingProperty) {
        await dispatch(updateProperty({ id: editingProperty._id, propertyData })).unwrap();
      } else {
        await dispatch(addProperty(propertyData)).unwrap();
      }
  
      setVisible(false);
      await dispatch(fetchProperties({ page: 1, limit: 5, search: '' })).unwrap(); // Adjust parameters as needed
    } catch (error) {
      setErrorMessage(error.message || 'Failed to save property');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialState);
    setErrors({});
    setErrorMessage('');
    setVisible(false);
  };

  return (
<<<<<<< HEAD
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>{editingProperty ? 'Edit Property' : 'Add Property'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          {/* Title Field */}
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

          {/* Description Field */}
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

          {/* Address Field */}
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

          {/* Price Field */}
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

          {/* Rent Price Field (optional) */}
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

          {/* Number of Units Field */}
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

          {/* Property Type Field */}
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

          {/* Floor Plan URL Field (optional) */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyFloorPlan">Floor Plan URL (optional)</CFormLabel>
              <CFormInput
                type="text"
                id="propertyFloorPlan"
                placeholder="Enter Floor Plan URL"
                value={floorPlan}
                onChange={(e) => setFloorPlan(e.target.value)}
              />
            </CCol>
          </CRow>

          {/* Amenities Field */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyAmenities">Amenities (comma-separated)</CFormLabel>
              <CFormInput
                type="text"
                id="propertyAmenities"
                placeholder="e.g., Pool, Gym, Garden"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
              />
            </CCol>
          </CRow>

          {/* Photos Field (file upload, max 5) */}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="propertyPhotos">Photos (up to 5)</CFormLabel>
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
=======
    <CModal visible={visible} onClose={handleClose} alignment="center" backdrop="static" size="lg">
      <CModalHeader className="bg-dark text-white">
        <CModalTitle>{editingProperty ? 'Edit Property' : 'Add Property'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            {errorMessage && (
              <CAlert color="danger" className="mb-4">
                {errorMessage}
              </CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <CRow className="g-4">
                <CCol xs={12}>
                  <CFormLabel htmlFor="title">Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    invalid={!!errors.title}
                    placeholder="Enter Property Title"
                  />
                  {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                </CCol>

                {/* Updated Description (Text Area) */}
                <CCol xs={12}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    invalid={!!errors.description}
                    placeholder="Enter Property Description"
                    rows={4}
                  />
                  {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="address">Address</CFormLabel>
                  <CFormInput
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    invalid={!!errors.address}
                    placeholder="Enter Property Address"
                  />
                  {errors.address && <div className="invalid-feedback d-block">{errors.address}</div>}
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="price">Price</CFormLabel>
                  <CFormInput
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    invalid={!!errors.price}
                    placeholder="Enter Price"
                  />
                  {errors.price && <div className="invalid-feedback d-block">{errors.price}</div>}
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="rentPrice">Rent Price (optional)</CFormLabel>
                  <CFormInput
                    type="number"
                    id="rentPrice"
                    name="rentPrice"
                    value={formData.rentPrice}
                    onChange={handleInputChange}
                    placeholder="Enter Rent Price"
                  />
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="numberOfUnits">Number of Units</CFormLabel>
                  <CFormInput
                    type="number"
                    id="numberOfUnits"
                    name="numberOfUnits"
                    value={formData.numberOfUnits}
                    onChange={handleInputChange}
                    invalid={!!errors.numberOfUnits}
                    placeholder="Enter Number of Units"
                  />
                  {errors.numberOfUnits && <div className="invalid-feedback d-block">{errors.numberOfUnits}</div>}
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="propertyType">Property Type</CFormLabel>
                  <CFormSelect
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    invalid={!!errors.propertyType}
                  >
                    <option value="">Select property type</option>
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </CFormSelect>
                  {errors.propertyType && <div className="invalid-feedback d-block">{errors.propertyType}</div>}
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="floorPlan">Floor Plan (optional)</CFormLabel>
                  <CFormInput
                    type="text"
                    id="floorPlan"
                    name="floorPlan"
                    value={formData.floorPlan}
                    onChange={handleInputChange}
                    placeholder="Enter Floor Plan URL or Description"
                  />
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="amenities">Amenities</CFormLabel>
                  <CFormInput
                    type="text"
                    id="amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    placeholder="Enter amenities, separated by commas"
                  />
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="photos">Photos (max 5)</CFormLabel>
                  <CFormInput
                    type="file"
                    id="photos"
                    name="photos"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    invalid={!!errors.photos}
                  />
                  {errors.photos && <div className="invalid-feedback d-block">{errors.photos}</div>}
                </CCol>
              </CRow>

              <CModalFooter className="border-top-0">
                <CButton color="secondary" variant="" onClick={handleClose}>
                  Cancel
                </CButton>
                <CButton color="dark" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : editingProperty ? 'Update Property' : 'Add Property'}
                </CButton>
              </CModalFooter>
            </CForm>
          </CCardBody>
        </CCard>
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
      </CModalBody>
    </CModal>
  );
};

export default AddProperty;
