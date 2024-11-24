import React from 'react';
import { CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CButton } from '@coreui/react';
import './PermissionsModal.scss'; // We'll create this file next

const PermissionsModal = ({ visible, user, onClose, onSavePermissions }) => {
  const handleSwitchChange = (category, permission) => (e) => {
    if (!user.permissions[category]) {
      user.permissions[category] = {};
    }
    user.permissions[category][permission] = e.target.checked;
  };

  const handleSave = () => {
    onSavePermissions(user);
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
        photoEditProperty: 'Edit Property Photos'
      }
    },
    tenants: {
      title: 'Tenants Management',
      icon: '👥',
      permissions: {
        addTenant: 'Add Tenant',
        editTenant: 'Edit Tenant',
        deleteTenant: 'Delete Tenant',
        photoEditTenant: 'Edit Tenant Photos'
      }
    },
    agreements: {
      title: 'Agreements Management',
      icon: '📄',
      permissions: {
        addAgreement: 'Add Agreement',
        editAgreement: 'Edit Agreement',
        deleteAgreement: 'Delete Agreement',
        downloadAgreement: 'Download Agreement'
      }
    },
    maintenance: {
      title: 'Maintenance Management',
      icon: '🔧',
      permissions: {
        addMaintenance: 'Add Maintenance',
        editMaintenance: 'Edit Maintenance',
        deleteMaintenance: 'Delete Maintenance'
      }
    }
  };

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>
          <span className="modal-title">Permissions for {user?.name}</span>
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
                {Object.entries(group.permissions).map(([permKey, label]) => (
                  <div key={permKey} className="switch-container">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user?.permissions?.[groupKey]?.[permKey] || false}
                        onChange={handleSwitchChange(groupKey, permKey)}
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
        <CButton color="secondary" onClick={onClose}>Cancel</CButton>
        <CButton color="primary" onClick={handleSave}>Save Changes</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default PermissionsModal;