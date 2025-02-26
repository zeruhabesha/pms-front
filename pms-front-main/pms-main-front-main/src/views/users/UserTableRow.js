import React from 'react';
import { CTableRow, CTableDataCell, CButton } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilCheckCircle, cilXCircle, cilPencil } from '@coreui/icons';
import placeholder from '../image/placeholder.png';
import UserActions from './UserActions';

const UserTableRow = ({
    user,
    index,
    currentPage,
    itemsPerPage,
    getRoleIcon,
    handleEdit,
    handleDelete,
    handleEditPhoto,
    handleUserDetailsClick,
    handlePermissionsClick,
    handleManageStatusClick // Add handler for status management
}) => {
    return (
        <CTableRow key={user._id || `row-${index}`}>
            <CTableDataCell>{(currentPage - 1) * itemsPerPage + index + 1}</CTableDataCell>
            <CTableDataCell>
                <img
                    src={`https://pms-backend-sncw.onrender.com/api/v1/users/${user._id}/photo`}
                    alt="User"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    className="me-2"
                />
            </CTableDataCell>
            <CTableDataCell>{user?.name || 'N/A'}</CTableDataCell>
            <CTableDataCell>{user?.email || 'N/A'}</CTableDataCell>
            <CTableDataCell>
                {getRoleIcon(user?.role)} {user?.role || 'N/A'}
            </CTableDataCell>
            <CTableDataCell>
                {user?.status?.toLowerCase() === 'active' ? (
                    <CIcon icon={cilCheckCircle} className="text-success" title="Active" />
                ) : (
                    <CIcon icon={cilXCircle} className="text-danger" title="Inactive" />
                )}
            </CTableDataCell>
            <CTableDataCell>
            <UserActions
    user={user}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    handleEditPhoto={handleEditPhoto}
    handleUserDetailsClick={handleUserDetailsClick}
    handlePermissionsClick={handlePermissionsClick}
    handleManageStatusClick={handleManageStatusClick} // ✅ Ensure this is passed
/>



            </CTableDataCell>
        </CTableRow>
    );
};

export default UserTableRow;