import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import AdminSidebar from './components/AdminSidebar';
import AdminFooter from './components/AdminFooter';

const AdminApp = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', overflow: 'hidden', fontFamily: "'Merriweather', serif" }}>
            <AdminNavbar />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <AdminSidebar />
                <main style={{ flex: 1, padding: '20px', backgroundColor: '#f5f7fb', overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
            {/* If AdminFooter is desired to be fixed at bottom, keep it here. If it should scroll with content, move it inside main. 
                For now, keeping it here preserves the structure but makes it fixed at bottom of viewport. */}
            <AdminFooter />
        </div>
    );
};

export default AdminApp;
