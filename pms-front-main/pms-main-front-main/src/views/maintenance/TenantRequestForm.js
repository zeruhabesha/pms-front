import React, { useEffect, useState } from 'react'
import {
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CAlert,
  CButton,
  CFormSelect,
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { decryptData } from '../../api/utils/crypto'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addMaintenance,
  fetchMaintenanceById,
  updateMaintenance,
} from '../../api/actions/MaintenanceActions'
import PropertySelect from '../guest/PropertySelect' // Import PropertySelect
import { fetchMaintenances } from '../../api/actions/MaintenanceActions'
import { filterProperties } from "../../api/actions/PropertyAction";

// import { ITEMS_PER_PAGE } from '../../constants/constants'

const TenantRequestForm = ({ initialFormData, onCloseEditMode, currentPage, searchTerm }) => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property); 
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(filterProperties()); // Fetch properties on mount
  }, [dispatch]);

  
  const [isLoading, setIsLoading] = useState(false)
  const [noPropertiesMessage, setNoPropertiesMessage] = useState(null)
  const [formData, setFormData] = useState({
    tenant: '',
    property: '',
    typeOfRequest: '',
    description: '',
    urgencyLevel: '',
    preferredAccessTimes: '',
    notes: '',
    requestDate: new Date(),
  })
  const [filePreviews, setFilePreviews] = useState([])
  const [localError, setError] = useState(null) // Separate local error state
  const [fetchError, setFetchError] = useState(null)
  const [files, setFiles] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const { id } = useParams()

  // Initialize form data from initialFormData prop
  useEffect(() => {
    if (initialFormData) {
      setIsEditing(true)
      setFormData({
        ...initialFormData,
        property: initialFormData.property ? initialFormData.property._id : '',
        requestDate: initialFormData.requestDate ? new Date(initialFormData.requestDate) : new Date(), // Ensure correct date format
      })
      // Handle file previews if any
      if (initialFormData.requestedFiles && initialFormData.requestedFiles.length > 0) {
        // Assuming requestedFiles are URLs
        setFilePreviews(initialFormData.requestedFiles)
      }
    } else {
      // Get user from local storage for creating new requests
      const initializeForm = async () => {
        try {
          const encryptedUser = localStorage.getItem('user')
          if (!encryptedUser) {
            setError('User not found. Please log in again.')
            return
          }
          const decryptedUser = decryptData(encryptedUser)
          const tenantId = decryptedUser?._id || ''

          setFormData((prev) => ({
            ...prev,
            tenant: tenantId,
          }))
        } catch (err) {
          console.error('Initialization error:', err)
          setError(err?.message || 'Failed to initialize form. Please try again.')
        }
      }

      initializeForm()
    }
  }, [initialFormData])

  // Form change handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  useEffect(() => {
    console.log('formData after change:', formData)
  }, [formData])

   const handlePropertyChange = (e) => {
    const selectedPropertyId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      property: selectedPropertyId, // Store only property ID
    }));
  };

  useEffect(() => {
    console.log("Redux Properties:", properties); // Debugging
  }, [properties]);
  
  // Handle file change to set FormData and generate previews
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (!selectedFiles.length) return
    setFiles(selectedFiles)
    setFilePreviews(selectedFiles.map((file) => URL.createObjectURL(file)))

    console.log('Selected files:', selectedFiles)
  }

  const validateFormData = (data) => {
    if (!data.property) return 'Property is required'
    if (!data.typeOfRequest) return 'Type of request is required'
    if (!data.description) return 'Description is required'
    if (!data.urgencyLevel) return 'Urgency level is required'

    // Validate files
    if (files.length > 0) {
      const maxFileSize = 5 * 1024 * 1024 // 5MB
      for (const file of files) {
        if (file.size > maxFileSize) {
          return `File ${file.name} is too large. Maximum size is 5MB.`
        }
      }
    }

    return null
  }

  // Form validation
  const validateForm = () => {
    // Basic required field validation
    const requiredFields = {
      property: 'Property',
      typeOfRequest: 'Type of Request',
      description: 'Description',
      urgencyLevel: 'Urgency Level',
    }

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field] || formData[field].trim() === '') {
        return `${label} is required`
      }
    }

    // File validation
    if (files.length > 0) {
      const maxFileSize = 5 * 1024 * 1024 // 5MB
      for (const file of files) {
        if (file.size > maxFileSize) {
          return `File ${file.name} is too large. Maximum size is 5MB`
        }
      }
    }

    return null
  }

  const createFormDataWithLogs = (formData) => {
    const submissionData = new FormData()

    // Log the input data
    console.log('Creating FormData with:', {
      ...formData,
      requestedFiles: files ? `${files.length} files` : 'no files',
    })

    try {
      // Add required fields
      submissionData.append('tenant', formData.tenant || '')
      submissionData.append(
        'property',
        formData.property,
      )

      submissionData.append('typeOfRequest', formData.typeOfRequest || '')
      submissionData.append('description', formData.description || '')
      submissionData.append('urgencyLevel', formData.urgencyLevel || '')

      // Add optional fields
      if (formData.preferredAccessTimes) {
        submissionData.append('preferredAccessTimes', formData.preferredAccessTimes)
      }
      if (formData.notes) {
        submissionData.append('notes', formData.notes)
      }

      // Append files to the FormData
      files.forEach((file) => {
        submissionData.append('requestedFiles', file) // Append each file
      })

      return submissionData
    } catch (error) {
      console.error('Error creating FormData:', error)
      throw new Error(`Failed to prepare form data: ${error.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()

    try {
      setIsLoading(true)
      setError(null)

      const validationError = validateFormData(formData)
      if (validationError) {
        setError(validationError)
        return
      }

      console.log('Starting submission with form data:', formData)

      let submissionData = createFormDataWithLogs(formData)

      console.log('formData before dispatch', submissionData)

      // Log the final FormData entries
      console.log('FormData with forEach:')
      submissionData.forEach((value, key) => {
        if (value instanceof File) {
          console.log(key, value.name, value.type, value.size)
        } else {
          console.log(key, value)
        }
      })

      console.log('FormData with entries:')
      for (const [key, value] of submissionData.entries()) {
        console.log(key, value instanceof File ? value.name : value)
      }

      console.log('Dispatching  action...')
      let result

      if (isEditing) {
        console.log('====================================')
        console.log(submissionData)
        console.log('====================================')
        result = await dispatch(
          updateMaintenance({ id: initialFormData._id, maintenanceData: submissionData }),
        ).unwrap()
      } else {
        result = await dispatch(addMaintenance(submissionData)).unwrap()
      }

      console.log('Submission result:', result)

      if (result) {
        console.log('Maintenance request created successfully')
        // navigate('/maintenance')
        setFilePreviews([])
        setFiles([]) // Clear the files state after successful submission
        onCloseEditMode() // close edit mode
        dispatch(
          fetchMaintenances({
            page: currentPage,
            // limit: ITEMS_PER_PAGE,
            search: searchTerm,
          }),
        )
      } else {
        throw new Error('No response data received')
      }
    } catch (error) {
      console.error('Submission error details:', error)
      let errorMessage = 'Failed to create maintenance request: '
      if (error.response) {
        errorMessage += error.response.data?.message || error.response.statusText
      } else if (error.request) {
        errorMessage += 'No response from server'
      } else {
        errorMessage += error.message || 'Unknown error occurred'
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (onCloseEditMode) {
      onCloseEditMode()
    } else {
      navigate('/maintenance')
    }
  }

  return (
    <div className="maintenance-form">
      <CCard className="border-0 shadow-sm">
        <CCardBody>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="text-center mb-4">{isEditing ? 'Edit Request' : 'New Request'}</div>
            {fetchError && (
              <CAlert color="danger" className="mb-3">
                {fetchError}
              </CAlert>
            )}
            {localError && (
              <CAlert color="danger" className="mb-3">
                {localError}
              </CAlert>
            )}
            {noPropertiesMessage && (
              <CAlert color="info" className="mb-3">
                {noPropertiesMessage}
              </CAlert>
            )}

            <CRow className="g-4">
              <CCol xs={12} className="form-group">
                <CFormLabel htmlFor="tenant">Tenant ID</CFormLabel>
                <CFormInput
                  id="tenant"
                  name="tenant"
                  type="text"
                  value={formData.tenant || ''}
                  readOnly
                  className="form-control-animation"
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="property">Property</CFormLabel>
                <PropertySelect
                  name="property"
                  value={formData.property}
                  onChange={handlePropertyChange}
                  required
                  label="Select a property"
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="typeOfRequest">Type of Request</CFormLabel>
                <CFormSelect
                  id="typeOfRequest"
                  name="typeOfRequest"
                  value={formData.typeOfRequest}
                  onChange={handleChange}
                >
                  <option value="">Select a request type</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Other">Other</option>
                </CFormSelect>
              </CCol>
              <CCol xs={12} className="form-group">
                <CFormLabel htmlFor="urgencyLevel">Urgency Level</CFormLabel>
                <CFormSelect
                  id="urgencyLevel"
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                  required
                  className="form-control-animation"
                >
                  <option value="">Select Urgency Level</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Routine">Routine</option>
                  <option value="Non-Urgent">Non-Urgent</option>
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormInput
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                />
              </CCol>
              <CCol xs={12} className="form-group">
                <CFormLabel htmlFor="preferredAccessTimes">Preferred Access Times</CFormLabel>
                <CFormInput
                  id="preferredAccessTimes"
                  name="preferredAccessTimes"
                  type="text"
                  placeholder="Enter preferred access times"
                  value={formData.preferredAccessTimes}
                  onChange={handleChange}
                  className="form-control-animation"
                />
              </CCol>
              <CCol xs={12} className="form-group">
                <CFormLabel htmlFor="notes">Notes</CFormLabel>
                <CFormInput
                  id="notes"
                  name="notes"
                  type="text"
                  placeholder="Enter additional notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="form-control-animation"
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="requestedFiles">Upload Files</CFormLabel>
                <CFormInput
                  id="requestedFiles"
                  name="requestedFiles"
                  type="file"
                  multiple                  onChange={handleFileChange}
                />
              </CCol>
            </CRow>
            {/* Image/Video previews below the form fields */}
            {filePreviews?.length > 0 && (
              <CCol xs={12} className="d-flex flex-wrap gap-2 mt-3">
                {filePreviews.map((file, index) => (
                  <div key={index} className="image-preview">
                    {/\.(jpg|jpeg|png|gif)$/i.test(file) ? (
                      <img
                        src={file}
                        alt={`Preview ${index + 1}`}
                        style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                      />
                    ) : /\.(mp4|mov|avi)$/i.test(file) ? (
                      <video
                        src={file}
                        controls
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                    ) : null}
                  </div>
                ))}
              </CCol>
            )}
            <div className="mt-4 d-flex justify-content-end gap-2">
              <CButton
                color="primary"
                onClick={handleSubmit}
                disabled={isLoading}
                className="position-relative"
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </CButton>
              <CButton color="secondary" onClick={handleClose} disabled={isLoading}>
                Cancel
              </CButton>
            </div>
          </form>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default TenantRequestForm