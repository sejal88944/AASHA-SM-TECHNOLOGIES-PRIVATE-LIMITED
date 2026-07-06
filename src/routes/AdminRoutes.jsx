import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminApp from '../admin/AdminApp';
import Login from '../admin/pages/Login';
import Dashboard from '../admin/pages/Dashboard';
import Services from '../admin/pages/Services';
import Blogs from '../admin/pages/Blogs';
import BlogEditor from '../admin/pages/BlogEditor';
import Reviews from '../admin/pages/Reviews';
import Settings from '../admin/pages/Settings';

import ProtectedRoute from '../admin/components/ProtectedRoute';
import AdminPortalGuard from '../admin/components/AdminPortalGuard';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={
                <AdminPortalGuard>
                    <Login />
                </AdminPortalGuard>
            } />
            <Route path="/" element={
                <AdminPortalGuard>
                    <ProtectedRoute>
                        <AdminApp />
                    </ProtectedRoute>
                </AdminPortalGuard>
            }>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<Services />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="blogs/new" element={<BlogEditor />} />
                <Route path="blogs/:id" element={<BlogEditor />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
