
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CPagination,
} from '@coreui/react';
import { fetchMaintenance, deleteMaintenance } from '../../api/actions/MaintenanceActions';
import MaintenanceTable from './MaintenanceTable';
import AddMaintenance from './AddMaintenance';

const ViewMaintenance = () => {
  const dispatch = useDispatch();
  const {
    maintenanceRecords,
    loading,
    error,
    totalPages,
    currentPage,
    totalRecords
  } = useSelector((state) => state.maintenance);
  
  const [visible, setVisible] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  const itemsPerPage = 5;

  const fetchMaintenanceData = useCallback(async () => {
    try {
      await dispatch(fetchMaintenance({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm.trim()
      })).unwrap();
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
    }
  }, [dispatch, currentPage, searchTerm]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchMaintenanceData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchMaintenanceData]);

  const handlePageChange = (newPage) => {
    dispatch(fetchMaintenance({
      page: newPage,
      limit: itemsPerPage,
      search: searchTerm
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(fetchMaintenance({
      page: 1,
      limit: itemsPerPage,
      search: e.target.value.trim()
    }));
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteMaintenance(id)).unwrap();
      fetchMaintenanceData();
    } catch (error) {
      console.error('Error deleting maintenance:', error);
    }
  };

  const handleEdit = (maintenance) => {
    setEditingMaintenance(maintenance);
    setVisible(true);
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Maintenance Records</strong>
            <button
              className="btn btn-primary float-end"
              onClick={() => {
                setEditingMaintenance(null);
                setVisible(true);
              }}
            >
              Add New Maintenance
            </button>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              placeholder="Search maintenance records..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-3"
            />
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              <>
                <MaintenanceTable
                  maintenanceData={maintenanceRecords}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  expandedRows={expandedRows}
                  toggleRowExpansion={toggleRowExpansion}
                />
                {totalRecords > itemsPerPage && (
                  <CPagination
                    className="mt-3"
                    activePage={currentPage}
                    pages={totalPages}
                    onActivePageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <AddMaintenance
        visible={visible}
        setVisible={setVisible}
        editingMaintenance={editingMaintenance}
        onSuccess={fetchMaintenanceData}
      />
    </CRow>
  );
};


export default ViewMaintenance;
