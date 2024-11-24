import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CAlert,
  CFormInput,
  CSpinner,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import AgreementTable from './AgreementTable';
import AddAgreement from './AddAgreement';
import AgreementDocModal from './AgreementDocModal';
import { fetchAgreements, addAgreement, updateAgreement, deleteAgreement } from '../../api/actions/AgreementActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Super.scss';

const selectAgreementState = (state) => state.agreement || {
  agreements: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

const ViewAgreement = () => {
  const dispatch = useDispatch();
  const { agreements, loading, error, totalPages, currentPage } = useSelector(selectAgreementState);
  const [expandedRows, setExpandedRows] = useState({});
  const [isDocModalVisible, setDocModalVisible] = useState(false);
  const [isAgreementModalVisible, setAgreementModalVisible] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageLocal, setCurrentPageLocal] = useState(1);
  const itemsPerPage = 5;
  

  const fetchData = async (page = 1) => {
    try {
      await dispatch(fetchAgreements({ 
        page, 
        limit: itemsPerPage, 
        searchTerm 
      })).unwrap();
    } catch (error) {
      console.error('Error fetching agreements:', error);
      toast.error(error.message || 'Failed to fetch agreements');
    }
  };

  // Improved useEffect for search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setCurrentPageLocal(1);
      fetchData(1);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Separate useEffect for page changes
  useEffect(() => {
    fetchData(currentPageLocal);
  }, [currentPageLocal]);
  
  const handleRowToggle = (agreementId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [agreementId]: !prev[agreementId],
    }));
  };

  // const handlePageChange = (newPage) => {
  //   if (newPage >= 1 && newPage <= totalPages) {
  //     setCurrentPageLocal(newPage);
  //   }
  // };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPageLocal(newPage);
      fetchData(newPage);
    }
  };
  

  const handleEdit = (agreement) => {
    setSelectedAgreement(agreement);
    setAgreementModalVisible(true);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    
    try {
      await dispatch(deleteAgreement(id)).unwrap();
      toast.success('Agreement deleted successfully');
      fetchData(currentPageLocal);
    } catch (error) {
      console.error("Error deleting agreement:", error);
      toast.error(error.message || 'Failed to delete agreement');
    }
  };

  const handleSave = async (agreementData) => {
    try {
      if (selectedAgreement) {
        await dispatch(updateAgreement({
          id: selectedAgreement._id,  // Changed from id to _id
          agreementData
        })).unwrap();
        toast.success('Agreement updated successfully');
      } else {
        await dispatch(addAgreement(agreementData)).unwrap();
        toast.success('Agreement added successfully');
      }
      await fetchData(currentPageLocal);
      setAgreementModalVisible(false);
      setSelectedAgreement(null);
    } catch (error) {
      console.error('Error saving agreement:', error);
      toast.error(error.message || 'Failed to save agreement');
    }
  };


  // const toggleRow = (agreementId) => {
  //   if (!agreementId) return; // Skip if agreementId is undefined or null
  //   setExpandedRows((prev) => ({
  //     ...prev,
  //     [agreementId]: !prev[agreementId],
  //   }));
  // };
  
  

  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Agreement List</strong>
            <div id="container">
              <button
                className="learn-more"
                onClick={() => {
                  setSelectedAgreement(null);
                  setAgreementModalVisible(true);
                }}
              >
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Add Agreement</span>
              </button>
            </div>
          </CCardHeader>
          <CCardBody>
            {error && (
              <CAlert color="danger" className="mb-4">
                {error}
              </CAlert>
            )}

            <CFormInput
              type="text"
              placeholder="Search by tenant or property"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />

            {loading ? (
              <div className="text-center p-3">
                <CSpinner color="primary" />
              </div>
            ) : (
              <>
                <AgreementTable
                  agreements={agreements}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onRowToggle={handleRowToggle}
                  expandedRows={expandedRows}
                  currentPage={currentPageLocal}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                />

                {totalPages > 0 && (
                  <div className="text-center mt-2">
                    Page {currentPageLocal} of {totalPages}
                  </div>
                )}
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      <AddAgreement
        visible={isAgreementModalVisible}
        setVisible={setAgreementModalVisible}
        editingAgreement={selectedAgreement}
        handleSave={handleSave}
      />

      <AgreementDocModal
        visible={isDocModalVisible}
        onClose={() => setDocModalVisible(false)}
        documents={selectedAgreement?.documents || []}
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </CRow>
  );
};

export default ViewAgreement;
