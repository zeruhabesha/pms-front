import React, { useState, useEffect } from 'react';
import { CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CButton } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserPermissions } from '../../api/actions/userActions';
import './PermissionsModal.scss';

const PermissionsModal = ({ visible, user, onClose }) => {
  const [permissions, setPermissions] = useState({});
  const dispatch = useDispatch();

  // Load permissions when the modal is opened
  useEffect(() => {
    if (user) {
      const defaultPermissions = {
        addProperty: false,
        editProperty: false,
        deleteProperty: false,
        viewProperty: false,
        editPropertyPhotos: false,
        addTenant: false,
        editTenant: false,
        deleteTenant: false,
        editTenantPhotos: false,
        addAgreement: false,
        editAgreement: false,
        deleteAgreement: false,
        downloadAgreement: false,
        addMaintenanceRecord: false,
        editMaintenance: false,
        deleteMaintenance: false,
      };
  
      setPermissions({ ...defaultPermissions, ...(user.permissions || {}) });
    }
  }, [user]);
  

  // Handle permission toggle
  const handleSwitchChange = (permissionKey) => (e) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permissionKey]: e.target.checked,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedPermissions = {
        userId: user._id,
        permissions,
      };
      await dispatch(updateUserPermissions(updatedPermissions)).unwrap();
      toast.success('Permissions updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update permissions');
    }
  };

  const permissionGroups = {
    properties: {
      title: 'Properties Management',
      icon: '🏠',
      permissions: {
        addProperty: 'Add Property',
        editProperty: 'Edit Property',
        deleteProperty: 'Delete Property',
        viewProperty: 'View Property',
        editPropertyPhotos: 'Edit Property Photos',
      },
    },
    tenants: {
      title: 'Tenants Management',
      icon: '👥',
      permissions: {
        addTenant: 'Add Tenant',
        editTenant: 'Edit Tenant',
        deleteTenant: 'Delete Tenant',
        editTenantPhotos: 'Edit Tenant Photos',
      },
    },
    agreements: {
      title: 'Agreements Management',
      icon: '📄',
      permissions: {
        addAgreement: 'Add Agreement',
        editAgreement: 'Edit Agreement',
        deleteAgreement: 'Delete Agreement',
        downloadAgreement: 'Download Agreement',
      },
    },
    maintenance: {
      title: 'Maintenance Management',
      icon: '🔧',
      permissions: {
        addMaintenanceRecord: 'Add Maintenance',
        editMaintenance: 'Edit Maintenance',
        deleteMaintenance: 'Delete Maintenance',
      },
    },
  };

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>
          Permissions for {user?.name}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="permissions-container">
          <div className="user-info">
            <span className="user-role">Role: {user?.role}</span>
          </div>
          {Object.entries(permissionGroups).map(([groupKey, group]) => (
  <div key={groupKey} className="permission-group">
    <div className="group-header">
      <span className="group-icon">{group.icon}</span>
      <h3 className="group-title">{group.title}</h3>
    </div>
    <div className="switches-grid">
   { permissions &&
Object.entries(group.permissions).map(([permKey, label]) => (
  <div key={permKey} className="switch-container">
    <label className="switch">
      <input
        type="checkbox"
        checked={
          permissions?.[permKey] === true 
        }
        onChange={handleSwitchChange(permKey)}
      />
      <span className="slider round"></span>
    </label>
    <span className="switch-label">{label}</span>
  </div>
))}

    </div>
  </div>
))}
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="dark" onClick={handleSave}>
          Save Changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default PermissionsModal;
