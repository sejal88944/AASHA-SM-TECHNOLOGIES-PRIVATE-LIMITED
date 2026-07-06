import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminPortalUnlocked } from '../../utils/adminAccess';

const ProtectedRoute = ({ children }) => {
    if (!isAdminPortalUnlocked()) {
        return <Navigate to="/" replace />;
    }

    const isAuthenticated = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isAuthenticated) return <Navigate to="/aashasm-portal/login" replace />;
    return children;
};
export default ProtectedRoute;