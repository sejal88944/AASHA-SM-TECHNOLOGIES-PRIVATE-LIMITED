import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminPortalUnlocked } from '../../utils/adminAccess';

const AdminPortalGuard = ({ children }) => {
    if (!isAdminPortalUnlocked()) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminPortalGuard;
