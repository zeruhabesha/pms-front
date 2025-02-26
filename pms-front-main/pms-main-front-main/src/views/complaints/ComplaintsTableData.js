import React, { useMemo } from 'react';
import {
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CBadge
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilPencil, cilTrash, cilUser, cilOptions, cilZoom, cilDescription, cilCalendar, cilInfo, cilHome, cilList } from '@coreui/icons';
import { toast } from 'react-toastify';
const ComplaintsTableData = ({
    complaints = [],
    currentPage,
    searchTerm,
    sortConfig,
    handleSort, // Make sure handleSort is received as a prop here
    handleEdit,
    handleDelete,
    handleModalOpen,
    users,
    handleAssignModalOpen,
    handleFeedbackModalOpen,
    role
}) => {

    const sortedComplaints = useMemo(() => {
        if (!sortConfig.key) return complaints;

        return [...complaints].sort((a, b) => {
            const aKey = (a[sortConfig.key] && typeof a[sortConfig.key] === 'object') ? (a[sortConfig.key]?.name || '') : (a[sortConfig.key] || '');
            const bKey = (b[sortConfig.key] && typeof b[sortConfig.key] === 'object') ? (b[sortConfig.key]?.name || '') : (b[sortConfig.key] || '');

            if (aKey < bKey) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aKey > bKey) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [complaints, sortConfig]);

    return (
        <div className="table-responsive">
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary text-center" onClick={() => handleSort('index')} style={{ cursor: 'pointer' }}>
                            #
                            {sortConfig.key === 'index' && (
                                <CIcon icon={sortConfig.direction === 'ascending' ? 'arrow-top' : 'arrow-bottom'} />
                            )}
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary" onClick={() => handleSort('createdBy')} style={{ cursor: 'pointer' }}>
                            <CIcon icon={cilUser} className="me-1" />
                            Tenant
                            {sortConfig.key === 'createdBy' && (
                                <CIcon icon={sortConfig.direction === 'ascending' ? 'arrow-top' : 'arrow-bottom'} />
                            )}
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary" onClick={() => handleSort('property')} style={{ cursor: 'pointer' }}>
                            <CIcon icon={cilHome} className="me-1" />
                            Property
                            {sortConfig.key === 'property' && (
                                <CIcon icon={sortConfig.direction === 'ascending' ? 'arrow-top' : 'arrow-bottom'} />
                            )}
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary" onClick={() => handleSort('complaintType')} style={{ cursor: 'pointer' }}>
                            <CIcon icon={cilList} className="me-1" />
                            Type
                            {sortConfig.key === 'complaintType' && (
                                <CIcon icon={sortConfig.direction === 'ascending' ? 'arrow-top' : 'arrow-bottom'} />
                            )}
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary" onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                            <CIcon icon={cilInfo} className="me-1" />
                            Status
                            {sortConfig.key === 'status' && (
                                <CIcon icon={sortConfig.direction === 'ascending' ? 'arrow-top' : 'arrow-bottom'} />
                            )}
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {sortedComplaints.map((complaint, index) => (
                        <CTableRow key={complaint._id || `row-${index}`}>
                            <CTableDataCell className="text-center">{(currentPage - 1) * 10 + index + 1}</CTableDataCell>
                            <CTableDataCell>{complaint.createdBy?.name || 'N/A'}</CTableDataCell>
                            <CTableDataCell>{complaint.property?.title || 'N/A'}</CTableDataCell>
                            <CTableDataCell>{complaint?.complaintType || 'N/A'}</CTableDataCell>
                            <CTableDataCell>
                                {complaint?.status === 'Pending' ? (
                                    <CBadge color="warning">Pending</CBadge>
                                ) : complaint?.status === 'In Progress' ? (
                                        <CBadge color="primary">In Progress</CBadge>
                                ) : complaint?.status === 'Resolved' ? (
                                        <CBadge color="success">Resolved</CBadge>
                                ) : (
                                        <CBadge color="danger">Closed</CBadge>
                                )}
                            </CTableDataCell>
                            <CTableDataCell>
                                <CDropdown>
                                    <CDropdownToggle color="light" caret={false} size="sm" title="Actions">
                                        <CIcon icon={cilOptions} />
                                    </CDropdownToggle>
                                    <CDropdownMenu>
                                    {role === 'Tenant' && (
                                        <CDropdownItem onClick={() => handleEdit(complaint)}>
                                            <CIcon icon={cilPencil} className="me-2" />Edit
                                        </CDropdownItem>
                                    )}
                                    {role === 'Tenant' && (
                                        <CDropdownItem onClick={() => handleDelete(complaint)} style={{color: 'red'}}>
                                            <CIcon icon={cilTrash} className="me-2" /> Delete
                                        </CDropdownItem>
                                    )}
                                        <CDropdownItem onClick={() => handleModalOpen(complaint)}>
                                          <CIcon icon={cilZoom} className="me-2" />
                                            Details
                                        </CDropdownItem>
                                        {role === 'Admin' && (
                                            <CDropdownItem onClick={() => handleAssignModalOpen(complaint)}>
                                                Assign
                                            </CDropdownItem>
                                        )}
                                        {role === 'Inspector' && (
                                            <CDropdownItem onClick={() => handleFeedbackModalOpen(complaint)}>
                                               Feedback
                                           </CDropdownItem>
                                            )}
                                    </CDropdownMenu>
                                </CDropdown>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default ComplaintsTableData;